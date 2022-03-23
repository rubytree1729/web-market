import { NextApiResponse } from "next";


export function Ok(res: NextApiResponse, result: any) {
    return res.status(200).json({ result })
}
export function Err(res: NextApiResponse, error: any) {
    return res.status(400).json({ error })
}

export function exists(target: any, name: string) {
    if (target === undefined)
        throw { msg: "Invalid value", param: name, method: "exists" }
}

export function isEmpty(target: any, name: string) {
    if (!target) {
        throw { msg: "Invalid value", param: name, method: "isEmpty" }
    }
}
export function equals(target: any, compare: any, name: string) {
    if (target !== compare)
        throw { msg: "Invalid value", param: name, method: "equals" }
}
export function commonError(name: string, method: string) {
    return { msg: "Invalid value", param: name, method }
}

export function equalsError(name: string) {
    return commonError(name, "equals")
}
export function existsError(name: string) {
    return commonError(name, "exists")
}
export function isEmptyError(name: string) {
    return commonError(name, "isEmpty")
}
export function isInError(name: string) {
    return commonError(name, "isIn")
}
export function isStringError(name: string) {
    return commonError(name, "isString")
}
