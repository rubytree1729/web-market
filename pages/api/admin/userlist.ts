import { body, query } from "express-validator";
import User, { fulladdress, user } from "../../../models/User";
import { Err, Ok } from "../../../utils/server/commonError";
import { customHandler } from "../../../utils/server/commonHandler";
import { validateRequest } from "../../../utils/server/middleware";

interface userinfo {
    id: string,
    name: string,
    email: string,
    phonenumber: string,
    address: string,
    role: string,
    registerAt: string
}

const handler = customHandler()
    .get(
        async (req, res) => {
            // const { sort, display, byCategory, id: id } = req.query
            // result = await Product.aggregate([{ "$match": { id: parseInt(id as string) } }, { "$sample": { "size": maxResults } }])
            const result: user[] = await User.find()
            const pre_result: any[] = []
            result.forEach(({ id, name, email, phonenumber, fulladdress: { address }, role, registerAt }) => {
                const registerString = registerAt.toLocaleString()
                const value: userinfo = { registerAt: registerString, id, name, email, address, phonenumber, role }
                pre_result.push(value)
            })
            Ok(res, pre_result)
        })
    .patch(
        validateRequest([body("ids").isArray(), body("role").isIn(["user", "admin"])]),
        async (req, res) => {
            const { ids, role } = req.body
            const result = await User.updateMany({ id: { $in: ids } }, { $set: { role } })
            Ok(res, result)
        })
    .delete(
        validateRequest([query("ids").exists()]),
        async (req, res) => {
            const { ids } = req.query
            const result = await User.deleteMany({ id: { $in: ids } })
            Ok(res, result)
        })


export default handler