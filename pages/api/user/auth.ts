import { Ok } from '../../../utils/server/commonError';
import { userHandler } from '../../../utils/server/commonHandler';


const handler = userHandler()
    .post(
        async (req, res) => {
            const result = req.cookies.role
            Ok(res, result)
        })
export default handler