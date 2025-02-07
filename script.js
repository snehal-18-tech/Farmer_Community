let navbar = document.querySelector('.navbar');
document.querySelector('#menu-bar').onclick = () => {
    navbar.classList.toggle('active');
};

let search = document.querySelector('.search');
document.querySelector('#search').onclick = () => {
    search.classList.toggle('active');
};

var swiper = new Swiper(".product-row", {
    spaceBetween: 30,
    loop: true,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    // Commenting out pagination to remove the dots
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable: true,
    // },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart');
    const cartButtons = document.querySelectorAll('.order-buttons button:nth-child(2)');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get current count from cart icon
            let currentCount = parseInt(cartIcon.getAttribute('data-count'), 10);
            // Increment the count
            currentCount++;
            // Update the count on the cart icon
            cartIcon.setAttribute('data-count', currentCount);
        });
    });

    // Add click event to product images
    const productImages = document.querySelectorAll('.product-image');

    productImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            swiper.slideToLoop(index);
            swiper.autoplay.start(); // Restart autoplay
        });
    });
});


// document.addEventListener("DOMContentLoaded", function() {
//     const addToCartButtons = document.querySelectorAll('.addToCartBtn');

//     addToCartButtons.forEach(button => {
//         button.addEventListener('click', function() {
//             // Get the product details
//             const product = this.closest('.box');
//             const productName = product.querySelector('.product-content h3').textContent;
//             const productPrice = product.querySelector('.product-content p').textContent;

//             // Create a new cart item element
//             const cartItem = document.createElement('div');
//             cartItem.classList.add('cart-item');
//             cartItem.innerHTML = `
//                 <p>${productName} - ${productPrice}</p>
//             `;

//             // Add the cart item to the cart
//             const cartContent = document.querySelector('.cart-content');
//             cartContent.appendChild(cartItem);
//         });
//     });
// });

// document.addEventListener('DOMContentLoaded', function() {
//     const productCards = document.querySelectorAll('.product-card');

//     // Function to calculate and update total price
//     const updateTotalPrice = (productCard) => {
//         const quantity = parseInt(productCard.querySelector('.quantity-value').textContent);
//         const price = parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''));
//         const totalPrice = quantity * price;
//         productCard.querySelector('.total-price').textContent = `$${totalPrice.toFixed(2)}`;
//     };

//     // Add event listener for each increment button
//     productCards.forEach((card) => {
//         const incrementBtn = card.querySelector('.increment');
//         const decrementBtn = card.querySelector('.decrement');
//         const quantityValue = card.querySelector('.quantity-value');

//         incrementBtn.addEventListener('click', function() {
//             let quantity = parseInt(quantityValue.textContent);
//             quantity++;
//             quantityValue.textContent = quantity;
//             updateTotalPrice(card);
//         });

//         decrementBtn.addEventListener('click', function() {
//             let quantity = parseInt(quantityValue.textContent);
//             if (quantity > 1) {
//                 quantity--;
//                 quantityValue.textContent = quantity;
//                 updateTotalPrice(card);
//             }
//         });
//     });
// });
   
 
const swiper = new Swiper('.swiper', {
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
