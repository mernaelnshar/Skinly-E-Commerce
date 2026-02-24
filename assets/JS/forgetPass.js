document.getElementById('forgotForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('resetEmail').value;
        
        // إخفاء الـ Form وإظهار رسالة النجاح
        document.getElementById('requestState').style.display = 'none';
        document.getElementById('displayEmail').innerText = email;
        document.getElementById('successState').style.display = 'block';
    });