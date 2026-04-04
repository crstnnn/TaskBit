document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LOAD NAVBAR ---
    fetch('../navbar/navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Hindi nahanap ang navbar.html');
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            const navItems = document.querySelectorAll('.nav-menu li');
            navItems.forEach(item => item.classList.remove('active'));
            
            navItems.forEach(item => {
                if(item.textContent.includes('User Management')) {
                    item.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));


    // --- 2. MODAL LOGIC ---
    const modal = document.getElementById("addUserModal");
    const openBtn = document.getElementById("openAddUserModal");
    const closeBtn = document.getElementById("closeModalBtn");

    if (openBtn) {
        openBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }


    // --- 3. CUSTOM PERMISSION DROPDOWN LOGIC ---
    const permissionHeader = document.getElementById('permissionHeader');
    const permissionList = document.getElementById('permissionList');
    const permissionText = document.getElementById('permissionText');
    const checkboxes = document.querySelectorAll('#permissionList input[type="checkbox"]');

    if (permissionHeader && permissionList) {
        // Toggle (Open/Close) dropdown kapag kinlik ang header
        permissionHeader.addEventListener('click', (e) => {
            e.stopPropagation(); // Para hindi agad magsara 
            permissionList.classList.toggle('show');
        });

        // Update ang text sa header base sa mga naka-check
        checkboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                // Kunin lahat ng naka-check na boxes
                const checkedBoxes = Array.from(checkboxes).filter(i => i.checked);
                
                if (checkedBoxes.length === 0) {
                    permissionText.textContent = 'Select permissions';
                } else if (checkedBoxes.length === 1) {
                    // Kunin yung text katabi ng checkbox
                    permissionText.textContent = checkedBoxes[0].parentElement.textContent.trim();
                } else {
                    // Halimbawa: "3 permissions selected"
                    permissionText.textContent = `${checkedBoxes.length} permissions selected`;
                }
            });
        });
    }

    // Isara ang modal O kaya yung dropdown kapag kinlik sa labas
    window.addEventListener("click", (event) => {
        // Para sa modal
        if (event.target === modal) {
            modal.style.display = "none";
        }
        
        // Para sa custom dropdown
        if (permissionHeader && !permissionHeader.contains(event.target) && !permissionList.contains(event.target)) {
            permissionList.classList.remove('show');
        }
    });

});