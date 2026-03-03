export function loockup(){
    const ip = document.getElementById('ip').value

    if(!isValidIp(ip)){
        alert('Invalid IP')
        return
    }

    let ipData = fetch(`https://api.ipapi.com/api/${ip}?access_key=e0b1e9c1c2d3e4f5`)
        .then(response => response.json()).catch(error => console.log(error))

    
}

function isValidIp(ip) {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
}