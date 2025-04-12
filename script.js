document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const messageDiv = document.getElementById("message") || document.createElement("div");
    
    if (!messageDiv.id) {
        messageDiv.id = "message";
        contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);
    }
    
    // Google Script URL
    const scriptURL ="https://script.google.com/macros/s/AKfycbwYKck2rSDe_vA8I-cVQy6VC4N_ObuHCgadzR4kywNCuOznG8cwT5-CwAQb428ZiL8R/exec";
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        messageDiv.innerText = "Submitting...";
        
        // Collect form data
        const formData = new FormData(contactForm);
        const userData = {};
        
        // Convert FormData to URL search params
        const urlParams = new URLSearchParams();
        for (const pair of formData.entries()) {
            urlParams.append(pair[0], pair[1]);
            userData[pair[0]] = pair[1]; // Store for WhatsApp
            console.log(pair[0] + ": " + pair[1]); // Debug log
        }
        
        // Send data using fetch
        fetch(scriptURL, {
            method: 'POST',
            body: urlParams,
            mode: 'no-cors' // Important for cross-origin requests
        })
        .then(response => {
            messageDiv.innerText = "✅ Submitted Successfully!";
            contactForm.reset();
            
            // Send WhatsApp message
            const phoneNumber = "9037846438";
            let whatsappMessage = `Name: ${userData.name}\nEmail: ${userData.email}\nPhone: ${userData.phone}`;
            
            // Add subject and message if available
            if (userData.subject) whatsappMessage += `\nSubject: ${userData.subject}`;
            if (userData.message) whatsappMessage += `\nMessage: ${userData.message}`;
            
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappURL, "_blank");
        })
        .catch(error => {
            messageDiv.innerText = "⚠️ Error submitting form";
            console.error('Error:', error);
        });
    });
});

 // Scroll animation
 document.addEventListener('DOMContentLoaded', function() {
    const scrollReveal = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    
    scrollReveal.forEach(element => {
        observer.observe(element);
    });
    
   
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
    
            // Only apply smooth scroll for in-page anchors
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
    
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    
    // Contact button functionality
    const contactButton = document.querySelector('.contact-button');

    if (contactButton) {
        contactButton.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    // Function to validate form fields
    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (name.value.trim() === '') {
            nameError.textContent = 'Name is required';
            isValid = false;
        } else if (name.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            isValid = false;
        } else {
            nameError.textContent = '';
        }
        
        // Email validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '') {
            emailError.textContent = 'Email is required';
            isValid = false;
        } else if (!emailPattern.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address';
            isValid = false;
        } else {
            emailError.textContent = '';
        }
        
        // Phone validation
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        const phonePattern = /^\d{10,15}$/;
        if (phone.value.trim() === '') {
            phoneError.textContent = 'Phone number is required';
            isValid = false;
        } else if (!phonePattern.test(phone.value.replace(/[-()\s]/g, ''))) {
            phoneError.textContent = 'Please enter a valid phone number';
            isValid = false;
        } else {
            phoneError.textContent = '';
        }
        
        // Subject validation
        const subject = document.getElementById('subject');
        const subjectError = document.getElementById('subjectError');
        if (subject.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            isValid = false;
        } else if (subject.value.trim().length < 3) {
            subjectError.textContent = 'Subject must be at least 3 characters';
            isValid = false;
        } else {
            subjectError.textContent = '';
        }
        
        // Message validation
        const message = document.getElementById('message-text');
        const messageError = document.getElementById('messageError');
        if (message.value.trim() === '') {
            messageError.textContent = 'Message is required';
            isValid = false;
        } else if (message.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            isValid = false;
        } else {
            messageError.textContent = '';
        }
        
        return isValid;
    }
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // If form is valid, you can submit the form data
            const formData = new FormData(contactForm);
            const messageDiv = document.getElementById('message');
            
            // Simulating form submission with success message
            // In a real scenario, you would replace this with AJAX call to your backend
            messageDiv.innerHTML = '<div class="success-message">Your message has been sent successfully!</div>';
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                messageDiv.innerHTML = '';
            }, 5000);
        }
    });
    
    // Real-time validation on input blur
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateForm();
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const closeBtn = document.querySelector('.mobile-nav-close');
    const overlay = document.querySelector('.overlay');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
        overlay.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('show');
    });

    overlay.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        overlay.classList.remove('show');
    });
});
