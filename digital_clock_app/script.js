let is24Hour = false;
let showColon = true;

// Format toggle
document.getElementById("formatBtn").addEventListener("click", () => {
  is24Hour = !is24Hour;
  document.getElementById("formatBtn").textContent =
    is24Hour ? "Switch to 12H" : "Switch to 24H";
  updateClock();
});

// Theme toggle
document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Main clock function
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let ampm = "";

  if (!is24Hour) {
    ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  const hh = hours.toString().padStart(2, "0");
  const mm = minutes.toString().padStart(2, "0");
  const ss = seconds.toString().padStart(2, "0");

  // blinking colon effect
  showColon = !showColon;
  const colon = showColon ? ":" : " ";

  document.getElementById(
    "clock"
  ).textContent = `${hh}${colon}${mm}${colon}${ss}${ampm}`;

  // Date
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  document.getElementById("date").textContent =
    now.toLocaleDateString(undefined, options);
}

// Run every second
setInterval(updateClock, 1000);
updateClock();