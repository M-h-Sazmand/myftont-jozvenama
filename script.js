document.addEventListener("DOMContentLoaded", () => {

  const formOpenBtn = document.getElementById("form-open");
  const home = document.querySelector(".home");
  const formContainer = document.querySelector(".form_container");
  const formCloseBtn = document.querySelector(".form_close");
  const roleSelection = document.querySelector(".role_selection");
  const userLoginForm = document.getElementById("user_login_form");
  const userSignupForm = document.getElementById("user_signup_form");
  const welcomeMessage = document.querySelector(".welcome_message");
  const uploadNoteButton = document.getElementById("upload_note_button");
  const slidesContainer = document.querySelector(".carousel_slides");
  const slides = document.querySelectorAll(".carousel_item");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  const gardeningLink = document.getElementById("gardening_link");

  // ---------
  const userProfile = document.getElementById("user-profile");
  const usernameDisplay = document.getElementById("username-display");
  const logoutButton = document.getElementById("logout-button");
  const loginOpenButton = document.querySelector('#auth-area button#form-open');

  // ----تابع ها
  function resetForms() {
    roleSelection.style.display = "block";
    userLoginForm.style.display = "none";
    userSignupForm.style.display = "none";
    const adminLoginForm = document.getElementById("admin_login_form");
    if (adminLoginForm) adminLoginForm.style.display = "none";
  }

  async function getValidAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    if (!accessToken || !refreshToken) return null;

    try {
      const response = await fetch("http://localhost:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error("توکن نامعتبر");
      const data = await response.json();
      localStorage.setItem("access_token", data.access);
      return data.access;
    } catch (error) {
      console.error("خطا در تازه کردن توکن:", error);
      alert("لطفاً دوباره وارد شوید");
      window.location.href = "index.html";
      return null;
    }
  }

  // -----فرم ها
  formOpenBtn?.addEventListener("click", () => {
    home?.classList.add("show");
    roleSelection.style.display = "block";
  });

  formCloseBtn?.addEventListener("click", () => {
    home?.classList.remove("show");
    resetForms();
  });

  document.getElementById("user_role")?.addEventListener("click", () => {
    roleSelection.style.display = "none";
    userLoginForm.style.display = "block";
  });

 document.getElementById("admin_role")?.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "http://localhost:8000/admin/";

    if (adminLoginForm) {
      adminLoginForm.style.display = "block";
    } else {
      alert("فرم ورود ادمین تعریف نشده است.");
    }
  });

  document.getElementById("user_signup_link")?.addEventListener("click", (e) => {
    e.preventDefault();
    userLoginForm.style.display = "none";
    userSignupForm.style.display = "block";
  });

  document.getElementById("user_login_link")?.addEventListener("click", (e) => {
    e.preventDefault();
    userSignupForm.style.display = "none";
    userLoginForm.style.display = "block";
  });

  // ثبتنام------------
  userSignupForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = userSignupForm.querySelector('input[type="email"]').value;
    const username = userSignupForm.querySelector('input[type="text"]').value;
    const passwords = userSignupForm.querySelectorAll('input[type="password"]');
    const password = passwords[0].value;
    const confirmPassword = passwords[1].value;

    if (password !== confirmPassword) {
      alert("رمز عبور و تأیید رمز عبور یکسان نیستند.");
      return;
    }

    fetch("http://localhost:8000/api/accounts/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, username, password }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => { throw new Error(JSON.stringify(err)); });
        return res.json();
      })
      .then((data) => {
        alert(data.message || "ثبت‌نام موفق!");
        document.getElementById("user_login_link").click();
      })
      .catch((error) => {
        alert("خطا در ثبت‌نام: " + error.message);
      });
  });

  // ورود کاربر
  userLoginForm?.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = this.querySelector('input[type="text"]').value;
    const password = this.querySelector('input[type="password"]').value;

    fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => { throw new Error(err.detail || "ورود ناموفق."); });
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        localStorage.setItem("username", username);

        // نمایش پروفایل
        if (usernameDisplay) usernameDisplay.textContent = username;
        if (userProfile) userProfile.style.display = "flex";
        if (loginOpenButton) loginOpenButton.style.display = "none";

        alert("ورود موفق!");
        window.location.href = "index.html";
      })
      .catch((err) => {
        alert("خطا در ورود: " + err.message);
      });
  });

  // تغییر رمز که فعلا عملی نشده-
  document.getElementById("change-password-form")?.addEventListener("submit", function (e) {
    e.preventDefault();

    const oldPassword = this.querySelector('input[name="old-password"]').value;
    const newPassword = this.querySelector('input[name="new-password"]').value;
    const token = localStorage.getItem("access_token");

    fetch("http://localhost:8000/api/accounts/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => { throw new Error(JSON.stringify(err)); });
        return res.json();
      })
      .then((data) => {
        alert(data.message || "رمز عبور با موفقیت تغییر یافت!");
      })
      .catch((error) => {
        alert("خطا: " + error.message);
      });
  });

  //اپلود
document.addEventListener("DOMContentLoaded", () => {
  const uploadForm = document.getElementById("upload_notes_form");

  uploadForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const token = await getValidAccessToken();
    if (!token) return;

    try {
      const response = await fetch("http://localhost:8000/api/documents/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("خطا در آپلود:", result);
        alert("خطا در آپلود: " + (result?.detail || JSON.stringify(result)));
        return;
      }

      alert("جزوه با موفقیت آپلود شد!");
      window.location.href = "index.html";

    } catch (error) {
      console.error("خطای غیرمنتظره:", error);
      alert("مشکلی در آپلود رخ داد. لطفاً دوباره تلاش کنید.");
    }
  });
});


  // ---خوشامد
  setTimeout(() => {
    welcomeMessage?.classList.add("animated");
  }, 1000);

  // ---چک برای اپلود
  uploadNoteButton?.addEventListener("click", () => {
    const isLoggedIn = localStorage.getItem("access_token");
    if (!isLoggedIn) {
      alert("برای آپلود جزوه، ابتدا وارد شوید.");
    } else {
      window.location.href = "upload_page.html";
    }
  });

  // اسلایدر عکس ----
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

  nextButton?.addEventListener("click", nextSlide);
  prevButton?.addEventListener("click", prevSlide);
  setInterval(nextSlide, intervalTime);

  // منوی کشویی
  const dropdownToggles = document.querySelectorAll(".dropdown_toggle");
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.preventDefault();
      const menu = toggle.nextElementSibling;
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
  });

  document.addEventListener("click", e => {
    dropdownToggles.forEach(toggle => {
      const menu = toggle.nextElementSibling;
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.style.display = "none";
      }
    });
  });

  // ------------------ پیام رشته ناموجود ------------------
  
document.querySelector(".dropdown_menu").addEventListener("click", (e) => {
  
  const clickedLink = e.target.closest('.course_link');
  if (!clickedLink) return; 

  e.preventDefault(); 
  const courseName = clickedLink.textContent.trim().replace(/[\n\s]+/g, ' ');
  if (courseName.includes("مهندسی عمران")) {
    alert("متأسفانه برای رشته مهندسی عمران هنوز صفحه‌ای ساخته نشده است.");
  } else if (courseName.includes("ژنتیک")) {
    alert("متأسفانه برای رشته ژنتیک هنوز صفحه‌ای ساخته نشده است.");
  } else if (courseName.includes("باغبانی")) {
    alert("متأسفانه برای رشته باغبانی هنوز صفحه‌ای ساخته نشده است.");
  }
});
  // ------------------ نمایش پروفایل بعد از لود ------------------
  window.addEventListener("load", () => {
    const token = localStorage.getItem("access_token");
    const username = localStorage.getItem("username");

    if (token && username && usernameDisplay && userProfile && loginOpenButton) {
      usernameDisplay.textContent = username;
      userProfile.style.display = "flex";
      loginOpenButton.style.display = "none";
    }
  });

  // -----خروج
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("username");

      if (userProfile) userProfile.style.display = "none";
      if (loginOpenButton) loginOpenButton.style.display = "inline-block";

      alert("شما خارج شدید.");
    });
  }
});

async function loadNotesByCategory(categoryId) {
  try {
    const response = await fetch(`http://localhost:8000/api/documents/?category=${categoryId}`);
    const notes = await response.json();
    const notesList = document.getElementById("notes_list");

    if (!notesList) return;

    notesList.innerHTML = ""; 

    if (notes.length === 0) {
      notesList.innerHTML = "<p>هیچ جزوه‌ای یافت نشد.</p>";
      return;
    }

    notes.forEach(note => {
      const noteItem = document.createElement("div");
      noteItem.className = "note_item animated";
      noteItem.innerHTML = `
        <h3>${note.title}</h3>
        <p><strong>استاد:</strong> ${note.professor || "نامعلوم"}</p>
        <p><strong>دانشگاه:</strong> ${note.university || "نامعلوم"}</p>
        <p><strong>سال:</strong> ${note.academic_year || "نامعلوم"}</p>
        <a href="${note.file}" class="download_button" download>دانلود</a>
      `;
      notesList.appendChild(noteItem);
    });

  } catch (error) {
    console.error("خطا در دریافت جزوات:", error);
    document.getElementById("notes_list").innerHTML = "<p>خطا در دریافت جزوات</p>";
  }
}

//------
window.addEventListener("load", () => {
  const categoryId = window.CURRENT_CATEGORY_ID;
  if (categoryId) {
    loadNotesByCategory(categoryId);
  }
});
//فعال سرچ
const searchInput = document.querySelector(".search_bar input[type='text']");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const notes = document.querySelectorAll(".note_item");
    notes.forEach(note => {
      const text = note.textContent.toLowerCase();
      note.style.display = text.includes(query) ? "block" : "none";
    });
  });
}
//---------
document.getElementById('upload_notes_form').addEventListener('submit', async function (e) {
  e.preventDefault();

  
  const uploader_name = document.getElementById('uploader_name').value;
  const professor_name = document.getElementById('professor_name').value;
  const university_name = document.getElementById('university_name').value;
  const academic_year = document.getElementById('academic_year').value;
  const note_title = document.getElementById('note_title').value;
  const note_file = document.getElementById('note_file').files[0];
  const token = localStorage.getItem('access_token');


  const formData = new FormData();
  formData.append('title', note_title);
  formData.append('file', note_file);
  formData.append('uploader_name', uploader_name);
  formData.append('professor_name', professor_name);
  formData.append('university_name', university_name);
  formData.append('academic_year', academic_year);
  formData.append('category', document.getElementById('category_id').value);

  try {
 
    const response = await fetch('http://localhost:8000/api/documents/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("خطا در آپلود:", result);
      alert("خطا در آپلود: " + (result?.detail || JSON.stringify(result)));
      return;
    }

    alert("جزوه با موفقیت آپلود شد!");
    document.getElementById('upload_notes_form').reset(); 
  } catch (error) {
    console.error("خطای غیرمنتظره:", error);
    alert("مشکلی در آپلود رخ داد. لطفاً دوباره تلاش کنید.");
  }
});
