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

export function equals(target: any, compare: any, name: string) {
    if (target !== compare)
        throw { msg: "Invalid value", param: name, method: "equals" }
}