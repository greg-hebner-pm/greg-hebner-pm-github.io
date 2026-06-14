document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Map
    const map = L.map('map').setView([38.8602, -104.8801], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // 2. Weather Forecast
    const weatherData = [
        { day: 'Mon', high: 82, low: 58, cond: 'Sunny' },
        { day: 'Tue', high: 79, low: 56, cond: 'Partly Cloudy' },
        { day: 'Wed', high: 75, low: 54, cond: 'Showers' },
        { day: 'Thu', high: 80, low: 57, cond: 'Sunny' },
        { day: 'Fri', high: 85, low: 60, cond: 'Clear' },
        { day: 'Sat', high: 83, low: 59, cond: 'Sunny' },
        { day: 'Sun', high: 81, low: 58, cond: 'Partly Cloudy' }
    ];
    
    const weatherBody = document.getElementById('weatherBody');
    if (weatherBody) {
        weatherBody.innerHTML = weatherData.map(w => `
            <tr>
                <td>${w.day}</td>
                <td>${w.high}°</td>
                <td>${w.low}°</td>
                <td>${w.cond}</td>
            </tr>
        `).join('');
    }

    // 3. GDD Graph (% time remaining until harvest)
    const ctx = document.getElementById('gddChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Harvest Progress'],
                datasets: [{
                    label: '% Time Remaining Until Harvest',
                    data: [65],
                    backgroundColor: '#2d5a27',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: { beginAtZero: true, max: 100, title: { display: true, text: 'Percentage (%)' } }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // 4. Machinery Table
    const machinery = [
        { model: '24-Row Planter', desc: 'Precision Planting', mph: 5.5, time: '120 hrs' },
        { model: 'S7 Combine', desc: 'Grain Harvesting', mph: 4.2, time: '85 hrs' },
        { model: 'See & Spray Sprayer', desc: 'Targeted Application', mph: 12.0, time: '45 hrs' }
    ];

    const machineryBody = document.getElementById('machineryBody');
    if (machineryBody) {
        machineryBody.innerHTML = machinery.map(m => `
            <tr>
                <td>${m.model}</td>
                <td>${m.desc}</td>
                <td>${m.mph}</td>
                <td>${m.time}</td>
            </tr>
        `).join('');
    }

    // 5. Field Selector Logic
    const fieldInput = document.getElementById('fieldName');
    const saveButton = document.getElementById('saveField');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            alert('Field saved: ' + fieldInput.value);
        });
    }
});
