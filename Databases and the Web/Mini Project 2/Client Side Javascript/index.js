const stars = document.getElementById("modal_icons");
const ratingElement = document.getElementById("rating");
const ratingInput = document.getElementById("rating_input");

var loginFormContainer = document.getElementById("loginFormContainer");
var signInButton = document.querySelector(".login_btn");
var plusIcon = document.querySelector(".login_heading i");

// Function to toggle login form visibility
function toggleLoginForm() {
  if (loginFormContainer.style.display !== "block") {
    loginFormContainer.style.display = "block";
  } else {
    loginFormContainer.style.display = "none";
  }
}

// Event listener for SIGN IN button
signInButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default link behavior
  toggleLoginForm();
});

// Event listener for + icon
plusIcon.addEventListener("click", function () {
  toggleLoginForm();
});

function addRating(index) {
  let html = "";
  Array(index)
    .fill()
    .forEach((_, i) => {
      html += `<i
    onclick="addRating(${i + 1})"
    class="fa-solid fa-star rating-star"
    style="color: #ff9c00 !important"
  ></i>`;
    });
  Array(5 - index)
    .fill()
    .forEach((_, i) => {
      html += `<i
    onclick="addRating(${index + i + 1})"
    class="fa-regular fa-star rating-star"
    style="color: #ff9c00 !important"
  ></i>`;
    });

  ratingInput.value = index;

  stars.innerHTML = html;
}
