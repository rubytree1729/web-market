import { body } from "express-validator";
import User from "../../../models/User";
import { Err, Ok } from "../../../utils/server/commonError";
import { logHandler } from "../../../utils/server/commonHandler";
import { validateRequest } from "../../../utils/server/middleware";


const handler = logHandler()
    .post(
        validateRequest([
            body("id").exists()]),
        async (req, res) => {
            const { id } = req.body
            const result = await User.findOne({ id })
            if (!result) {
                Ok(res, true)
            } else {
                Err(res, false)
            }
        }
    )

export default handler;