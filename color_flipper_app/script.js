const btn = document.getElementById("btn");
const colorCode = document.getElementById("color-code");
const colorName = document.getElementById("color-name");
const rgbCode = document.getElementById("rgb-code");
const copyBtn = document.getElementById("copy-btn");
const copyMsg = document.getElementById("copy-msg");
const historyList = document.getElementById("history-list");

let lastColor = "";
let history = [];

// basic color names mapping
const colorMap = {
  "#FF0000": "Red",
  "#00FF00": "Lime",
  "#0000FF": "Blue",
  "#FFFF00": "Yellow",
  "#000000": "Black",
  "#FFFFFF": "White"
};

// 🎯 random hex generator
function getRandomHex() {
  const chars = "0123456789ABCDEF";
  let hex = "#";
  for (let i = 0; i < 6; i++) {
    hex += chars[Math.floor(Math.random() * 16)];
  }
  return hex;
}

// 🚫 prevent same color
function getUniqueHex() {
  let newColor;
  do {
    newColor = getRandomHex();
  } while (newColor === lastColor);

  lastColor = newColor;
  return newColor;
}

// 🎯 hex → rgb
function hexToRGB(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// 🎯 auto text color
function setTextColor(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  document.body.style.color = brightness > 128 ? "black" : "white";
}

// 🎯 color history
function addToHistory(hex) {
  history.unshift(hex);
  if (history.length > 5) history.pop();

  historyList.innerHTML = "";
  history.forEach(color => {
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    historyList.appendChild(box);
  });
}

// 🎯 main button click
btn.addEventListener("click", () => {
  const hex = getUniqueHex();

  document.body.style.backgroundColor = hex;
  colorCode.textContent = hex;
  rgbCode.textContent = hexToRGB(hex);
  colorName.textContent = colorMap[hex] || "Unknown Color";

  setTextColor(hex);
  addToHistory(hex);
});

// 📋 copy button
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(colorCode.textContent);
  copyMsg.textContent = "Copied!";
  setTimeout(() => (copyMsg.textContent = ""), 1500);
});