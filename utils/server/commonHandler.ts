import { NextApiRequest, NextApiResponse } from "next"
import { Err } from "./commonError"
import { cookie, ValidationChain, validationResult } from "express-validator"
import nextConnect, { NextHandler } from "next-connect"
import { checkDB, saveLog, serverAuth, validateRequest } from "./middleware"
import authController from "./authController"

function errorToJson(err: Error): any {
    let { cause, name, message, stack } = err
    if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
        try {
            const stackList = stack?.split("\n    ")
            if (cause !== undefined) {
                return { cause: errorToJson(cause), stack: stackList, message, name }
            } else {
                return { stack: stackList, message, name }
            }
        } catch {
            return { stack, message, name }
        }
    } else {
        return { message, name }
    }
}

export function customHandler() {
    return nextConnect({
        onError: (err: Error, req: NextApiRequest, res: NextApiResponse, next: any) => {
            if (err instanceof Error) {
                Err(res, errorToJson(err))
            } else {
                Err(res, err)
            }
        },
        onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
            Err(res, "page not found")
        },
    }).use(checkDB).use(authController)
}

export function validate(validations: ValidationChain[]) {
    return (req: NextApiRequest, res: NextApiResponse) => {
        return new Promise(async (resolve, reject) => {
            try {
                await Promise.all(validations.map((validation) => validation.run(req)))
                const errors = validationResult(req)
                errors.isEmpty() ? resolve(errors.array()) : reject(errors.array())
            } catch (error) {
                reject(error)
            }
        })
    }
}