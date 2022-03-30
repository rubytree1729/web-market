import { cookie } from 'express-validator';
import User from '../../../models/User';
import { Ok } from '../../../utils/server/commonError';
import { userHandler } from '../../../utils/server/commonHandler';
import { validateRequest } from '../../../utils/server/middleware';


const handler = userHandler()
    .use(validateRequest([cookie("userid").exists()]))
    .get( // 입력: 없음, 출력: 해당 유저의 모든 정보
        async (req, res) => {
            const { userid } = req.cookies
            return Ok(res, await User.findOne({ id: userid }))
        })
    .patch( // 입력: 해당 유저의 수정 정보(아직까지는 fulladdress만), 출력: 성공 여부
        async (req, res) => {
            const { userid } = req.cookies
            const { fulladdress } = req.body
            return Ok(res, await User.updateOne({ id: userid }, { $set: { fulladdress } }))
        })
export default handler