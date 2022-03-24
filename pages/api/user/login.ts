import User from "../../../models/User"
import dbCheckConnect from '../../../utils/dbCheckConnect';
import { body, cookie } from 'express-validator';
import commonHandler, { validate, validateRequest } from '../../../utils/commonHandler';
import { Err, Ok } from "../../../utils/commonError";
import { NextApiRequest, NextApiResponse } from "next";
import { encryptPassword, createJWT, verifyJWT } from "../../../utils/encrypt";
import nc from "next-connect"


const handler = nc(commonHandler)
    .post(
        body("id").exists(),
        body("password").exists(),
        validateRequest(),
        async (req: NextApiRequest, res: NextApiResponse) => {
            dbCheckConnect()
            let { id, password } = req.body
            password = encryptPassword(password)
            const result = await User.findOne({ id, password })
            if (result) {
                await validate([body("key").exists(), body("persistent").exists()])(req, res)
                const { key, persistent } = req.body
                const jwt = await createJWT(key, id, "1d", "user")
                const cookies = [`access_token=${jwt};Max-Age=${1 * 24 * 60 * 60};Path=/;HttpOnly;Secure;SameSite=Strict`]
                if (persistent === true) {
                    await validate([body("persistent_key").exists()])(req, res)
                    const { persistent_key } = req.body
                    const jwt = await createJWT(persistent_key, id, "14d", "user")
                    cookies.push(`refresh_token=${jwt};Max-Age=${14 * 24 * 60 * 60};Path=/;HttpOnly;Secure;SameSite=Strict`)
                }
                res.setHeader('Set-Cookie', cookies)
                Ok(res, "success")
            } else {
                Err(res, "not a valid id or password")
            }
        }
    )

export default handler
