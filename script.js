let main = document.getElementById("main");
let buttons = document.querySelectorAll("button[data-attr]");
let getUserBtn = document.getElementById("getUser");

let currentUser = null; // to store the current user’s data

// Function to fetch and display user
function fetchUser() {
  fetch("https://randomuser.me/api/")
    .then((res) => res.json())
    .then((data) => {
      currentUser = data.results[0]; // store user data

      // Display only image and name initially
      main.innerHTML = `
        <img src="${currentUser.picture.large}" alt="User Image" />
        <h2>${currentUser.name.first} ${currentUser.name.last}</h2>
        <h3>Additional Info:</h3>
        <div id="info"></div>
      `;
    })
    .catch((err) => {
      main.innerHTML = `<p>Error fetching user: ${err.message}</p>`;
    });
}

// Event listener for “Get Another User” button
getUserBtn.addEventListener("click", (e) => {
  e.preventDefault();
  fetchUser();
});

// Event listeners for Age, Email, Phone buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    if (!currentUser) return; // no user fetched yet
    let infoDiv = document.getElementById("info");
    let attr = e.target.getAttribute("data-attr");
    let value = "";

    if (attr === "age") value = `Age: ${currentUser.dob.age}`;
    if (attr === "email") value = `Email: ${currentUser.email}`;
    if (attr === "phone") value = `Phone: ${currentUser.phone}`;

    infoDiv.textContent = value; // show only relevant info
  });
});

// Fetch initial user on page load
window.addEventListener("DOMContentLoaded", fetchUser);
