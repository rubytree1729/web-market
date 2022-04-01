import { cookie } from 'express-validator';
import User from '../../../models/User';
import { Err, Ok } from '../../../utils/server/commonError';
import { userHandler } from '../../../utils/server/commonHandler';
import { validateRequest } from '../../../utils/server/middleware';


const handler = userHandler()
    .use(validateRequest([cookie("userid").exists()]))
    .get( // 입력: 없음, 출력: 해당 유저의 모든 정보
        async (req, res) => {
            const { userid } = req.cookies
            const result = await User.findOne({ id: userid })
            if (!result) {
                return Err(res, "misterious error with token")
            } else {
                const { role, name, email, gender, phonenumber, fulladdress, likelist } = result
                return Ok(res, { role, name, email, gender, phonenumber, fulladdress, likelist })
            }

        })
    .patch( // 입력: 해당 유저의 수정 정보(아직까지는 fulladdress만), 출력: 성공 여부
        async (req, res) => {
            const { userid } = req.cookies
            const { fulladdress } = req.body
            return Ok(res, await User.updateOne({ id: userid }, { $set: { fulladdress } }))
        })
export default handler