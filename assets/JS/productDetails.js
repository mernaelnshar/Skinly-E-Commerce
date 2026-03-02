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
        stars.forEach((s, i) => {
            if (i <= index) {
                s.classList.remove('far', 'text-muted');
                s.classList.add('fas', 'text-warning');
            } else {
                s.classList.remove('fas', 'text-warning');
                s.classList.add('far', 'text-muted');
            }
        });

        console.log("Rating selected:", index + 1);
    });
});


document.getElementById('submitReview').addEventListener('click', function () {
    const commentText = document.querySelector('#reviewModal textarea').value;
    const stars = document.querySelectorAll('#reviewModal .fa-star.fas').length; 
    const reviewList = document.querySelector('.reviews-list');

    if (commentText.trim() === "") {
        alert("Please write a comment first!");
        return;
    }

    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }

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

    reviewList.prepend(newReview);

    newReview.style.display = 'block';
    newReview.style.opacity = '0';
    setTimeout(() => {
        newReview.style.transition = "opacity 0.5s ease";
        newReview.style.opacity = "1";
    }, 10);

    const modalElement = document.getElementById('reviewModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();

    Swal.fire({
        icon: 'success',
        title: 'Review Submitted',
        text: 'Thank you for your feedback!',
        timer: 2000,
        showConfirmButton: false
    });

    document.querySelector('#reviewModal textarea').value = "";
    document.querySelectorAll('#reviewModal .fa-star').forEach(s => {
        s.classList.remove('fas', 'text-warning');
        s.classList.add('far');
    });
});

document.querySelectorAll('.related-products .btn-outline-dark').forEach(btn => {
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});