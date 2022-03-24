import { body, check, cookie } from 'express-validator';
import commonHandler, { validate, validateRequest } from '../../../utils/commonHandler';
import { Err, Ok } from "../../../utils/commonError";
import { NextApiRequest, NextApiResponse } from "next";
import { verifyJWT, refreshJWT } from "../../../utils/encrypt";
import nc from "next-connect"




const handler = nc(commonHandler)
    .post(
        body("token_type").isIn(["access_token", "refresh_token"]),
        body("key").exists(),
        validateRequest(),
        async (req: NextApiRequest, res: NextApiResponse) => {
            const token_type: string = req.body.token_type // access_token or refresh_token  
            const key = req.body.key
            try {
                await validate([cookie(token_type).exists()])(req, res)
                const token = req.cookies[token_type]
                await verifyJWT(token, key)
                if (token_type === "refresh_token") {
                    const persistent_key = req.body.persistent_key
                    const jwt = await refreshJWT(token, key, persistent_key)
                    const cookies = [`access_token=${jwt};Max-Age=${1 * 24 * 60 * 60};Path=/;HttpOnly;Secure;SameSite=Strict`]
                    res.setHeader('Set-Cookie', cookies)
                }
                return Ok(res, "success")
            } catch (error) {
                if (token_type === "access_token" && req.cookies.refresh_token) {
                    return Ok(res, "refresh_token")
                } else {
                    return Err(res, error)
                }
            }
        }
    )

export default handler