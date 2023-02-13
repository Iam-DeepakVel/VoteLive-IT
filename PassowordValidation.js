function checkInputValues() {
  // Get all input elements
  const inputs = document.querySelectorAll("input");
  // Check if all inputs have values
  let allValuesPresent = true;
  inputs.forEach((input) => {
    if (!input.value) {
      allValuesPresent = false;
    }
  });
  // Return the result
  return allValuesPresent;
}

// Password doesn't match tag & vote success tag
const voteSuccess = document.getElementById("vote-success");
const passwordMismatch = document.getElementById("password-mismatch");

// Getting Form field values
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");

// Get buttons
const voteButton = document.getElementById("vote-tag");
const backToHomeButton = document.getElementById("back-to-home-tag");

// Empty fields msg
const emptyFieldsMsg = document.getElementById("empty-fields-msg");


// Get the form
let values = {};
const form = document.getElementById("form");

password.addEventListener("change", (e) => {
  values.password = e.target.value;
});
confirmPassword.addEventListener("change", (e) => {
  values.confirmPassword = e.target.value;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const noError = checkInputValues();
  if (noError) {
    if (values.password === values.confirmPassword) {
      // add vote success message
      voteSuccess.classList.remove("hidden");
      voteSuccess.classList.add("block");

      // remove password mismatch message
      passwordMismatch.classList.add("hidden");
      passwordMismatch.classList.remove("block");

      //After Successful Voting show Back to home button
      voteButton.classList.add("hidden");
      backToHomeButton.classList.remove("hidden");

      // Send to API
      console.log(values);
    } else {
      // add password mismatch message
      passwordMismatch.classList.remove("hidden");
      passwordMismatch.classList.add("block");
      // remove vote success message
      voteSuccess.classList.remove("block");
      voteSuccess.classList.add("hidden");
    }
  } else {
    // If field Values are empty
    emptyFieldsMsg.classList.remove("hidden");
    setTimeout(() => {
      emptyFieldsMsg.classList.add("hidden");
    }, 3000);
  }
});
