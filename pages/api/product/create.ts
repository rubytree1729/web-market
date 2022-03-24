import { body, check, header } from "express-validator";
import Product from "../../../models/Product";
import { envExist } from "../../../utils/validateEnv";
import { Err, Ok } from "../../../utils/commonError";
import commonHandler, { validateRequest } from "../../../utils/commonHandler";
import dbCheckConnect from "../../../utils/dbCheckConnect";
import nc from "next-connect"


const handler = nc(commonHandler)
    .post(
        header("password").equals(envExist(process.env.CREATE_PASSWORD, "create password", true)),
        validateRequest(),
        async (req, res) => {
            dbCheckConnect()
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