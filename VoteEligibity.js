function calculateAge() {
  // Get the value of the input field with type "date"
  var dob = document.getElementById("dob").value;

  // Create a new Date object from the date of birth string
  var dateOfBirth = new Date(dob);

  // Get the current date
  var today = new Date();

  // Calculate the difference between the two dates in milliseconds
  var ageInMilliseconds = today - dateOfBirth;

  // Convert the age from milliseconds to years
  var ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  // Round the age to the nearest whole number
  var age = Math.floor(ageInYears);
  return age;
}

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

// Form
let values = {};
const form = document.getElementById("form");

const personName = document.getElementById("name");
const gender = document.getElementById("gender");
const place = document.getElementById("place");
const aadharNum = document.getElementById("aadharNum");

// Modal
const eligibleModal = document.getElementById("eligible-modal");
const notEligibleModal = document.getElementById("not-eligible-modal");

// Password tag
const passwordContainer = document.getElementById("password-container");

// Empty fields msg
const emptyFieldsMsg = document.getElementById("empty-fields-msg");

// updating changes in form fields to values object
personName.addEventListener("change", (e) => {
  values.name = e.target.value;
});
gender.addEventListener("change", (e) => {
  values.gender = e.target.value;
});
place.addEventListener("change", (e) => {
  values.place = e.target.value;
});
aadharNum.addEventListener("change", (e) => {
  values.aadharNum = e.target.value;
});

// Password Generator
function generatePassword({ aadharNumber, personName, personPlace }) {
  aadhar = aadharNumber.substring(0, 4);
  pName = personName.substring(0, 2);
  perPlace = personPlace.substring(0, 2);
  return `${aadhar}${pName}${perPlace}`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // Badrequest Error
  const noError = checkInputValues();

  if (noError) {
    // getting age from dob
    const age = calculateAge();
    if (age < 18) {
      notEligibleModal.classList.remove("hidden");
      notEligibleModal.classList.add("block");
    } else if (age >= 18) {
      eligibleModal.classList.remove("hidden");
      eligibleModal.classList.add("block");

      // Generate Password
      const password = generatePassword({
        aadharNumber: values.aadharNum,
        personName: values.name,
        personPlace: values.place,
      });
      passwordContainer.innerHTML = password;
      console.log("The Password is", password);
    }
    // Post to API
    console.log(values);
  } else {
    emptyFieldsMsg.classList.remove("hidden");
    setTimeout(() => {
      emptyFieldsMsg.classList.add("hidden");
    }, 3000);
  }
});
