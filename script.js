// Toggle the menu open/closed when clicking the menu toggle button.
document.getElementById("menuToggle").addEventListener("click", function() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("closed");

  // Update the button icon: show "☰" when the menu is closed and "X" when open.
  if (menu.classList.contains("closed")) {
    this.innerText = "☰";
  } else {
    this.innerText = "X";
  }
});

