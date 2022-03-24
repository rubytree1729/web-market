import { envExist } from "./validateEnv"
import crypto from 'crypto'
import * as jose from 'jose';
import { equals } from "./commonError";


export function encryptPassword(password: string) {
    const SECRET_PASSWORD_KEY = envExist(process.env.SECRET_PASSWORD_KEY, "secret password key", true)
    return crypto.createHmac('SHA3-256', SECRET_PASSWORD_KEY).update(password).digest('hex')
}

export function encryptFingerprint(fingerprint: string) {
    const SECRET_FINGERPRINT_KEY = envExist(process.env.SECRET_FINGERPRINT_KEY, "secret fingerprint key", true)
    return crypto.createHmac('SHA3-224', SECRET_FINGERPRINT_KEY).update(fingerprint).digest('hex')
}

export function encryptAuthNumber(fingerprint: string) {
    const SECRET_FINGERPRINT_KEY = envExist(process.env.SECRET_FINGERPRINT_KEY, "secret fingerprint key", true)
    return crypto.createHmac('SHA3-224', SECRET_FINGERPRINT_KEY).update(fingerprint).digest('hex')
}


export async function createJWT(key: string, id: string, expirationtime: string | number, role: string) {
    const privateKey = await jose.importPKCS8(envExist(process.env.PKCS8, "pkcs8", true), "ES384")
    key = encryptFingerprint(key)
    const jwt = await new jose.SignJWT({ role })
        .setProtectedHeader({ alg: 'ES384' })
        .setIssuedAt()
        .setIssuer('web-market')
        .setAudience(id)
        .setExpirationTime(expirationtime)
        .setJti(key)
        .sign(privateKey)
    return jwt

}

export async function verifyJWT(jwt: string, key: string, role?: string) {
    const publicKey = await jose.importSPKI(envExist(process.env.SPKI, "spki", true), "ES384")
    const result = await jose.jwtVerify(jwt, publicKey, { algorithms: ["ES384"], issuer: 'web-market' })
    equals(result.payload.jti, key, "jti")
    if (role) {
        equals(result.payload.role, role, "role")
    }
    return result
}

export async function refreshJWT(jwt: string, key: string, persistent_key: string) {
    const { payload: { id, role } } = await verifyJWT(jwt, persistent_key)
    key = encryptFingerprint(key)
    return await createJWT(key, id as string, "1d", role as string)
}