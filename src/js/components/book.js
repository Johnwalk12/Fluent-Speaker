// Initialize variables
let selectedDuration = 30;
let isTrialSession = false;
let baseRate = 10;
let numberOfSessions = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize session type clicks
    initializeSessionTypeClicks();

    // Initialize duration option clicks
    initializeDurationClicks();

    // Initialize session count change handler
    document.getElementById('sessionCount').addEventListener('change', handleSessionsChange);

    // Set initial duration
    const defaultDuration = document.querySelector('.duration-option');
    if (defaultDuration) {
        defaultDuration.click();
    }

    // Initialize form submission handler
    initializeFormSubmission();
});

function copyAddress() {
    const addressInput = document.querySelector('input[value^="TJNkN"]');
    if (addressInput) {
        addressInput.select();
        try {
            navigator.clipboard.writeText(addressInput.value);
            alert('Address copied to clipboard!');
        } catch (err) {
            document.execCommand('copy');
            alert('Address copied to clipboard!');
        }
    }
}

// Initialize session type clicks
function initializeSessionTypeClicks() {
    document.querySelectorAll('.session-option:not(.disabled)').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.session-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            document.getElementById('selected_session_type').value = this.dataset.type;
            updateBookingDetails();
        });
    });
}

// Initialize duration clicks
function initializeDurationClicks() {
    document.querySelectorAll('.duration-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.duration-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');

            selectedDuration = parseInt(this.dataset.duration);
            isTrialSession = this.dataset.trial === 'true';
            baseRate = parseInt(this.dataset.price);

            // Update session name
            const sessionName = this.querySelector('h3').textContent;
            document.getElementById('session_name').value = sessionName;
            document.getElementById('selected_duration').value = selectedDuration;

            if (isTrialSession) {
                numberOfSessions = 1;
                document.getElementById('sessionCount').value = "1";
                document.getElementById('sessionCount').disabled = true;
            } else {
                document.getElementById('sessionCount').disabled = false;
                numberOfSessions = parseInt(document.getElementById('sessionCount').value);
            }

            calculateTotal();
            updateBookingDetails();
        });
    });
}

// Handle session count change
function handleSessionsChange(event) {
    numberOfSessions = parseInt(event.target.value);
    calculateTotal();
    updateBookingDetails();
}

// Calculate total price
function calculateTotal() {
    let discount = 0;

    // Calculate discount based on number of sessions
    if (!isTrialSession) {
        if (numberOfSessions >= 12) discount = 0.30;
        else if (numberOfSessions >= 8) discount = 0.20;
        else if (numberOfSessions >= 4) discount = 0.10;
    }

    const subtotal = baseRate * numberOfSessions;
    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    // Update discount related fields
    document.getElementById('discount_percentage').value = (discount * 100).toFixed(0);
    document.getElementById('discount_amount').value = discountAmount.toFixed(2);
    document.getElementById('base_price').value = baseRate.toFixed(2);
    document.getElementById('final_price').value = total.toFixed(2);

    updatePaymentAmount(total);
    updatePurchaseSummary([{
            description: `${numberOfSessions} sessions × $${baseRate}`,
            price: subtotal
        },
        ...(discount > 0 ? [{
            description: `Discount (${discount * 100}%)`,
            price: -discountAmount
        }] : [])
    ]);
}

// Update payment amounts
function updatePaymentAmount(amount) {
    const amountStr = amount.toFixed(2);
    document.getElementById('paymentAmount').textContent = `$${amountStr}`;
    document.querySelector('.total-amount').textContent = `$${amountStr}`;
    document.getElementById('payment_amount').value = amountStr;
}

// Update booking details
function updateBookingDetails() {
    const bookingDetails = {
        sessionType: document.querySelector('.session-option.active').dataset.type,
        sessionName: document.getElementById('session_name').value,
        duration: `${selectedDuration} minutes`,
        numberOfSessions: numberOfSessions,
        basePrice: `$${baseRate}`,
        pricePerSession: `$${baseRate}`,
        discount: document.getElementById('discount_percentage').value + '%',
        discountAmount: `$${document.getElementById('discount_amount').value}`,
        finalPrice: `$${document.getElementById('final_price').value}`,
        isTrialSession: isTrialSession
    };

    document.getElementById('booking_details').value = JSON.stringify(bookingDetails);
}

// Update purchase summary
function updatePurchaseSummary(items) {
    const summaryDiv = document.getElementById('purchaseSummary');
    if (!items.length) {
        summaryDiv.innerHTML = '<p>No sessions selected</p>';
        return;
    }

    const summaryHTML = items.map(item => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${item.description}</span>
            <span>${item.price < 0 ? '-' : ''}$${Math.abs(item.price).toFixed(2)}</span>
        </div>
    `).join('');

    summaryDiv.innerHTML = summaryHTML;
}

// Initialize form submission
function initializeFormSubmission() {
    document.getElementById('bookingForm').addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate payment proof
        const fileInput = document.getElementById('payment_proof');
        if (!fileInput.files || fileInput.files.length === 0) {
            alert('Please upload your payment proof');
            return;
        }

        // Final update of all hidden fields before submission
        updateBookingDetails();

        // Submit the form
        this.submit();
    });
}