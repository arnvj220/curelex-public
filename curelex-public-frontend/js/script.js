/**
 * CURELEX - Healthcare Platform JavaScript
 * Handles authentication, theme toggling, modals, and dashboard
 */

// =============================================
// DOM Elements
// =============================================
const navbar = document.getElementById('navbar');
const themeToggle = document.getElementById('themeToggle');
const loginBtn = document.getElementById('loginBtn');
const loginBtnMobile = document.getElementById('loginBtnMobile');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const roleSelectionModal = document.getElementById('roleSelectionModal');
const roleSelectionClose = document.getElementById('roleSelectionClose');
const loginModal = document.getElementById('loginModal');
const loginModalClose = document.getElementById('loginModalClose');
const patientSignUpModal = document.getElementById('patientSignUpModal');
const patientSignUpModalClose = document.getElementById('patientSignUpModalClose');
const doctorSignUpModal = document.getElementById('doctorSignUpModal');
const doctorSignUpModalClose = document.getElementById('doctorSignUpModalClose');
const patientDashboard = document.getElementById('patientDashboard');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// =============================================
// Theme Toggle
// =============================================
function initTheme() {
    const savedTheme = localStorage.getItem('curelex-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    updateMobileThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

function updateMobileThemeIcon(theme) {
    const mobileThemeToggle = document.getElementById('themeToggleMobile');
    if (mobileThemeToggle) {
        const icon = mobileThemeToggle.querySelector('i');
        const span = mobileThemeToggle.querySelector('span');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            if (span) span.textContent = 'Light Mode';
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            if (span) span.textContent = 'Dark Mode';
        }
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('curelex-theme', newTheme);
    updateThemeIcon(newTheme);
    updateMobileThemeIcon(newTheme);
}

themeToggle.addEventListener('click', toggleTheme);

// Mobile theme toggle
const themeToggleMobile = document.getElementById('themeToggleMobile');
if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
        toggleTheme();
        closeMobileMenu();
    });
}

// =============================================
// Navbar Scroll Effect
// =============================================
function handleScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// =============================================
// Mobile Menu
// =============================================
function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    mobileMenu.classList.remove('active');
}

mobileMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// =============================================
// Modal Management
// =============================================
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        closeModal(modal);
    });
}

// Login Modal - Role Selection
loginBtn.addEventListener('click', () => openModal(roleSelectionModal));
loginBtnMobile.addEventListener('click', () => {
    closeMobileMenu();
    openModal(roleSelectionModal);
});
roleSelectionClose.addEventListener('click', () => closeModal(roleSelectionModal));
roleSelectionModal.querySelector('.modal-overlay').addEventListener('click', closeAllModals);

// Patient Sign Up Modal
document.getElementById('patientSignUpLink').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(patientSignUpModal);
});

document.getElementById('patientSignInLink').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(patientSignUpModal);
    openModal(loginModal);
});

patientSignUpModalClose.addEventListener('click', () => closeModal(patientSignUpModal));
patientSignUpModal.querySelector('.modal-overlay').addEventListener('click', closeAllModals);

// Doctor Sign Up Modal
document.getElementById('doctorSignUpLink').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal(loginModal);
    openModal(doctorSignUpModal);
});

doctorSignUpModalClose.addEventListener('click', () => closeModal(doctorSignUpModal));
doctorSignUpModal.querySelector('.modal-overlay').addEventListener('click', closeAllModals);

// Auth Tabs
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');
        
        // Update tab active state
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update form active state
        document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
        document.getElementById(tabId).classList.add('active');
    });
});

// =============================================
// Toast Notifications
// =============================================
function showToast(message, type = 'info') {
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    // Update toast color based on type
    const icon = toast.querySelector('.toast-content i');
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#22c55e';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#dc2626';
    } else {
        icon.className = 'fas fa-bell';
        icon.style.color = '#00a8e8';
    }
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 4000);
}


patientLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('patientEmail').value;
    const password = document.getElementById('patientPassword').value;

    try {
        const res = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        
        if (data.message == "Login successful") {
            
            localStorage.setItem("token", data.token);
            localStorage.setItem('curelex-current-user', JSON.stringify(data.user));

            closeAllModals();
            showToast(`Welcome back, ${data.user.name}!`, 'success');

            setTimeout(() => {
                window.location.href = 'html/patient-dashboard.html';
            }, 500);

        } else {
            showToast(data.message, 'error');
        }

    } catch (err) {
        showToast('Server error: ' + err.message, 'error');
    }
});



patientSignUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('patientFullName').value;
    const age = document.getElementById('patientAge').value;
    const gender = document.getElementById('patientGender').value;
    const mobile = document.getElementById('patientMobile').value;
    const email = document.getElementById('patientEmailSignup').value;
    const address = document.getElementById('patientAddress').value;
    const emergency = document.getElementById('patientEmergency').value;
    const aadhaar = document.getElementById('patientAadhaar').value;
    const password = document.getElementById('patientCreatePassword').value;
    const confirmPassword = document.getElementById('patientConfirmPassword').value;

    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (aadhaar.length !== 12) {
        showToast('Please enter a valid 12-digit Aadhaar number', 'error');
        return;
    }

    try {
        const res = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                age,
                gender,
                mobile,
                email,
                address,
                emergency,
                aadhaar,
                password
            })
        });

        const data = await res.json();
        
        if (data.message == "User registered successfully") {
            
            closeAllModals();
            showToast('Registration successful! Welcome to CURELEX!', 'success');
            showToast('Please Login to continue!', 'success');

            setTimeout(() => {
                openModal(loginModal);
            }, 500);

            
        } else {
            showToast(data.message, 'error');
        }

    } catch (err) {
        console.log(err);
        showToast('Server error: ' + err.message, 'error');
    }
});

// =============================================
// Doctor Authentication
// =============================================


const doctorLoginForm = document.getElementById('doctorLoginForm');
const doctorSignUpForm = document.getElementById('doctorSignUpForm');


doctorLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPasswordLogin').value;

    try {
        const res = await fetch("http://localhost:5000/api/doctors/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.success) {
            
            localStorage.setItem("token", data.token);

            
            localStorage.setItem("curelex-current-user", JSON.stringify(data.doctor));

            closeAllModals();
            showToast(`Welcome back, Dr. ${data.doctor.name}!`, 'success');

            setTimeout(() => {
                window.location.href = 'html/doctor-dashboard.html';
            }, 500);

        } else {
            showToast(data.message, 'error');
        }

    } catch (err) {
        showToast('Server error: ' + err.message, 'error');
    }
});


doctorSignUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const certFile  = document.getElementById('doctorCert').files[0];
  const photoFile = document.getElementById('doctorPhoto').files[0];

  // ── Client-side validation ────────────────────────────────────────
  if (!certFile) {
    showToast("Registration certificate is required", "error"); return;
  }
  const certAllowed = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
  if (!certAllowed.includes(certFile.type)) {
    showToast("Certificate must be PDF, JPG, or PNG", "error"); return;
  }
  if (certFile.size > 5 * 1024 * 1024) {
    showToast("Certificate must be under 5MB", "error"); return;
  }
  if (photoFile) {
    const photoAllowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!photoAllowed.includes(photoFile.type)) {
      showToast("Photo must be JPG, PNG, or WEBP", "error"); return;
    }
    if (photoFile.size > 2 * 1024 * 1024) {
      showToast("Photo must be under 2MB", "error"); return;
    }
  }

  // ── Build FormData ─────────────────────────────────────────────────
  
  const formData = new FormData();
  formData.append("name",             document.getElementById('doctorFullName').value.trim());
  formData.append("email",            document.getElementById('doctorEmailSignup').value.trim());
  formData.append("password",         document.getElementById('doctorPasswordSignup').value);
  formData.append("age",              document.getElementById('doctorAge').value);
  formData.append("gender",           document.getElementById('doctorGender').value);
  formData.append("specialization",   document.getElementById('doctorSpecialization').value);
  formData.append("regNum",           document.getElementById('doctorRegNumber').value.trim());
  formData.append("regState",         document.getElementById('doctorRegState').value.trim());
  formData.append("experience",       document.getElementById('doctorExperience').value);
  formData.append("patientsHandeled", document.getElementById('doctorPatients').value);
  


  formData.append("certificate", certFile);
  if (photoFile) formData.append("photo", photoFile);

  // ── Submit ─────────────────────────────────────────────────────────
  
  const submitBtn = doctorSignUpForm.querySelector('button[type="submit"]');
  submitBtn.disabled    = true;
  submitBtn.textContent = "Uploading...";

  try {
    const res  = await fetch("http://localhost:5000/api/doctors/register", {
      method: "POST",
      body:   formData
      // ⚠️ NO Content-Type header — browser sets multipart/form-data + boundary
    });
    const data = await res.json();

    if (res.status === 201) {
      doctorSignUpForm.reset();
      closeAllModals();
      showToast("Registration submitted! Wait for admin approval.", "success");
    } else {
      const msg = data.errors?.[0]?.msg || data.message || "Registration failed";
      showToast(msg, "error");
    }
  } catch (err) {
    showToast("Server error: " + err.message, "error");
    console.error(err);
  } finally {
    submitBtn.disabled    = false;
    submitBtn.textContent = "Submit for Approval";
  }
});

// =============================================
// Dashboard Functions
// =============================================

async function loadPatientDashboard() {
    const currentUser = localStorage.getItem('curelex-current-user');

    if (!currentUser) {
        window.location.href = '/';
        return;
    }

    const user = JSON.parse(currentUser);

    try {
        const res = await fetch(`http://localhost:5000/api/dashboard/patient/${user.id}`);
        const data = await res.json();

        

        if (data.success) {
            const patient = data.patient || data.user || data;

            document.getElementById('patientGreeting').textContent = `Hello, ${patient.name}`;

            const setText = (id, value) => {
                const el = document.getElementById(id);
                if (el) el.textContent = value || '-';
            };

            setText('patientEmailDisplay', patient.email);
            setText('patientAgeDisplay', patient.age);
            setText('patientGenderDisplay', patient.gender);
            setText('patientMobileDisplay', patient.mobile);
            setText('patientAddressDisplay', patient.address);
            setText('patientAadhaarDisplay', patient.aadhaar);

        } else {
            showToast(data.message || 'Failed to load dashboard', 'error');
        }

    } catch (err) {
        console.log(err);
        showToast('Error loading dashboard', 'error');
    }
}

async function loadPatientPrescriptions() {
    const currentUser = JSON.parse(localStorage.getItem('curelex-current-user'));

    if (!currentUser) return;

    try {
        const res = await fetch(`http://localhost:5000/api/prescriptions/patient/${currentUser.id}`);
        const data = await res.json();

        

        if (data.success) {
            displayPrescriptions(data.prescriptions);
        } else {
            showToast(data.message || 'Failed to load prescriptions', 'error');
        }

    } catch (err) {
        console.log(err);
        showToast('Error fetching prescriptions', 'error');
    }
}

function logoutUser() {
    localStorage.removeItem('curelex-current-user');
    showToast('Logged out successfully', 'success');

    setTimeout(() => {
        window.location.href = '/';
    }, 500);
}

// Logout
document.getElementById('patientLogoutBtn').addEventListener('click', logoutUser);

// Check for existing session - redirect to appropriate dashboard
function checkExistingSession() {
    const currentUser = localStorage.getItem('curelex-current-user');
    if (currentUser) {
        // Redirect to appropriate dashboard based on user type
        const user = JSON.parse(currentUser);
        // Check if user has specialization (doctor) or not (patient)
        if (user.specialization) {
            window.location.href = 'html/doctor-dashboard.html';
        } else {
            window.location.href = 'html/patient-dashboard.html';
        }
    }
}

// =============================================
// Hero Section Button Actions
// =============================================
document.getElementById('getStartedBtn').addEventListener('click', () => {
    openModal(loginModal);
});


// =============================================
// Smooth Scroll for Navigation
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// Initialize App
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    checkExistingSession();
    
    if (window.location.pathname.includes('patient-dashboard.html')) {
        loadPatientDashboard();
    }
});



// =============================================
// Add Symptom Button
// =============================================
document.getElementById('addSymptomBtn')?.addEventListener('click', () => {
    showToast('Symptom reporting feature coming soon!', 'info');
});

// =============================================
// Utility Functions
// =============================================
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Close modals on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Patient Dashboard Enhancements (for appointment features)
document.addEventListener('DOMContentLoaded', function() {
    // Auto-load appointments on dashboard pages
    if (document.querySelector('.dashboard-page')) {
        const appointments = JSON.parse(localStorage.getItem('curelex-appointments') || '[]');
        console.log('Loaded', appointments.length, 'appointments');
    }
});

// Prevent form submission on enter for better UX
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});

//map API integration
function initMap() {
  const location = { lat: 25.4305, lng: 81.7710 }; // IIIT Allahabad

  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: location,
  });

  new google.maps.Marker({
    position: location,
    map: map,
    title: "IIIT Allahabad Incubation Centre (IIIC)"
  });
}



//patient [assword hide/see
const password = document.getElementById("patientPassword");
const eye = document.getElementById("toggleEye");

eye.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    eye.classList.remove("fa-eye");
    eye.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    eye.classList.remove("fa-eye-slash");
    eye.classList.add("fa-eye");
  }
});

//Doctor Password hide/see 
const doctorPassword = document.getElementById("doctorPassword");
const doctorEye = document.getElementById("toggleDoctorEye");

doctorEye.addEventListener("click", () => {
  if (doctorPassword.type === "password") {
    doctorPassword.type = "text";
    doctorEye.classList.remove("fa-eye");
    doctorEye.classList.add("fa-eye-slash");
  } else {
    doctorPassword.type = "password";
    doctorEye.classList.remove("fa-eye-slash");
    doctorEye.classList.add("fa-eye");
  }
});
