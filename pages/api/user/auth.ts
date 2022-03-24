import { Ok } from '../../../utils/server/commonError';
import { userHandler } from '../../../utils/server/commonHandler';


const handler = userHandler()
    .all(
        async (req, res) => {
            Ok(res, req.cookies.role)
        })
export default handler