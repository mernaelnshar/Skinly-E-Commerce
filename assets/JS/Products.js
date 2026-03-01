document.querySelectorAll('.btn-add-wishlist').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (this.classList.contains('active')) {
            icon.classList.replace('fa-regular', 'fa-solid');
        } else {
            icon.classList.replace('fa-solid', 'fa-regular');
        }
    });
});


document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Add to your cart ✨',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    });
});

document.querySelectorAll('.btn-add-wishlist').forEach(button => {
    button.addEventListener('click', function() {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Add to your wishlist ❤️',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });
    });
});
