document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([38.8602, -104.8801], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    new Chart(document.getElementById('gddChart'), {
        type: 'line',
        data: { labels: ['May 1', 'May 3', 'May 5', 'May 7'], datasets: [{ label: 'GDD', data: [15, 48, 85, 120], borderColor: '#2d5a27' }] }
    });

    const fieldInput = document.getElementById('fieldName');
    document.getElementById('saveField').addEventListener('click', () => {
        const fields = JSON.parse(localStorage.getItem('savedFields') || '[]');
        fields.push(fieldInput.value);
        localStorage.setItem('savedFields', JSON.stringify(fields));
        renderFields();
    });

    function renderFields() {
        const fields = JSON.parse(localStorage.getItem('savedFields') || '[]');
        document.getElementById('fieldList').innerHTML = fields.map(f => `<li>🚜 ${f}</li>`).join('');
    }
    renderFields();

    const fleet = [
        { id: 'TR-101', type: '8R Tractor', status: 'Active', fuel: '85%' },
        { id: 'CB-402', type: 'S700 Combine', status: 'Maintenance', fuel: '12%' }
    ];
    document.querySelector('#machineryTable tbody').innerHTML = fleet.map(m => 
        `<tr><td>${m.id}</td><td>${m.type}</td><td>${m.status}</td><td>${m.fuel}</td></tr>`
    ).join('');
});
