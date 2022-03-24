import { Ok } from '../../../utils/server/commonError';
import { userHandler } from '../../../utils/server/commonHandler';


const handler = userHandler()
    .get(
        async (req, res) => {
            Ok(res, "success")
        })
export default handler