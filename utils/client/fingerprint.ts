import FingerprintJS from '@fingerprintjs/fingerprintjs'
import customAxios from '../customAxios'

// for client
export async function getFingerprint() {
    const fp = await FingerprintJS.load()
    const result = await fp.get()
    return result.visitorId
}
// for client
export async function clientAuth() {
    const fingerprint = await getFingerprint()
    const res = await customAxios.post("/api/user/auth", { fingerprint })
    if (res.status === 200) {
        return res.data
    }
    return
}