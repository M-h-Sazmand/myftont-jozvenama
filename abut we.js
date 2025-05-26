
document.addEventListener("DOMContentLoaded", () => {
  
  const formOpenBtn = document.getElementById("form-open");
  const formCloseBtn = document.querySelector(".form_close");
  const formContainer = document.querySelector(".form_container");
  const roleSelection = document.querySelector(".role_selection");
  const userLoginForm = document.getElementById("user_login_form");
  const adminLoginForm = document.getElementById("admin_login_form");
  const userSignupForm = document.getElementById("user_signup_form");
  const pwShowHide = document.querySelectorAll(".pw_hide");

  // Open
  formOpenBtn.addEventListener("click", () => {
    formContainer.style.display = "block";
    roleSelection.style.display = "block";
  });

  // Close 
  formCloseBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
    resetForms();
  });

  // Reset
  function resetForms() {
    roleSelection.style.display = "block";
    userLoginForm.style.display = "none";
    adminLoginForm.style.display = "none";
    userSignupForm.style.display = "none";
  }

  // نمایش یوزر
  document.getElementById("user_role").addEventListener("click", () => {
    roleSelection.style.display = "none";
    userLoginForm.style.display = "block";
  });

  // نمایش ادیین
  document.getElementById("admin_role").addEventListener("click", () => {
    roleSelection.style.display = "none";
    adminLoginForm.style.display = "block";
  });

  //قسمت جا یه جایی
  document.getElementById("user_signup_link").addEventListener("click", (e) => {
    e.preventDefault();
    userLoginForm.style.display = "none";
    userSignupForm.style.display = "block";
  });

  // قسمت جا یه جایی
  document.getElementById("user_login_link").addEventListener("click", (e) => {
    e.preventDefault();
    userSignupForm.style.display = "none";
    userLoginForm.style.display = "block";
  });

  
  pwShowHide.forEach((icon) => {
    icon.addEventListener("click", () => {
      let getPwInput = icon.parentElement.querySelector("input");
      if (getPwInput.type === "password") {
        getPwInput.type = "text";
        icon.classList.replace("uil-eye-slash", "uil-eye");
      } else {
        getPwInput.type = "password";
        icon.classList.replace("uil-eye", "uil-eye-slash");
      }
    });
  });
});