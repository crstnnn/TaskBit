document.addEventListener("DOMContentLoaded", () => {
    
    // Kunin ang navbar.html at ilagay sa #navbar-placeholder
    fetch('../navbar/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Hindi nahanap ang navbar.html');
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // --- ACTIVE STATE LOGIC ---
            // Tanggalin ang 'active' class sa lahat ng items
            const navItems = document.querySelectorAll('.nav-menu li');
            navItems.forEach(item => item.classList.remove('active'));
            
            // Hanapin ang item na may text na "Task Load Checker" at lagyan ng 'active' class
            navItems.forEach(item => {
                if(item.textContent.includes('Task Load Checker')) {
                    item.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));

});