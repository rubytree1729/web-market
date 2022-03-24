import FingerprintJSPro from '@fingerprintjs/fingerprintjs-pro'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { envExist } from './validateEnv'
import Axios from 'axios'
import { axiosConfig } from './commonHandler'


export async function getFingerprint() {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
}

export async function getFingerprintPro() {
    const fppro = await FingerprintJSPro.load({
        apiKey: envExist(process.env.NEXT_PUBLIC_FP_PUBLIC_KEY, "fp public key"), region: 'ap'
    })
    const result = await fppro.get()
    return result.visitorId
}

// for client
export async function validateToken() {
    const key = await getFingerprint()
    const token_type = "access_token"
    const res = await Axios.post("/api/user/auth", { key, token_type }, axiosConfig)
    if (res.data.result === "success") {
        return true
    } else if (res.data.result === "refresh_token") {
        const persistent_key = await getFingerprintPro()
        const token_type = "refresh_token"
        const res = await Axios.post("/api/user/auth", { key, persistent_key, token_type }, axiosConfig)
        if (res.data.result === "success") {
            return true
        }
    }

    return false
}