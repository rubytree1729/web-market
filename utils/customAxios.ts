import axios from "axios";
import { envExist } from "./validateEnv";

const customAxios = axios.create({
    baseURL: envExist(process.env.NEXT_PUBLIC_BASE_URL, "next public base url"),
    validateStatus: function (status) {
        // 상태 코드가 500 이상일 경우 거부. 나머지(500보다 작은)는 허용.
        return status < 500;
    }
})

export default customAxios