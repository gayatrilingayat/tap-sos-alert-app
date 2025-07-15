// DOM Elements
const sosBtn = document.getElementById('sosBtn');
const statusEl = document.getElementById('status');
const locationEl = document.getElementById('location');
const networkEl = document.getElementById('networkStatus');
const canvas = document.getElementById('sosCanvas');
const ctx = canvas.getContext('2d');

// Start drawing SOS pulse
let radius = 10;
let growing = true;
function drawPulse() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(100, 100, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#e60000';
  ctx.lineWidth = 5;
  ctx.stroke();
  radius += growing ? 1 : -1;
  if (radius >= 80 || radius <= 10) growing = !growing;
  requestAnimationFrame(drawPulse);
}
drawPulse();

// Geolocation function
function getLocation() {
  if (!navigator.geolocation) {
    locationEl.textContent = "Geolocation not supported.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      locationEl.textContent = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
    },
    () => {
      locationEl.textContent = "Unable to fetch location.";
    }
  );
}

// Network Information API
function updateNetworkStatus() {
  if ('connection' in navigator) {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const type = conn.effectiveType;
    networkEl.textContent = `${type} connection`;
  } else {
    networkEl.textContent = "Not supported.";
  }
}
updateNetworkStatus();
navigator.connection?.addEventListener('change', updateNetworkStatus);

// SOS Button
sosBtn.addEventListener('click', () => {
  statusEl.textContent = "Sending SOS...";
  getLocation();

  setTimeout(() => {
    statusEl.textContent = "SOS Sent! 🚨";
    alert("🚨 SOS alert sent with your location! (Mock Alert)");
  }, 2000);
});
