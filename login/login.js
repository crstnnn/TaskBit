const API_BASE = "https://localhost:7237/api";

const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");
const loginBtn = document.getElementById("loginBtn");
const passwordInput = document.getElementById("password");
const togglePasswordBtn = document.getElementById("togglePassword");

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

togglePasswordBtn.addEventListener("click", function () {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.textContent = isHidden ? "Hide" : "Show";
});

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
        showMessage("Please enter your email and password.", "red");
        return;
    }

    const payload = {
        email: email,
        password: password
    };

    try {
        loginBtn.disabled = true;
        loginBtn.textContent = "Logging in...";

        const response = await fetch(`${API_BASE}/Auth/login`, {
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
            console.error("Login failed:", result);
            showMessage(result?.message || result || "Login failed.", "red");
            return;
        }

        if (result?.user) {
            localStorage.setItem("taskbitUser", JSON.stringify(result.user));
        }

        showMessage("Login successful!", "green");

        setTimeout(() => {
            window.location.href = "../dashboard/dashboard.html";
        }, 1000);

    } catch (error) {
        console.error("Login error:", error);
        showMessage("Cannot connect to backend.", "red");
    } finally {
        loginBtn.disabled = false;
        loginBtn.textContent = "Login";
    }
});