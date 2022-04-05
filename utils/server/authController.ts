import { cookie } from "express-validator"
import { NextApiRequest, NextApiResponse } from "next"
import { NextHandler } from "next-connect"
import { serverAuth, saveLog, validateRequest, validate } from "./middleware"

interface authCondition {
    path: string,
    detail?: (string | { method: string, query?: string[], body?: string[] })[] // GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH
}

const ADMINCONDITION: Array<authCondition> = [
    { path: "/api/admin/userlist" }
]
const USERCONDITION: Array<authCondition> = [
    { path: "/api/user", detail: [{ method: "GET", query: ["info"] }, "PATCH"] },
    { path: "/api/qaboard" },
    { path: "/api/product", detail: ["POST", "PUT", "DELETE"] }
]

function checkAuth(conditions: authCondition[], req: NextApiRequest) {
    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname
    for (let condition of conditions) {
        if (pathname === condition.path) {
            if (condition.detail) {
                for (let detail of condition.detail) {
                    if (typeof detail === "string") {
                        if (req.method.toUpperCase() === detail.toUpperCase()) {
                            return true
                        }
                    } else {
                        if (detail.query) {
                            const targetQuery = Object.keys(req.query)
                            for (let query of detail.query) {
                                if (targetQuery.includes(query)) {
                                    return true
                                }
                            }
                        }
                        if (detail.body) {
                            const targetBody = Object.keys(req.body)
                            for (let body of detail.body) {
                                if (targetBody.includes(body)) {
                                    return true
                                }
                            }
                        }
                    }
                }
            } else {
                return true
            }
        }
    }
    return false
}


export default async function authController(req: NextApiRequest, res: NextApiResponse, next: NextHandler) {
    if (checkAuth(ADMINCONDITION, req)) {
        await serverAuth(req, res), saveLog(req, res), validate([cookie("role").equals("admin")])(req, res)
    } else if (checkAuth(USERCONDITION, req)) {
        await serverAuth(req, res), saveLog(req, res)
    } else {
        await saveLog(req, res)
    }
    next()
}