document.addEventListener("DOMContentLoaded", () => {
  const formOpenBtn = document.getElementById("form-open");
  const home = document.querySelector(".home");
  const formContainer = document.querySelector(".form_container");
  const formCloseBtn = document.querySelector(".form_close");
  const roleSelection = document.querySelector(".role_selection");
  const userLoginForm = document.getElementById("user_login_form");
  const userSignupForm = document.getElementById("user_signup_form");
  const uploadNoteButton = document.getElementById("upload_note_button");
  const welcomeMessage = document.querySelector(".welcome_message");

  formOpenBtn.addEventListener("click", () => {
    home.classList.add("show");
    roleSelection.style.display = "block";
  });
  formCloseBtn.addEventListener("click", () => {
    home.classList.remove("show");
    resetForms();
  });

  function resetForms() {
    roleSelection.style.display = "block";
    userLoginForm.style.display = "none";
    userSignupForm.style.display = "none";
  }

  document.getElementById("user_role").addEventListener("click", () => {
    roleSelection.style.display = "none";
    userLoginForm.style.display = "block";
  });

  document.getElementById("user_signup_link").addEventListener("click", (e) => {
    e.preventDefault();
    userLoginForm.style.display = "none";
    userSignupForm.style.display = "block";
  });

  document.getElementById("user_login_link").addEventListener("click", (e) => {
    e.preventDefault();
    userSignupForm.style.display = "none";
    userLoginForm.style.display = "block";
  });

  // دراپ‌داون
  const dropdownToggles = document.querySelectorAll(".dropdown_toggle");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const menu = toggle.nextElementSibling;
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
  });

  document.addEventListener("click", (e) => {
    dropdownToggles.forEach((toggle) => {
      const menu = toggle.nextElementSibling;
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
      }
    });
    
    document.getElementById("admin_role").addEventListener("click", () => {
      roleSelection.style.display = "none";
      // نمایش فرم ادمین، اگر وجود دارد
      const adminLoginForm = document.getElementById("admin_login_form");
      if (adminLoginForm) {
        adminLoginForm.style.display = "block";
      } else {
        alert("فرم ورود ادمین تعریف نشده است.");
      }
    });
    
  });

  // قسمت انیمشن خوش امد گویی
  setTimeout(() => {
    welcomeMessage.classList.add("animated");
  }, 1000);

  // برسی لاگین کردن
  if (uploadNoteButton) {
    uploadNoteButton.addEventListener("click", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn !== "true") {
        alert("برای اپلود جزوه، لطفاً ابتدا وارد حساب کاربری خود شوید.");
        return;
      }
      window.location.href = "upload_page.html";
    });
  }

  
  const userLoginButton = document.querySelector("#user_login_form button");
  if (userLoginButton) {
    userLoginButton.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.querySelector("#user_login_form input[type='email']")?.value;
      const password = document.querySelector("#user_login_form input[type='password']")?.value;

      if (email === "user@example.com" && password === "password123") {
        localStorage.setItem("isLoggedIn", "true");
        alert("ورود موفقیت‌آمیز!");
        resetForms();
        home.classList.remove("show");
      } else {
        alert("ایمیل یا رمز عبور اشتباه است.");
      }
    });
  }

  // قسمت منوی تصاویر 
  const slidesContainer = document.querySelector(".carousel_slides");
  const slides = document.querySelectorAll(".carousel_item");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  let currentIndex = 0;
  const totalSlides = slides.length;
  const intervalTime = 3000;

  function showSlide(index) {
    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
  }

  if (nextButton) {
    nextButton.addEventListener("click", nextSlide);
  }

  if (prevButton) {
    prevButton.addEventListener("click", prevSlide);
  }

  setInterval(nextSlide, intervalTime);
});

document.addEventListener("DOMContentLoaded", () => {
  const gardeningLink = document.getElementById("gardening_link");
  if (gardeningLink) {
    gardeningLink.addEventListener("click", (e) => {
      e.preventDefault();
      alert("متاسفانه  برای این رشته هنوز صفحه ای ساخته نشده است.");
    });
  }
});
