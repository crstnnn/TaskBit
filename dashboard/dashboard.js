// Kunin ang navbar.html at ilagay sa #navbar-placeholder
fetch('../navbar/navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));

document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById('weeklyChart').getContext('2d');

    // Chart Data Configuration
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Completed',
                // Using values that match the visual heights in the screenshot for Monday-Friday
                data: [13, 15, 8, 18, 12, null, null], 
                backgroundColor: '#95002b', // Maroon color
                barPercentage: 0.4,
                categoryPercentage: 0.8
            },
            {
                label: 'Pending',
                // Values for Saturday-Sunday
                data: [null, null, null, null, null, 7, 5], 
                backgroundColor: '#d64654', // Light red color
                barPercentage: 0.4,
                categoryPercentage: 0.8
            }
        ]
    };

    // Chart rendering options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 20,
                ticks: {
                    stepSize: 2.5,
                    color: '#999',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    color: '#f0f0f0',
                    drawBorder: false,
                }
            },
            x: {
                stacked: true,
                ticks: {
                    color: '#999',
                    font: {
                        size: 12
                    }
                },
                grid: {
                    display: false,
                    drawBorder: false,
                }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: true,
                    boxWidth: 12,
                    boxHeight: 12,
                    padding: 30,
                    color: '#555',
                    font: {
                        family: 'Inter',
                        size: 12
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.8)',
                titleFont: { family: 'Inter', size: 13 },
                bodyFont: { family: 'Inter', size: 13 },
                padding: 10,
                cornerRadius: 4
            }
        }
    };

    // Initialize Chart
    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
});