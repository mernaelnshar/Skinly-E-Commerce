document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.btn-plus').forEach(button => {
        button.addEventListener('click', function() {
            const qtySpan = this.parentElement.querySelector('.qty-value');
            let currentQty = parseInt(qtySpan.innerText);
            qtySpan.innerText = currentQty + 1;
            updateTotalPrice(); 
        });
    });

    document.querySelectorAll('.btn-minus').forEach(button => {
        button.addEventListener('click', function() {
            const qtySpan = this.parentElement.querySelector('.qty-value');
            let currentQty = parseInt(qtySpan.innerText);

            
            if (currentQty > 1) {
                qtySpan.innerText = currentQty - 1;
                updateTotalPrice();
            } else {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'info',
                    title: 'Minimum quantity is 1',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    });

});

function updateTotalPrice() {
    let subtotal = 0;
    
    const cartItems = document.querySelectorAll('.cart-item');
    
    cartItems.forEach(item => {
        const priceText = item.querySelector('.item-price').innerText;
        const price = parseFloat(priceText.replace('$', ''));
        
        const qty = parseInt(item.querySelector('.qty-value').innerText);
        
        subtotal += price * qty;
    });

    document.getElementById('subtotal').innerText = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').innerText = `$${subtotal.toFixed(2)}`;
}

document.querySelectorAll('.btn-remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.cart-items-container'); 
            
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

document.getElementById('checkout-btn').addEventListener('click', function() {
    const cartItems = document.querySelectorAll('.cart-item');
    
    if (cartItems.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Your cart is empty! Add some products first.',
            confirmButtonColor: '#67134c'
        });
        return; 
    }
    cartItems.forEach((item, index) => {
        item.style.transition = "all 0.5s ease";
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)"; 
    });
    

    let timerInterval;
    Swal.fire({
        title: 'Processing your order...',
        html: 'Checking availability in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
                icon: 'success',
                title: 'Order Placed!',
                text: 'Thank you for choosing Skinly. We will contact you soon.',
                showConfirmButton: true,
                confirmButtonColor: '#67134c',
                confirmButtonText: 'Back to Shop'
            }).then(() => {
                window.location.href = 'Products.html'; 
            });
        }
    });
});