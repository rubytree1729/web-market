import type { NextApiRequest, NextApiResponse } from 'next'
import User, { user } from "../../../models/User"
import { body, cookie } from 'express-validator';
import { equals, Err, Ok } from '../../../utils/server/commonError';
import { encryptAuthNumber, encryptPassword } from '../../../utils/encrypt';
import { validateRequest } from '../../../utils/server/middleware';
import { logHandler } from '../../../utils/server/commonHandler';

const handler = logHandler()
    .post(
        validateRequest([
            body("id").exists(),
            body("password").exists(),
            body("authnumber").exists(),
            cookie("authnumber").exists()]),
        async (req: NextApiRequest, res: NextApiResponse) => {
            let { id, password, name, email, gender, phonenumber, fulladdress }: user = req.body
            const duplicate = await User.findOne({ id })
            if (duplicate) {
                Err(res, "duplicate id")
            }
            const clientAuthNubmer = req.body.authnumber
            const serverAuthNumber = req.cookies.authnumber
            equals(encryptAuthNumber(clientAuthNubmer), serverAuthNumber, "authnumber")
            const result = await new User({ id, password: encryptPassword(password), name, email, gender, phonenumber, fulladdress }).save()
            const cookies = [`authnumber=;Max-Age=-1;Path=/;HttpOnly;Secure;SameSite=Strict`]
            res.setHeader('Set-Cookie', cookies)
            Ok(res, result)
        }
    )
export default handler