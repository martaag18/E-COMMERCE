// Exercise 6

function validate() {
  let error = 0;
  // Get the input fields
  const $fName = document.getElementById("fName");
  const $fEmail = document.getElementById("fEmail");
  const $fAddress = document.getElementById("fAddress");
  const $fLastN = document.getElementById("fLastN");
  const $fPassword = document.getElementById("fPassword");
  const $fPhone = document.getElementById("fPhone");

  // Get the error elements
  const $errorName = document.getElementById("errorName");
  const $errorEmail = document.getElementById("errorEmail");
  const $errorAddress = document.getElementById("errorAddress");
  const $errorLastN = document.getElementById("errorLastN");
  const $errorPassword = document.getElementById("errorPassword");
  const $errorPhone = document.getElementById("errorPhone");

  //ADD atribute REQUIRED

  const $fields = document.querySelectorAll(".form input");
  $fields.forEach((field) => {
    field.setAttribute("required", "true");
  });

  //RESET ERRORS

  [$fName, $fEmail, $fAddress, $fLastN, $fPassword, $fPhone].forEach(
    (input) => {
      input.classList.remove("is-invalid");
    }
  );

  //RESET ERROR MSG

  [$errorName, $errorLastN, $errorPassword].forEach((error) => {
    error.innerHTML = "";
  });

  // Validate fields entered by the user: name, phone, password, and email

  //Regular Expressions

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/; // Solo letras y espacios
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Formato de email
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)$/; //Al menos 1 letra, un numero.

  //VALIDATE NAME

  if (
    $fName.value.trim() == "" ||
    $fName.value.length < 3 ||
    !nameRegex.test($fName.value)
  ) {
    $fName.classList.add("is-invalid");
    $errorName.innerHTML =
      "This field is required and must have, at least, 3 characters. Characters must be only letters";
    error++;
  }

  //EMAIL

  if ($fEmail.value.trim() == "" || !emailRegex.test($fEmail.value)) { 
    $fEmail.classList.add("is-invalid");
    error++;
  }

  //VALIDATE ADDRESS

  if ($fAddress.value.trim() == "" || $fAddress.value.length < 3) {
    $fAddress.classList.add("is-invalid");
    error++;
  }

  //LAST NAME

  if (
    $fLastN.value.trim() == "" ||
    $fLastN.value.length < 3 ||
    !nameRegex.test($fLastN.value)
  ) {
    $errorLastN.innerHTML =
      "This field is required and must have, at least, 3 characters. Characters must be only letters";
    $fLastN.classList.add("is-invalid");
    error++;
  }

  //PASSWORD

  if (
    $fPassword.value.trim() == "" ||
    $fPassword.value.length < 3 ||
    !passwordRegex.test($fPassword.value)
  ) {
    $errorPassword.innerHTML =
      "Enter a correct password. It must contain numbers and letters";
    $fPassword.classList.add("is-invalid");
    error++;
  }

  //PHONE

  if (
    $fPhone.value.trim() == "" ||
    $fPhone.value.length < 3 ||
    isNaN($fPhone.value)
  ) {
    $fPhone.classList.add("is-invalid");
    error++;
  }

  if (error > 0) {
    alert("Error");
  } else {
    alert("OK");
  }
}
