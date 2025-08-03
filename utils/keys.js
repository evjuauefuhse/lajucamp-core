const instances = useInstanceManager()
const cookie = useCookie("keys_" + instances.instance().id, { expires: new Date('9999-12-31') })

export const hackyCookieWorkaround = () => {
    const currentType = typeof cookie.value
    if (currentType === "string") {
        return JSON.parse(cookie.value)
    } else {
        return cookie.value
    }
}

export const checkMusicAccess = () => {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.allowMusic === true)
}