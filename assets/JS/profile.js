document.querySelectorAll('.filter-group button').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.filter-group button').forEach(btn => {
            btn.classList.remove('btn-dark', 'active');
            btn.classList.add('text-muted');
        });
        this.classList.add('btn-dark', 'active');
        this.classList.remove('text-muted');

        const filterValue = this.getAttribute('data-filter');
        const items = document.querySelectorAll('.order-item');

        items.forEach(item => {
            if (item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block'; 
            } else {
                item.style.display = 'none'; 
            }
        });
    });
});


document.querySelectorAll('.btn-remove-item').forEach(button => {
    button.addEventListener('click', function () {
        const productCard = this.closest('.order-item');

        Swal.fire({
            title: 'Are you sure?',
            text: "Remove this item from your cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#67134c',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, keep it'
        }).then((result) => {
            if (result.isConfirmed) {
                productCard.style.transition = "all 0.5s ease";
                productCard.style.opacity = "0";
                productCard.style.transform = "scale(0.8)";
                setTimeout(() => {
                    productCard.remove();
                    updateTotalPrice();
                }, 500);

                Swal.fire({
                    title: 'Removed!',
                    icon: 'success',
                    confirmButtonColor: '#67134c',
                    timer: 1500
                });
            }
        });
    });
});


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


document.querySelectorAll('#submitReview').forEach(button => {
    button.addEventListener('click', function () {
        const btn = this;

        btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Submitting...';
        btn.disabled = true;

        const reviewModal = document.getElementById('reviewModal');
        const modalInstance = bootstrap.Modal.getInstance(reviewModal);

        setTimeout(() => {
            modalInstance.hide();

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Review submitted successfully! ✨',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true
            });

            btn.innerHTML = '<i class="fas fa-check me-2"></i> Review Submitted';
            btn.classList.replace('btn-primary-skinly', 'text-muted');
        }, 1500);
    });
});


document.querySelectorAll('.reorder-btn').forEach(button => {
    button.addEventListener('click', function () {

        this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Processing...';

        setTimeout(() => {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Items added to your cart again! 🛍️',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
            this.innerHTML = '<i class="fas fa-shopping-basket me-2 small"></i> Re-order Items';
        }, 1000);
    });
});




document.addEventListener('click', function (e) {
    if (e.target.closest('.set-default-btn')) {
        const currentBtn = e.target.closest('.set-default-btn');
        const currentCard = currentBtn.closest('.address-card');
        const currentHeader = currentBtn.closest('.d-flex.justify-content-between');

        const previousDefaultCard = document.querySelector('.address-card:has(.badge.bg-success)');

        if (previousDefaultCard && previousDefaultCard !== currentCard) {
            const oldBadge = previousDefaultCard.querySelector('.badge');
            if (oldBadge) oldBadge.remove();

            const oldHeader = previousDefaultCard.querySelector('.d-flex.justify-content-between');
            const restoreBtn = `
                <button class="btn btn-link p-0 text-primary-skinly text-decoration-none small fw-bold shadow-none set-default-btn">
                    <i class="far fa-star me-1 small"></i> Set Default
                </button>`;
            oldHeader.insertAdjacentHTML('beforeend', restoreBtn);
        }


        currentBtn.remove();

        const newBadge = '<span class="badge bg-success bg-opacity-10 text-success rounded-pill extra-small">Default</span>';
        currentHeader.insertAdjacentHTML('beforeend', newBadge);

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Default address updated 📍',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
        });
    }
});

document.querySelectorAll('.btn-link.text-danger').forEach(deleteBtn => {
    deleteBtn.addEventListener('click', function (e) {
        const cardToDelete = this.closest('.col-md-6');

        Swal.fire({
            title: 'Delete Address?',
            text: "This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#000',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                cardToDelete.style.transition = 'all 0.5s ease';
                cardToDelete.style.opacity = '0';
                cardToDelete.style.transform = 'scale(0.9)';

                setTimeout(() => {
                    cardToDelete.remove();
                    Swal.fire({
                        title: 'Deleted!',
                        icon: 'success',
                        timer: 1000,
                        showConfirmButton: false
                    });
                }, 500);
            }
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const editModal = document.getElementById('editAddressModal');

    document.querySelectorAll('.edit-address-btn').forEach(button => {
        button.addEventListener('click', function () {
            const card = this.closest('.card-body');

            const title = card.querySelector('h6').innerText.trim();
            const street = card.querySelectorAll('p')[0].innerText.trim();
            const city = card.querySelectorAll('p')[1].innerText.trim();
            const phone = card.querySelector('.extra-small.text-muted').innerText.replace('+20', '').trim();

            document.getElementById('edit_address_title').value = title;
            document.getElementById('edit_phone').value = phone;
            document.getElementById('edit_location_detail').value = street;
            document.getElementById('edit_city').value = city.split(',')[0]; 
        });
    });

    const editForm = document.getElementById('edit_address_form');
    if (editForm) {
        editForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const modalInstance = bootstrap.Modal.getInstance(editModal);
            if (modalInstance) {
                modalInstance.hide();
            }

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Address updated successfully ✨',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });

        });
    }

    const addForm = document.getElementById('add_address_form');
    const container = document.getElementById('addresses_container');

    if (addForm) {
        addForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const label = document.getElementById('add_address_title').value;
            const phone = document.getElementById('add_phone').value;
            const location = document.getElementById('add_location_detail').value;
            const city = document.getElementById('add_city').value;

            const newCard = `
            <div class="col-md-6">
                <div class="card border-0 shadow-sm rounded-4 address-card p-2">
                    <div class="card-body">
                        <div class="d-flex align-items-start gap-3">
                            <div class="address-icon-box bg-primary-skinly bg-opacity-10 text-primary-skinly rounded-circle d-flex align-items-center justify-content-center"
                                style="width: 50px; height: 50px; flex-shrink: 0;">
                                <i class="fas fa-map-marker-alt fs-5"></i>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between">
                                    <h6 class="fw-bold mb-1">${label}</h6>
                                    <button class="btn btn-link p-0 text-primary-skinly text-decoration-none small fw-bold shadow-none set-default-btn">
                                        <i class="far fa-star me-1 small"></i> Set Default
                                    </button>
                                </div>
                                <p class="text-muted small mb-1">${location}</p>
                                <p class="text-muted small mb-3">${city}, Egypt</p>
                                <div class="d-flex flex-column gap-1">
                                    <span class="extra-small text-muted">
                                        <i class="fas fa-phone-alt me-2"></i> +20 ${phone}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end gap-3 border-top mt-3 pt-3">
                            <button class="btn btn-link p-0 text-dark text-decoration-none shadow-none edit-address-btn"
                                data-bs-toggle="modal" data-bs-target="#editAddressModal">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-link p-0 text-danger text-decoration-none extra-small fw-bold shadow-none">
                                <i class="fas fa-trash-alt me-1"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

            container.insertAdjacentHTML('beforeend', newCard);

            bootstrap.Modal.getInstance(document.getElementById('addAddressModal')).hide();
            addForm.reset();

            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'New address added successfully 🏠✨',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        });
    }


    const personalForm = document.getElementById('personal_info_form');
    if (personalForm) {
        personalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Profile updated successfully ✨',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
        });
    }

    const passwordForm = document.getElementById('change_password_form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function (e) {
            e.preventDefault();
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'info',
                title: 'Password has been changed 🔐',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
            });
            passwordForm.reset();
        });
    }


    const deleteBtn = document.getElementById('delete_account_btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function () {
            Swal.fire({
                title: 'Are you sure?',
                text: "This action cannot be undone!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#dc3545',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, delete it!',
                customClass: {
                    popup: 'rounded-4',
                    confirmButton: 'rounded-pill px-4',
                    cancelButton: 'rounded-pill px-4'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Your account has been closed.',
                        icon: 'success',
                        confirmButtonColor: '#520e3c',
                        customClass: { popup: 'rounded-4' }
                    }).then(() => {
                        window.location.href = 'login.html';
                    });
                }
            });
        });
    }



    const logoutLinks = document.querySelectorAll('.logout-link');

    logoutLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            Swal.fire({
                title: 'Logout?',
                text: "Are you sure you want to end your session?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#520e3c',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Yes, Logout',
                cancelButtonText: 'Stay',
                reverseButtons: true,
                customClass: {
                    popup: 'rounded-4',
                    confirmButton: 'rounded-pill px-4 shadow-none',
                    cancelButton: 'rounded-pill px-4 shadow-none'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Logged Out!',
                        text: 'See you again soon ✨',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        customClass: { popup: 'rounded-4' }
                    }).then(() => {
                        window.location.href = 'login.html';
                    });
                };
            });
        });
    });
});


