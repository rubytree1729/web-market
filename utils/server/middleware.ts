import { cookie, ValidationChain, validationResult } from "express-validator"
import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { Err } from "./commonError"
import ServerLog, { serverLog } from "../../models/ServerLog"
import { createJWT, uuid4, verifyJWT } from "../encrypt"
import LoginToken from "../../models/LoginToken"
import mongoose from "mongoose"
import { envExist } from "../validateEnv"

export async function checkDB(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
    if (mongoose.connection.readyState != mongoose.ConnectionStates.connected) {
        const DB_URI = envExist(process.env.DB_URI, "db uri", true)
        const DB_NAME = envExist(process.env.DB_NAME, "db name")
        await mongoose.connect(DB_URI, { dbName: DB_NAME, authSource: "admin", connectTimeoutMS: 5000 })
        console.log("***db connected***")
    }
    next()
}
export async function serverAuth(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
    await validate([cookie(["refresh_token"]).exists()])(req, res)
    const { access_token, refresh_token } = req.cookies
    try {
        const { aud, role, jti } = await verifyJWT(access_token)
        req.cookies = { ...req.cookies, aud, role, jti }
    }
    catch {
        const { aud, role, jti } = await verifyJWT(refresh_token)
        const result = await LoginToken.findOne({ jti })
        if (!result) {
            return Err(res, "access denied by permission")
        }
        const newjti = uuid4()
        const jwt = await createJWT(aud, role, newjti, "30m")
        const cookies = [`access_token=${jwt};Max-Age=${30 * 60};Path=/;HttpOnly;Secure;SameSite=Strict`]
        res.setHeader('Set-Cookie', cookies)
        req.cookies = { ...req.cookies, aud, role, jti: newjti }
    }
    next()
}

export async function saveLog(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
    const path = req.url
    const { jti, role } = req.cookies
    const { fingerprint } = req.body
    const referer = req.headers.referer
    const ip = req.headers["x-real-ip"]?.toString()
    const serverLog: serverLog = { path, referer, jti, ip, role, fingerprint }
    console.log(serverLog)
    await new ServerLog(serverLog).save()
    next()
}

export function validateRequest(validations: ValidationChain[]) {
    return async (req: NextApiRequest & Request, res: any, next: NextHandler) => {
        await Promise.all(validations.map(validation => validation.run(req)))
        const result = validationResult(req)
        // console.log(result)
        if (result.isEmpty()) {
            next()
        } else {
            Err(res, result.array())
        }
    }
}
export function validate(validations: ValidationChain[]) {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        await Promise.all(validations.map(validation => validation.run(req)))
        const result = validationResult(req)
        if (!result.isEmpty()) {
            throw result.array()
        }
    }
}