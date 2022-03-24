import { Ok } from '../../../utils/server/commonError';
import { adminHandler } from '../../../utils/server/commonHandler';


const handler = adminHandler()
    .post(
        async (req, res) => {
            const result = req.cookies.role
            Ok(res, result)
        })
export default handler