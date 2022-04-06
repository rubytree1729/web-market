import { body, cookie } from 'express-validator';
import { NextApiRequest, NextApiResponse } from 'next';
import User, { user } from '../../../models/User';
import { encryptAuthNumber, encryptPassword } from '../../../utils/encrypt';
import { equals, Err, Ok } from '../../../utils/server/commonError';
import { customHandler } from '../../../utils/server/commonHandler';
import { validateRequest } from '../../../utils/server/middleware';


const handler = customHandler()
    .get( // 입력: 없음, 출력: 해당 유저의 모든 정보
        async (req, res) => {
            const { id, info } = req.query
            if (info) {
                const { userid } = req.cookies
                const result = await User.findOne({ id: userid })
                if (!result) {
                    return Err(res, "misterious error with token")
                } else {
                    if (info === "true") {
                        const { role, name, email, gender, phonenumber, fulladdress, likelist } = result
                        return Ok(res, { id: userid, role, name, email, gender, phonenumber, fulladdress, likelist })
                    } else {
                        const { role } = result
                        return Ok(res, { role })
                    }
                }
            }
            else {
                return (id && await User.findOne({ id })) ? Err(res, "already exist id") : Ok(res, "id not exists")
            }
        })
    .post(
        validateRequest([
            body("id").exists(),
            body("password").exists(),
            body("authnumber").exists(),
            cookie("authnumber").exists()]),
        async (req: NextApiRequest, res: NextApiResponse) => {
            let { id, password, name, email, gender, phonenumber, fulladdress }: user = req.body
            if (await User.findOne({ id })) {
                Err(res, "duplicate id")
            }
            const clientAuthNubmer = req.body.authnumber
            const serverAuthNumber = req.cookies.authnumber
            equals(encryptAuthNumber(clientAuthNubmer), serverAuthNumber, "authnumber")
            const result = await new User({ id, password: encryptPassword(password), name, email, gender, phonenumber, fulladdress, registerAt: new Date() }).save()
            const cookies = [`authnumber=;Max-Age=-1;Path=/;HttpOnly;Secure;SameSite=Strict`]
            res.setHeader('Set-Cookie', cookies)
            Ok(res, result)
        }
    )
    .patch( // 입력: 해당 유저의 수정 정보(fulladdress, password의 경우 oldpassword까지), 출력: 성공 여부
        async (req, res) => {
            const { userid } = req.cookies
            let { fulladdress, password, oldpassword } = req.body
            const result = await User.findOne({ id: userid })
            if (!result) {
                return Err(res, "userid not exist")
            }
            if (oldpassword || password) {
                if (encryptPassword(oldpassword) !== result.password) {
                    return Err(res, "password not matched")
                }
            }
            password = password && encryptPassword(password)
            result.fulladdress = fulladdress
            result.password = password
            return Ok(res, await result.save())
        })
export default handler