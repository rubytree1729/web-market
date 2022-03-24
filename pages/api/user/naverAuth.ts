import crypto from 'crypto';
import axios from 'axios';
import nc from "next-connect";
import commonHandler, { validateRequest } from "../../../utils/commonHandler";
import { Err, Ok } from "../../../utils/commonError";
import { envExist } from "../../../utils/validateEnv";
import { body } from 'express-validator';
import { encryptAuthNumber } from '../../../utils/encrypt';

async function naverAuth(PhoneNumber: string) {
    const NCP_accessKey = envExist(process.env.NCP_API_access_key, "NCP_API_access_key", true)
    const NCP_secretKey = envExist(process.env.NCP_API_secret_key, "NCP_API_secret_key", true)
    const NCP_serviceID = envExist(process.env.SENS_service_ID, "SENS_service_ID", true)
    const sendPhoneNumber = envExist(process.env.sendPhoneNumber, "sendPhoneNumber", true)
    const space = " ";
    const newLine = "\n";
    const method = "POST";
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${NCP_serviceID}/messages`;
    const url2 = `/sms/v2/services/${NCP_serviceID}/messages`;
    const timestamp = Date.now().toString();
    const makeSignature = () => {
        const message = [];
        const hmac = crypto.createHmac('sha256', NCP_secretKey);
        message.push(method);
        message.push(space);
        message.push(url2);
        message.push(newLine);
        message.push(timestamp);
        message.push(newLine);
        message.push(NCP_accessKey);
        const signature = hmac.update(message.join('')).digest('base64');
        return signature.toString();
    }

    const userAuthNumber = Math.floor(Math.random() * (999999 - 100000)) + 100000;

    const body = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: `${sendPhoneNumber}`,
        content: `인증번호는 [${userAuthNumber}] 입니다.`,
        messages: [
            {
                to: PhoneNumber,
                content: "testing"
            },
        ],
    };
    // 헤더 제작
    const options = {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': NCP_accessKey,
            'x-ncp-apigw-signature-v2': makeSignature(),
        }
    }
    await axios.post(url, body, options);
    const result = { status: 200, data: "test" }
    if (result.status == 200) {
        return userAuthNumber
    } else {
        throw { msg: "post to naver failed", code: result.data }
    }
}

const handler = nc(commonHandler)
    .post(
        body("phonenumber").exists(),
        validateRequest(),
        async (req, res) => {
            const PhoneNumber = req.body.phonenumber;
            const serverAuthNubmer = await naverAuth(PhoneNumber)
            const cookies = [`authnumber=${encryptAuthNumber(serverAuthNubmer.toString())};Max-Age=${24 * 60 * 60};Path=/;HttpOnly;Secure;SameSite=Strict`]
            res.setHeader('Set-Cookie', cookies)
            return Ok(res, serverAuthNubmer)
        })
export default handler