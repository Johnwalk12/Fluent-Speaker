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
                this.elements.submitBtn.classList.remove('loading');
            }
        },

        showSuccessMessage() {
            // Implementation of success message display
        },

        showErrorMessage() {
            // Implementation of error message display
        },

        openModal() {
            this.elements.modal.classList.add('active');
        },

        closeModal() {
            this.elements.modal.classList.remove('active');
        },

        showMoreTestimonials() {
            // Implementation of show more functionality
        },

        showLessTestimonials() {
            // Implementation of show less functionality
        },

        initializeTestimonials() {
            // Initial setup of testimonials display
        }
    };

    testimonialSystem.init();
});