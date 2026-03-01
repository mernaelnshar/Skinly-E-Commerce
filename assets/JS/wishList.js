    document.querySelectorAll('.btn-remove-wishlist').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.col-lg-3'); 
            
            Swal.fire({
                title: 'Are you sure?',
                text: "Remove this item from your favorites?",
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

document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productCard = this.closest('.col-lg-3'); 

        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Moved to your cart ✨',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        });

        productCard.style.transition = "all 0.5s ease";
        productCard.style.opacity = "0";
        productCard.style.transform = "translateY(-20px)"; 

        setTimeout(() => {
            productCard.remove();
        }, 500);
    });
});

document.querySelector('.btn-outline-dark').addEventListener('click', function() {
    const allCards = document.querySelectorAll('.wishlist-section .col-lg-3');
    
    if (allCards.length === 0) return; 

    Swal.fire({
        title: 'Great Choice!',
        text: 'All your favorites have been moved to the cart.',
        icon: 'success',
        confirmButtonColor: '#67134c'
    }).then(() => {
        allCards.forEach(card => {
            card.style.opacity = '0';
        });
        setTimeout(() => {
            document.querySelector('.wishlist-section .row').innerHTML = `
            <div class="text-center py-5">
            <h3>Your wishlist is now empty!</h3>
            <a href="Products.html" class="btn btn-primary-skinly mt-3">
            Continue Shopping
            </a>
            </div>`
            ;
        }, 500);
    });
});

