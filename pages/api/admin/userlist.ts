import User, { fulladdress, user } from "../../../models/User";
import { Ok } from "../../../utils/server/commonError";
import { adminHandler } from "../../../utils/server/commonHandler";

interface userinfo {
    id: string,
    name: string,
    email: string,
    phonenumber: string,
    address: string,
    role: string,
    registerAt: string
}

const handler = adminHandler()
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



export default handler