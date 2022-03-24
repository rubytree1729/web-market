
import commonHandler from '../../../utils/commonHandler';
import { Err, Ok } from "../../../utils/commonError";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect"

const handler = nc(commonHandler)
    .get(
        async (req: NextApiRequest, res: NextApiResponse) => {
            const cookies = [`access_token=;Max-Age=-1;Path=/;HttpOnly;Secure;SameSite=Strict`
                , `refresh_token=;Max-Age=-1;Path=/;HttpOnly;Secure;SameSite=Strict`]
            res.setHeader('Set-Cookie', cookies)
            Ok(res, "success")
        }
    )

export default handler
