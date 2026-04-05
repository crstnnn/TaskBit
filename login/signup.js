const API_BASE = "https://localhost:7237/api";

const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submitBtn");

const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm_password");

const togglePasswordBtn = document.getElementById("togglePassword");
const toggleConfirmPasswordBtn = document.getElementById("toggleConfirmPassword");

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

togglePasswordBtn.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.textContent = isHidden ? "Hide" : "Show";
});

toggleConfirmPasswordBtn.addEventListener("click", function () {
    const isHidden = confirmPasswordInput.type === "password";
    confirmPasswordInput.type = isHidden ? "text" : "password";
    toggleConfirmPasswordBtn.textContent = isHidden ? "Hide" : "Show";
});

signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const full_name = document.getElementById("full_name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();
    const confirm_password = confirmPasswordInput.value.trim();

    if (!full_name || !email || !password || !confirm_password) {
        showMessage("Please complete all fields.", "red");
        return;
    }

    if (!email.endsWith("@firstasia.edu.ph")) {
        showMessage("Please use your school email.", "red");
        return;
    }

    if (password.length < 6) {
        showMessage("Password must be at least 6 characters.", "red");
        return;
    }

    if (password !== confirm_password) {
        showMessage("Password and Confirm Password do not match.", "red");
        return;
    }

    const payload = {
        full_name: full_name,
        email: email,
        password: password
    };

    try {
        submitBtn.disabled = true;
        submitBtn.textContent = "Signing Up...";

        const response = await fetch(`${API_BASE}/Auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const raw = await response.text();
        let result = null;

        try {
            result = raw ? JSON.parse(raw) : null;
        } catch {
            result = raw;
        }

        if (!response.ok) {
            showMessage(result?.message || result || "Signup failed.", "red");
            return;
        }

        localStorage.setItem("verifyEmail", email);
        showMessage(result?.message || "Account created successfully.", "green");

        signupForm.reset();

        setTimeout(() => {
            window.location.href = "verify-email.html";
        }, 1000);

    } catch (error) {
        console.error("Signup error:", error);
        showMessage("Cannot connect to backend.", "red");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Sign Up";
    }
});