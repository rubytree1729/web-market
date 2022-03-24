import { body, check, header } from "express-validator";
import User from "../../../models/User";
import { Err, Ok } from "../../../utils/commonError";
import commonHandler, { validateRequest } from "../../../utils/commonHandler";
import dbCheckConnect from "../../../utils/dbCheckConnect";
import nc from "next-connect"


const handler = nc(commonHandler)
    .post(
        body("id").exists(),
        validateRequest(),
        async (req, res) => {
            dbCheckConnect()
            const result = await User.findOne({ id: req.body.id })
            if (!result) {
                Ok(res, true)
            } else {
                Err(res, false)
            }
        }
    )

export default handler;