// Toggle the menu open/closed when clicking the toggle button.
document.getElementById("menuToggle").addEventListener("click", function() {
  const menu = document.querySelector(".menu");
  const main = document.querySelector("main");
  
  menu.classList.toggle("closed");
  main.classList.toggle("menu-open");

  // Change the button icon: "☰" when closed, "X" when open.
  if (menu.classList.contains("closed")) {
    this.innerText = "☰";
  } else {
    this.innerText = "X";
  }
});
