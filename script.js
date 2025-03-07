document.getElementById("menuToggle").addEventListener("click", function() {
  const menu = document.querySelector(".menu");
  menu.classList.toggle("closed");

  // Change the button icon: "☰" when closed, "X" when open.
  if (menu.classList.contains("closed")) {
    this.innerText = "☰";
  } else {
    this.innerText = "X";
  }
});
