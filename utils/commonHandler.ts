import { NextApiRequest, NextApiResponse } from "next"
import { Err } from "./commonError"
import nc, { NextHandler } from "next-connect"
import { ValidationChain, validationResult } from "express-validator"
import { envExist } from "./validateEnv"

const axiosConfig = {
    validateStatus: function (status: number) {
        // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
        return status < 500;
    }
    , baseURL: envExist(process.env.NEXT_PUBLIC_BASE_URL, "next public base url")
}

export { axiosConfig }

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

const commonHandler = {
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

export function validateRequest() {
    return (req: NextApiRequest & Request, res: any, next: NextHandler) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
            return next(); // next give mixed site order!!!!!
        } else {
            Err(res, result.array())
        }
    }
}

export default commonHandler