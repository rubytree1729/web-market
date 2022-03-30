import User from '../../../models/User';
import { encryptPassword } from '../../../utils/encrypt';
import { Err, Ok } from '../../../utils/server/commonError';
import { userHandler } from '../../../utils/server/commonHandler';


const handler = userHandler()
    .patch( // 입력: 해당 유저의 수정전 비밀번호, 수정 후 비밀번호, 출력: 성공 여부
        async (req, res) => {
            const { userid } = req.cookies
            const { currentpassword, newpassword } = req.body
            const result = await User.findOne({ id: userid })
            if (!result) {
                return Err(res, "userid not exist")
            }
            const { password } = result
            if (encryptPassword(currentpassword) != password) {
                return Err(res, "password not matched")
            }
            return Ok(res, await User.updateOne({ id: userid }, { $set: { password: encryptPassword(newpassword) } }))
        })
export default handler