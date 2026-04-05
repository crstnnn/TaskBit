const API_BASE = "https://localhost:7237/api";

const verifyForm = document.getElementById("verifyForm");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const message = document.getElementById("message");
const emailInput = document.getElementById("email");

emailInput.value = localStorage.getItem("verifyEmail") || "";

function showMessage(text, color) {
    message.textContent = text;
    message.style.color = color;
}

verifyForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const payload = {
        email: document.getElementById("email").value.trim(),
        code: document.getElementById("code").value.trim()
    };

    try {
        verifyBtn.disabled = true;
        verifyBtn.textContent = "Verifying...";

        const response = await fetch(`${API_BASE}/Auth/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (!response.ok) {
            showMessage(result.message || "Verification failed.", "red");
            return;
        }

        showMessage(result.message, "green");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    } catch (error) {
        console.error(error);
        showMessage("Cannot connect to backend.", "red");
    } finally {
        verifyBtn.disabled = false;
        verifyBtn.textContent = "Verify";
    }
});

resendBtn.addEventListener("click", async function () {
    const email = document.getElementById("email").value.trim();

    if (!email) {
        showMessage("Please enter your email first.", "red");
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/Auth/resend-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const result = await response.json();

        if (!response.ok) {
            showMessage(result.message || "Could not resend code.", "red");
            return;
        }

        showMessage(result.message, "green");
    } catch (error) {
        console.error(error);
        showMessage("Cannot connect to backend.", "red");
    }
});