import { cookie } from "express-validator";
import Product from "../../../models/Product";
import { Err, Ok } from "../../../utils/server/commonError";
import { validateRequest } from "../../../utils/server/middleware";
import { userHandler } from "../../../utils/server/commonHandler";


const handler = userHandler()
    .post(
        validateRequest([
            cookie("role").equals("admin")]),
        async (req, res) => {
            const result = await Product.findOne({ id: req.body.id })
            if (!result) {
                const value = await new Product(req.body).save()
                Ok(res, value)
            } else {
                Err(res, result)
            }
        }
    )


export default handler;