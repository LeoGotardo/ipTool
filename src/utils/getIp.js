export function getIp() {
    const ip = window.ipData?.ip;
    if (ip) return ip;
    return window.location.hostname;
}