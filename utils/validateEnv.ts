export function envExist(key: string | undefined, name: string, isLocal?: boolean) {
    if (!key) {
        const env = isLocal ? ".env.local" : ".env"
        throw new Error(
            `Please define the ${name} environment variable inside ${env}`
        )
    }
    return key
}