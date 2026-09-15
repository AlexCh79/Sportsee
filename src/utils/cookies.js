// Stockage du JWT dans un cookie
export function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie= `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`
}

// Écriture du cookie
export function getCookie(name) {
    const match = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${name}=`))

    if(!match) return null
    
    return decodeURIComponent(match.split('=')[1])
}

// Réécriture du cookie avec une date d'expiration passée pour le faire expirer
export function deleteCookie(name) {
    document.cookie=`${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`
}