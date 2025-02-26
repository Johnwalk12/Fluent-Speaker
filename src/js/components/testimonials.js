document.addEventListener('DOMContentLoaded', function() {
    const testimonialSystem = {
        config: {
            initialVisibleCount: 3,
            animationDuration: 500,
            loadMoreIncrement: 3
        },

        elements: {
            modal: document.getElementById('testimonialModal'),
            shareBtn: document.getElementById('shareExperience'),
            showMoreBtn: document.getElementById('showMoreTestimonials'),
            showLessBtn: document.getElementById('showLessBtn'),
            closeBtn: document.querySelector('.close-btn'),
            form: document.querySelector('.testimonial-form'),
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            testimonial: document.getElementById('testimonial'),
            rating: document.getElementById('rating'),
            submitBtn: document.querySelector('.submit-btn'),
            testimonialCards: document.querySelectorAll('.testimonial-card')
        },

        state: {
            visibleCount: 3,
            isSubmitting: false
        },

        init() {
            this.setupEventListeners();
            this.initializeTestimonials();
            this.setupIntersectionObserver();
        },

        setupEventListeners() {
            this.elements.shareBtn.addEventListener('click', () => this.openModal());
            this.elements.closeBtn.addEventListener('click', () => this.closeModal());
            this.elements.showMoreBtn.addEventListener('click', () => this.showMoreTestimonials());
            this.elements.showLessBtn.addEventListener('click', () => this.showLessTestimonials());
            this.elements.form.addEventListener('submit', (e) => this.handleFormSubmit(e));

            // Close modal on outside click or escape key
            window.addEventListener('click', (e) => {
                if (e.target === this.elements.modal) this.closeModal();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeModal();
            });
        },

        setupIntersectionObserver() {
            const options = {
                root: null,
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, options);

            this.elements.testimonialCards.forEach(card => {
                observer.observe(card);
            });
        },

        async handleFormSubmit(e) {
            e.preventDefault();
            if (this.state.isSubmitting) return;

            this.state.isSubmitting = true;
            this.elements.submitBtn.classList.add('loading');

            try {
                const formData = new FormData(this.elements.form);
                const name = formData.get('name');
                const email = formData.get('email');
                const experience = formData.get('testimonial');
                const rating = formData.get('rating');

                // Update the form fields with the user's input
                this.elements.name.value = name;
                this.elements.email.value = email;
                this.elements.testimonial.value = experience;
                this.elements.rating.value = rating;

                const response = await fetch('https://formsubmit.co/johnwalker199777@gmail.com', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    this.showSuccessMessage();
                    this.elements.form.reset();
                    setTimeout(() => this.closeModal(), 2000);
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                this.showErrorMessage();
            } finally {
                this.state.isSubmitting = false;
                this.elemen - ts.submitBtn.classList.remove('loading');
            }
        },

        showSuccessMessage() {
            // Display a success message to the user
            console.log('Form submitted successfully!');
        },

        showErrorMessage() {
            // Display an error message to the user
            console.error('Error submitting the form.');
        },

        openModal() {
            this.elements.modal.classList.add('active');
            this.elements.modal.style.maxWidth = '80%'; // Adjust the modal size
        },

        closeModal() {
            this.elements.modal.classList.remove('active');
        },

        showMoreTestimonials() {
            const visibleCount = this.state.visibleCount;
            const totalCards = this.elements.testimonialCards.length;

            // Show the next set of testimonial cards
            for (let i = visibleCount; i < visibleCount + this.config.loadMoreIncrement; i++) {
                if (i < totalCards) {
                    this.elements.testimonialCards[i].classList.remove('hidden');
                } else {
                    break;
                }
            }

            this.state.visibleCount += this.config.loadMoreIncrement;

            // Show the "Show Less" button if there are more cards to show
            if (this.state.visibleCount < totalCards) {
                this.elements.showLessBtn.style.display = 'inline-block';
            } else {
                this.elements.showLessBtn.style.display = 'none';
            }

            // Hide the "Show More" button if all cards are visible
            if (this.state.visibleCount >= totalCards) {
                this.elements.showMoreBtn.style.display = 'none';
            }
        },

        showLessTestimonials() {
            const visibleCount = this.state.visibleCount;
            const totalCards = this.elements.testimonialCards.length;

            // Hide the last set of testimonial cards
            for (let i = visibleCount - 1; i >= this.config.initialVisibleCount; i--) {
                this.elements.testimonialCards[i].classList.add('hidden');
            }

            this.state.visibleCount = this.config.initialVisibleCount;

            // Show the "Show More" button
            this.elements.showMoreBtn.style.display = 'inline-block';

            // Hide the "Show Less" button if only the initial cards are visible
            if (this.state.visibleCount === this.config.initialVisibleCount) {
                this.elements.showLessBtn.style.display = 'none';
            }
        },

        initializeTestimonials() {
            this.state.visibleCount = this.config.initialVisibleCount;

            this.elements.testimonialCards.forEach((card, index) => {
                if (index < this.config.initialVisibleCount) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        }
    };

    testimonialSystem.init();
});