const map = L.map('map').setView([38.8339, -104.8214], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Machinery Logic (Width in feet, Speed in mph)
const machinery = [
    { name: "1775NT Planter", width: 60, speed: 5.5 },
    { name: "S7 900 Combine", width: 40, speed: 4.5 },
    { name: "800R Sprayer", width: 120, speed: 12 }
];

map.on('mousemove', (e) => {
    document.getElementById('gps-coords').innerText = `Lat: ${e.latlng.lat.toFixed(4)}, Lon: ${e.latlng.lng.toFixed(4)}`;
});

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
new L.Control.Draw({ draw: { polygon: true, rectangle: false, circle: false, marker: false, polyline: false }, edit: { featureGroup: drawnItems } }).addTo(map);

map.on(L.Draw.Event.CREATED, (e) => {
    const layer = e.layer;
    drawnItems.addLayer(layer);
    const areaAcres = (L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]) * 0.000247105).toFixed(2);
    
    // Calculate Execution (Time = Area / (Width * Speed * Efficiency))
    let html = `<p><strong>Acreage:</strong> ${areaAcres} Acres</p>`;
    machinery.forEach(m => {
        const hours = (areaAcres / ((m.width * 5280 / 43560) * m.speed * 0.85)).toFixed(1);
        html += `<p>${m.name}: ~${hours} hrs</p>`;
    });
    document.getElementById('metrics-data').innerHTML = html;
});

function askAI(topic) {
    document.getElementById('chat-history').innerHTML += `<p><strong>AI:</strong> Analyzing ${topic}...</p>`;
}
