import { content } from '../data/content.js';

// Function to update meta tags
function updateMetaTags() {
    const meta = content.meta;

    // Update title
    document.title = meta.title;

    // Update meta tags
    document.querySelector('meta[name="description"]').content = meta.description;
    document.querySelector('meta[name="keywords"]').content = meta.keywords;
    document.querySelector('meta[name="author"]').content = meta.author;
    document.querySelector('meta[name="theme-color"]').content = meta.themeColor;

    // Update Open Graph tags
    document.querySelector('meta[property="og:title"]').content = meta.ogTitle;
    document.querySelector('meta[property="og:description"]').content = meta.ogDescription;
    document.querySelector('meta[property="og:image"]').content = meta.ogImage;
    document.querySelector('meta[property="og:url"]').content = meta.ogUrl;
}

// Function to update hero section
function updateHeroSection() {
    const hero = content.hero;

    // Update hero title and subtitle
    document.querySelector('.hero__title').textContent = hero.title;
    document.querySelector('.hero__subtitle').textContent = hero.subtitle;

    // Update hero features
    const featuresContainer = document.querySelector('.hero__features');
    featuresContainer.innerHTML = hero.features.map(feature => `
        <div class="hero__feature" data-aos="fade-up">
            <div class="hero__feature-icon">
                <svg class="icon-${feature.icon}"></svg>
            </div>
            <h3 class="hero__feature-title">${feature.title}</h3>
            <p class="hero__feature-description">${feature.description}</p>
        </div>
    `).join('');
}

// Function to update credentials section
function updateCredentialsSection() {
    const credentials = content.credentials;

    // Update section header
    document.querySelector('.section-badge').textContent = credentials.badge;
    document.querySelector('.section-title').textContent = credentials.title;
    document.querySelector('.section-subtitle').textContent = credentials.subtitle;

    // Update stats
    const statsContainer = document.querySelector('.credentials-grid');
    statsContainer.innerHTML = credentials.stats.map((stat, index) => `
        <div class="credential-card" data-aos="fade-right" data-aos-delay="${index * 100}">
            <div class="credential-icon-wrapper">
                <div class="credential-icon-bg"></div>
                <div class="credential-icon">
                    <svg class="icon-${stat.title.toLowerCase().replace(/\s+/g, '-')}"></svg>
                </div>
            </div>
            <div class="credential-stats">
                <span class="stats-number counter">${stat.number}</span>
                <span class="stats-symbol">${stat.symbol}</span>
            </div>
            <h3 class="credential-title">${stat.title}</h3>
            <p class="credential-description">${stat.description}</p>
            <div class="credential-highlight">${stat.highlight}</div>
        </div>
    `).join('');
}

// Function to update testimonials section
function updateTestimonialsSection() {
    const testimonials = content.testimonials;

    // Update section header
    document.querySelector('.testimonials-title').textContent = testimonials.title;
    document.querySelector('.testimonials-subtitle').textContent = testimonials.subtitle;

    // Update testimonials
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    testimonialsContainer.innerHTML = testimonials.testimonials.map((testimonial, index) => `
        <div class="testimonial-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="testimonial-avatar">
                <div class="avatar-wrapper">
                    <svg class="avatar-${testimonial.avatar}"></svg>
                </div>
                <div class="testimonial-badge">Verified Student</div>
            </div>
            <div class="testimonial-content">
                <div class="testimonial-header">
                    <h3 class="testimonial-name">${testimonial.name}</h3>
                    <div class="testimonial-location">
                        <svg class="icon-location"></svg>
                        <span>${testimonial.location}</span>
                    </div>
                </div>
                <div class="testimonial-rating">
                    ${Array(testimonial.rating).fill().map(() => `
                        <svg class="icon-star"></svg>
                    `).join('')}
                </div>
                <blockquote class="testimonial-text">
                    <svg class="icon-quote"></svg>
                    ${testimonial.text}
                </blockquote>
                <div class="testimonial-achievement">
                    <svg class="icon-achievement"></svg>
                    <span>${testimonial.achievement}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to update footer section
function updateFooterSection() {
    const footer = content.footer;
    
    // Update footer description
    document.querySelector('.footer-description').textContent = footer.description;
    
    // Update quick links
    const quickLinksContainer = document.querySelector('.footer-links');
    quickLinksContainer.innerHTML = footer.quickLinks.map(link => `
        <li><a href="${link.url}">${link.title}</a></li>
    `).join('');
    
    // Update support links
    const supportLinksContainer = document.querySelector('.footer-support-links');
    supportLinksContainer.innerHTML = footer.support.map(link => `
        <li><a href="${link.url}">${link.title}</a></li>
    `).join('');
    
    // Update social links
    const socialLinksContainer = document.querySelector('.social-links');
    socialLinksContainer.innerHTML = footer.social.map(social => `
        <a href="${social.url}" class="social-link" aria-label="${social.name}">
            <svg class="icon-${social.icon}"></svg>
        </a>
    `).join('');
    
    // Update copyright
    document.querySelector('.footer-copyright').textContent = footer.copyright;
}

// Initialize all sections
function initializeContent() {
    updateMetaTags();
    updateHeroSection();
    updateCredentialsSection();
    updateTestimonialsSection();
    updateFooterSection();
    
    // Reinitialize AOS after content update
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Export the initialization function
export { initializeContent };