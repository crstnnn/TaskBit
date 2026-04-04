/* =========================================
   SETTINGS WORKSPACE JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Fetch Navbar
    fetch('../navbar/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Hindi nahanap ang navbar.html');
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Set 'Settings' as active in the sidebar
            const navItems = document.querySelectorAll('.nav-menu li');
            navItems.forEach(item => {
                item.classList.remove('active');
                if(item.textContent.trim() === 'Settings') {
                    item.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));

    // 2. Tab Switching Logic
    const tabs = document.querySelectorAll('.set-tab');
    const tabPanels = document.querySelectorAll('.set-tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all panels
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Show target panel
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

});