// نظام الفاليديشن البسيط
        document.getElementById('loginForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const pass = document.getElementById('loginPassword').value;
            const errorMsg = document.getElementById('loginError');

            // محاكاة بيانات (في الحقيقة تأتي من قاعدة البيانات)
            const adminData = { email: "admin@skinly.com", pass: "admin123" };
            const userData = { email: "user@skinly.com", pass: "user123" };

            if (email === adminData.email && pass === adminData.pass) {
                alert("Welcome Admin! Redirecting to Dashboard...");
                window.location.href = "admin_dashboard.html"; // صفحة الأدمن
            }
            else if (email === userData.email && pass === userData.pass) {
                alert("Welcome Back! Redirecting to your Profile...");
                window.location.href = "Products.html"; // صفحة اليوزر
            }
            else {
                errorMsg.style.display = "block";
            }
        });

        // Sign Up Validation
        document.getElementById('signupForm').addEventListener('submit', function (event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            this.classList.add('was-validated');
        }, false);