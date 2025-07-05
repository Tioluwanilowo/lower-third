const overlayEl = document.getElementById("overlay");
const photo = document.getElementById("photo");
const textLine = document.getElementById("textLine");

function applyOverlay(cfg) {
  // set image
  photo.src = cfg.imageBase64;
  // set bar colors
  document.querySelector(".blue-bar").style.backgroundColor = cfg.topColor;
  document.querySelector(".red-bar").style.backgroundColor = cfg.bottomColor;
  // set text
  textLine.style.color = cfg.textColor;
  textLine.textContent = `${cfg.subText} – ${cfg.name}`;
  // slide in
  overlayEl.style.bottom = "0px";
}

function hideOverlay() {
  overlayEl.style.bottom = "-300px";
}

let prev = null;
function watch() {
  const data = localStorage.getItem("nowMinisteringCurrent");
  if (data !== prev) {
    prev = data;
    data ? applyOverlay(JSON.parse(data)) : hideOverlay();
  }
  requestAnimationFrame(watch);
}
watch();
