/* =========================================
   PROJECTS WORKSPACE JAVASCRIPT
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
            
            const navItems = document.querySelectorAll('.nav-menu li');
            navItems.forEach(item => {
                item.classList.remove('active');
                if(item.textContent.trim() === 'Projects') {
                    item.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));

    // 2. Modal Logic
    const modal = document.getElementById("createProjectModal");
    const openBtn = document.getElementById("openCreateProjectModal");
    const closeBtn = document.getElementById("closeProjectBtn");
    const closeIconBtn = document.getElementById("closeIconBtn");

    const closeModal = () => {
        modal.style.display = "none";
    };

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            modal.style.display = "flex"; 
        });
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (closeIconBtn) closeIconBtn.addEventListener("click", closeModal);

    // 3. Custom Priority Dropdown
    const priorityHeader = document.getElementById('priorityHeader');
    const priorityList = document.getElementById('priorityList');
    const priorityText = document.getElementById('priorityText');
    const priorityItems = document.querySelectorAll('#priorityList .proj-select-item');

    if (priorityHeader && priorityList) {
        priorityHeader.addEventListener('click', (e) => {
            e.stopPropagation(); 
            priorityList.classList.toggle('show');
        });

        priorityItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedValue = item.getAttribute('data-value');
                priorityText.textContent = selectedValue;
                priorityText.style.color = '#111111';
                priorityList.classList.remove('show');
            });
        });
    }

    // Date color update
    const dateInput = document.querySelector('.proj-date-input');
    if(dateInput) {
        dateInput.addEventListener('change', () => {
            dateInput.style.color = '#111111'; 
        });
    }

    // Close things when clicking outside
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
        if (priorityHeader && !priorityHeader.contains(event.target) && !priorityList.contains(event.target)) {
            priorityList.classList.remove('show');
        }
    });

});