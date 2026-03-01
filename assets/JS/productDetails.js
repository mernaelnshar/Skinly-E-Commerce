
function changeImg(src, element) {
    const mainImg = document.getElementById('mainProductImg');

    mainImg.style.opacity = '0.5';

    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = '1';
    }, 150);

    document.querySelectorAll('.thumb-img').forEach(img => img.classList.remove('active'));
    element.classList.add('active');
}

function updateQty(val) {
    const qtySpan = document.getElementById('productQty');
    let currentQty = parseInt(qtySpan.innerText);
    if (currentQty + val >= 1) {
        qtySpan.innerText = currentQty + val;
    }
}

document.querySelectorAll('#reviewModal .fa-star').forEach((star, index, stars) => {
    star.addEventListener('click', () => {
        // نمر على كل النجوم
        stars.forEach((s, i) => {
            if (i <= index) {
                // تلوين النجوم المختارة
                s.classList.remove('far', 'text-muted');
                s.classList.add('fas', 'text-warning');
            } else {
                // مسح التلوين من النجوم الأبعد
                s.classList.remove('fas', 'text-warning');
                s.classList.add('far', 'text-muted');
            }
        });

        // ممكن تخزني قيمة التقييم هنا في متغير لو حابة (مثلاً index + 1)
        console.log("Rating selected:", index + 1);
    });
});


document.getElementById('submitReview').addEventListener('click', function () {
    // 1. نجيب البيانات من الـ Modal
    const commentText = document.querySelector('#reviewModal textarea').value;
    const stars = document.querySelectorAll('#reviewModal .fa-star.fas').length; // بنعد النجوم الملونه
    const reviewList = document.querySelector('.reviews-list');

    // تأكدي إن المستخدم كتب تعليق
    if (commentText.trim() === "") {
        alert("Please write a comment first!");
        return;
    }

    // 2. نجهز شكل النجوم اللي هتظهر في التعليق الجديد
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }

    // 3. ننشئ عنصر التعليق الجديد
    const newReview = document.createElement('div');
    newReview.className = 'review-item pb-4 mb-4 border-bottom';
    newReview.style.display = 'none'; 

    newReview.innerHTML = `
        <div class="d-flex justify-content-between align-items-start">
            <div class="d-flex align-items-center">
                <div class="avatar-circle me-3">U</div>
                <div>
                    <h6 class="mb-0 fw-bold">You (Guest)</h6>
                    <div class="text-warning small">
                        ${starsHtml}
                    </div>
                </div>
            </div>
            <span class="text-muted small">Just now</span>
        </div>
        <p class="mt-3 text-muted">
            ${commentText}
        </p>
    `;

    // 4. نضيفه في أول القائمة
    reviewList.prepend(newReview);

    // 5. أنيميشن بسيط عشان التعليق يظهر بشكل شيك
    // ✅ البديل الصحيح
    newReview.style.display = 'block';
    newReview.style.opacity = '0';
    setTimeout(() => {
        newReview.style.transition = "opacity 0.5s ease";
        newReview.style.opacity = "1";
    }, 10);

    // 6. نقفل الموديل وننظف البيانات
    const modalElement = document.getElementById('reviewModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    // رسالة نجاح بسيطة
    Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Thank you for your feedback!',
        timer: 2000,
        showConfirmButton: false
    });

    // تنظيف الفورم
    document.querySelector('#reviewModal textarea').value = "";
    document.querySelectorAll('#reviewModal .fa-star').forEach(s => {
        s.classList.remove('fas', 'text-warning');
        s.classList.add('far');
    });
});