export async function lookup() {
  const ip = document.getElementById('ip').value;

  if (!isValidIp(ip)) {
    alert('Invalid IP');
    return;
  }

  try {
    const response = await fetch(`https://api.ipapi.com/api/${ip}?access_key=890e1219628ae153bb16464ce62a8ecf`);
    const data = await response.json();
    console.log(data);
    window.ipData = data;
    window.dispatchEvent(new Event("ipDataReady"));
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

function isValidIp(ip) {
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6 = /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i;

  if (ipv4.test(ip)) {
    return ip.split(".").every(n => Number(n) <= 255);
  }

  return ipv6.test(ip);
}