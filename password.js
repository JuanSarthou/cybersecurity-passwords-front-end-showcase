// Toggle the menu open/closed when clicking the toggle button.
// Toggle the menu open/closed when clicking the toggle button.
document.getElementById("menuToggle").addEventListener("click", function() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("closed");

  if (menu.classList.contains("closed")) {
    this.innerText = "☰";
  } else {
    this.innerText = "X";
  }
});

// (Rest of your password generation code remains unchanged)


// Listen for clicks on "Generate Password" and "Copy" buttons.
document.getElementById("generateBtn").addEventListener("click", generatePassword);
document.getElementById("copyBtn").addEventListener("click", copyPassword);

function generatePassword() {
  // Get the desired length from the input (ensuring a minimum of 12).
  let length = parseInt(document.getElementById("lengthInput").value);
  if (isNaN(length) || length < 12) {
    length = 12;
    document.getElementById("lengthInput").value = 12;
  }

  // Define the character sets.
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>/?";

  // Combined pool for additional characters.
  const allChars = lower + upper + digits + symbols;

  // Ensure the password has at least one character from each category.
  let passwordArray = [];
  passwordArray.push(lower[Math.floor(Math.random() * lower.length)]);
  passwordArray.push(upper[Math.floor(Math.random() * upper.length)]);
  passwordArray.push(digits[Math.floor(Math.random() * digits.length)]);
  passwordArray.push(symbols[Math.floor(Math.random() * symbols.length)]);

  // Fill the rest of the password.
  for (let i = passwordArray.length; i < length; i++) {
    passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle the array to avoid predictable positions.
  for (let i = passwordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  const password = passwordArray.join('');
  document.getElementById("passwordOutput").value = password;

  // Calculate the estimated cracking time.
  // Total combinations = (pool size)^(password length).
  // Assuming a brute-force rate of 1e9 (1 billion) guesses per second,
  // which is roughly the performance of a high-end machine or a specialized attack setup.
  const poolSize = allChars.length;
  const logYears = length * Math.log10(poolSize) - 9 - Math.log10(3.154e7);
  let estimatedYears = Math.pow(10, logYears);
  
  // Format the estimated time into a human-friendly string.
  let timeString = formatTime(estimatedYears);

  // Update the cracking time display.
  document.getElementById("estimateText").innerText =
    "Estimated cracking time (assuming 1 billion attempts/sec): " + timeString;

  // Add an explanation of what "1 billion attempts/sec" means.
  document.getElementById("explanationText").innerText =
    "This estimate assumes an attacker using a high-performance system capable of trying 1 billion password guesses every second – " +
    "a speed achievable by specialized hardware or coordinated botnets. For context, a password that would take " +
    timeString + " to crack is effectively unbreakable by brute force with current technology.";
}

function copyPassword() {
  const passwordField = document.getElementById("passwordOutput");
  passwordField.select();
  passwordField.setSelectionRange(0, 99999); // For mobile devices

  try {
    document.execCommand("copy");
    alert("Password copied to clipboard!");
  } catch (err) {
    alert("Unable to copy password.");
  }
}

function formatTime(years) {
  // Convert the estimated time to a friendly string.
  if (years < 1) {
    const seconds = years * 3.154e7;
    if (seconds < 60) {
      return seconds.toFixed(2) + " seconds";
    } else if (seconds < 3600) {
      return (seconds / 60).toFixed(2) + " minutes";
    } else if (seconds < 86400) {
      return (seconds / 3600).toFixed(2) + " hours";
    } else {
      return (seconds / 86400).toFixed(2) + " days";
    }
  } else if (years < 1e6) {
    return years.toFixed(2) + " years";
  } else {
    // For large values, display in millions of years.
    const millionYears = years / 1e6;
    return millionYears.toFixed(2) + " million years";
  }
}
