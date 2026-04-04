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
            
            // Hanapin ang item na may text na "Task Management" at lagyan ng 'active' class
            navItems.forEach(item => {
                if(item.textContent.includes('Task Management')) {
                    item.classList.add('active');
                }
            });
        })
        .catch(error => console.error('Error loading navbar:', error));

    // --- MODAL LOGIC ---
    const createBtn = document.getElementById('create-task-btn');
    const modal = document.getElementById('create-task-modal');
    const closeBtn = document.getElementById('close-modal-btn');
    const cancelBtn = document.getElementById('cancel-modal-btn');
    const form = document.getElementById('create-task-form');

    // Buksan ang modal kapag kinlick ang 'Create Task' button
    createBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Function para isara ang modal
    const closeModal = () => {
        modal.style.display = 'none';
        form.reset(); // Opsyonal: i-reset ang form pagkasara
    };

    // Isara ang modal sa pamamagitan ng 'x' button
    closeBtn.addEventListener('click', closeModal);

    // Isara ang modal sa pamamagitan ng 'Cancel' button
    cancelBtn.addEventListener('click', closeModal);

    // Isara ang modal kapag kinlick sa labas ng modal box
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Pigilan ang default form submission para sa demo na ito
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // Dito mo ilalagay ang code para i-save ang bagong task
        console.log('Form submitted!');
        closeModal();
    });
});