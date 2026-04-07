document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const forms = {
        login: document.getElementById('login'),
        register: document.getElementById('register'),
        forgot: document.getElementById('forgot')
    };
    const tabContainer = document.getElementById('auth-tabs');
    const showForgotLnk = document.getElementById('show-forgot');
    const backToLoginBtn = document.getElementById('back-to-login');
    const panel = document.querySelector('.glass-panel');

    // Function to calculate and set the panel height to make transitions smooth
    function updatePanelHeight(formElement) {
        // Temporarily clear explicit height to get intrinsic height
        panel.style.height = 'auto';
        
        // Form needs to be measured with relative position if it's currently absolute
        const wasAbsolute = window.getComputedStyle(formElement).position === 'absolute';
        
        // Calculate needed height taking into account padding and tabs if visible
        let extraHeight = 80; // 40px top/bottom padding
        if (tabContainer.style.display !== 'none') {
             extraHeight += tabContainer.offsetHeight + 30; // margin bottom
        }
        
        const formHeight = formElement.offsetHeight;
        panel.style.height = `${formHeight + extraHeight}px`;
    }

    function switchForm(targetId) {
        // Hide all forms
        Object.values(forms).forEach(form => {
            if (form) {
                form.classList.remove('active');
                form.classList.add('hidden');
            }
        });

        // Show target form
        const targetForm = forms[targetId];
        if (targetForm) {
            targetForm.classList.remove('hidden');
            // Slight delay before making it active so display kicks in
            setTimeout(() => {
                targetForm.classList.add('active');
            }, 20);
        }

        // Handle tabs visibility based on form
        if (targetId === 'forgot') {
            tabContainer.style.display = 'none';
        } else {
            tabContainer.style.display = 'flex';
            // Update active tab styling
            tabs.forEach(tab => {
                if (tab.dataset.target === targetId) {
                    tab.classList.add('active');
                } else {
                    tab.classList.remove('active');
                }
            });
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if (!tab.classList.contains('active')) {
                switchForm(tab.dataset.target);
            }
        });
    });

    if (showForgotLnk) {
        showForgotLnk.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm('forgot');
        });
    }

    if (backToLoginBtn) {
        backToLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            switchForm('login');
        });
    }
});
