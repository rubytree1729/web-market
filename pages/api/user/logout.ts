
import { Ok } from "../../../utils/server/commonError";
import { NextApiRequest, NextApiResponse } from "next";
import { logHandler } from "../../../utils/server/commonHandler";
import LoginToken from "../../../models/LoginToken";
import { verifyJWT } from "../../../utils/encrypt";

const handler = logHandler()
    .get(
        async (req: NextApiRequest, res: NextApiResponse) => {
            const cookies = [`access_token=;Max-Age=-1;Path=/;HttpOnly;Secure;SameSite=Strict`,
                `refresh_token=;Max-Age=-1;Path=/;HttpOnly;Secure;SameSite=Strict`]
            res.setHeader('Set-Cookie', cookies)
            const { refresh_token } = req.cookies
            if (refresh_token) {
                const { jti } = await verifyJWT(refresh_token)
                await LoginToken.deleteOne({ jti })
            }
            res.redirect("/")
        }
    )

export default handler
