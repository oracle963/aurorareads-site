// Purchase button click handler
document.addEventListener('DOMContentLoaded', function() {
    // Plan configurations
    const plans = {
        'cosmic-glimpse': {
            name: 'Cosmic Glimpse',
            price: 1,
            interval: 'one-time',
            stripeLink: 'https://buy.stripe.com/test_aFacMY4di1u8fZ00ke6J201'
        },
        'weekly-wisdom': {
            name: 'Weekly Wisdom',
            price: 4.99,
            interval: 'month',
            stripeLink: 'https://buy.stripe.com/test_14A28k7pzaGZ1hM5RKdfG02'
        },
        'unlimited-universe': {
            name: 'Unlimited Universe',
            price: 10,
            interval: 'month',
            stripeLink: 'https://buy.stripe.com/test_14AcMY5hm0q428a8QK6J200'
        }
    };

    // Add click handlers to all purchase buttons
    document.querySelectorAll('.plan-cta .btn').forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            
            const planId = this.getAttribute('data-plan');
            const plan = plans[planId];
            
            try {
                // You can add pre-purchase validation here
                // For example, checking if user is logged in
                const isLoggedIn = await checkUserLogin();
                
                if (!isLoggedIn) {
                    showLoginPrompt();
                    return;
                }

                // Redirect to Stripe checkout
                window.location.href = plan.stripeLink;
                
            } catch (error) {
                console.error('Purchase error:', error);
                showErrorMessage('Unable to process purchase. Please try again.');
            }
        });
    });
});

// Helper functions
function checkUserLogin() {
    // Replace this with your actual login check
    return new Promise((resolve) => {
        // For now, we'll just redirect to Stripe
        resolve(true);
    });
}

function showLoginPrompt() {
    // You can replace this with a modal or redirect to login page
    alert('Please log in to purchase a plan');
}

function showErrorMessage(message) {
    // You can replace this with a better error UI
    alert(message);
}
