// Your remove.bg API key (get free at https://www.remove.bg/api)
const REMOVE_BG_API_KEY = "cG88rGpwKFWcjwDTNGxcYov5";

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

function loadImageFromBase64(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataUrl;
  });
}

async function removeBackgroundOnly(blob) {
  const apiKey = REMOVE_BG_API_KEY; // Replace with your actual key

  const formData = new FormData();
  formData.append("image_file", blob);
  formData.append("size", "auto");
  formData.append("format", "png");

  const res = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey,
    },
    body: formData,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Remove.bg error: ${error}`);
  }

  const arrayBuffer = await res.arrayBuffer();
  const base64 = btoa(
    new Uint8Array(arrayBuffer).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );
  return `data:image/png;base64,${base64}`;
}

function switchTab(tab) {
  document
    .querySelectorAll(".tab-content")
    .forEach((tc) => tc.classList.remove("active"));
  document
    .querySelectorAll(".tabs button")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(tab + "Tab").classList.add("active");
  document.getElementById(tab + "TabBtn").classList.add("active");
  if (tab === "saved") renderList();
}

async function previewOverlay() {
  const subText = document.getElementById("subText").value.trim();
  const name = document.getElementById("ministerName").value.trim();
  const file = document.getElementById("imageUpload").files[0];

  if (!subText || !name || !file) {
    return alert("Please fill prefix, name, and upload an image.");
  }

  try {
    const img = await loadImage(file);
    if (img.width < 240 || img.height < 300) {
      return alert("Image must be at least 240×300 pixels.");
    }

    const blob = await (await fetch(img.src)).blob();
    const fg = await removeBackgroundOnly(blob); // 👈 No cropping

    document.getElementById("previewPhoto").src = fg;
    const p = document.getElementById("previewText");
    p.textContent = `${subText} – ${name}`;
    p.style.color = document.getElementById("textColor").value;
    document.getElementById("previewOverlay").style.display = "flex";
  } catch (e) {
    alert("Background removal failed: " + e.message);
  }
}

async function saveOverlay() {
  const subText = document.getElementById("subText").value.trim();
  const name = document.getElementById("ministerName").value.trim();
  const file = document.getElementById("imageUpload").files[0];

  if (!subText || !name || !file) {
    return alert("Please fill prefix, name, and upload an image.");
  }

  try {
    const img = await loadImage(file);

    // ✅ Check minimum height
    if (img.width < 240 || img.height < 300) {
      return alert("Image must be at least 240×300 pixels.");
    }

    const blob = await (await fetch(img.src)).blob();
    const fg = await removeBackgroundOnly(blob);

    const overlay = {
      subText,
      name,
      topColor: document.getElementById("topColor").value,
      bottomColor: document.getElementById("bottomColor").value,
      textColor: document.getElementById("textColor").value,
      imageBase64: fg,
    };

    let list = JSON.parse(localStorage.getItem("nowMinisteringList") || "[]");
    list.push(overlay);
    localStorage.setItem("nowMinisteringList", JSON.stringify(list));

    alert("Overlay saved!");
    document.getElementById("subText").value = "";
    document.getElementById("ministerName").value = "";
    document.getElementById("imageUpload").value = "";
    document.getElementById("previewOverlay").style.display = "none";
  } catch (e) {
    alert("Background removal failed: " + e.message);
  }
}

function renderList() {
  const list = JSON.parse(localStorage.getItem("nowMinisteringList") || "[]");
  const container = document.getElementById("overlayList");
  container.innerHTML = list.length
    ? list
        .map(
          (o, i) => `
      <div class="overlay-card">
        <strong>${o.subText} – ${o.name}</strong><br/>
        <div class="actions">
          <button onclick="showOverlay(${i})">Show</button>
          <button onclick="deleteOverlay(${i})">Delete</button>
        </div>
      </div>`
        )
        .join("")
    : "<p>No saved overlays yet.</p>";
}

function showOverlay(i) {
  const list = JSON.parse(localStorage.getItem("nowMinisteringList") || "[]");
  localStorage.setItem("nowMinisteringCurrent", JSON.stringify(list[i]));
  const d = parseInt(document.getElementById("hideDelay").value, 10);
  if (d > 0) setTimeout(hideOverlay, d * 1000);
}

function deleteOverlay(i) {
  let list = JSON.parse(localStorage.getItem("nowMinisteringList") || "[]");
  list.splice(i, 1);
  localStorage.setItem("nowMinisteringList", JSON.stringify(list));
  renderList();
}

function hideOverlay() {
  localStorage.removeItem("nowMinisteringCurrent");
}

// init
renderList();

// Utility to load image from file as <img> element
function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
