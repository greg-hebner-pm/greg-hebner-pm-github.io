const map = L.map('map').setView([38.8602, -104.8801], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const gpsCoords = document.getElementById('gps-coords');
map.on('mousemove', (e) => {
    gpsCoords.innerText = `Lat: ${e.latlng.lat.toFixed(4)}, Lon: ${e.latlng.lng.toFixed(4)}`;
});

const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

const drawControl = new L.Control.Draw({
    draw: {
        polygon: { allowIntersection: false, showArea: true },
        circle: true,
        rectangle: false,
        polyline: false,
        marker: false,
        circlemarker: false
    },
    edit: { featureGroup: drawnItems }
});
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, (e) => {
    drawnItems.clearLayers();
    const layer = e.layer;
    drawnItems.addLayer(layer);
    updateMetrics(layer);
});

function updateMetrics(layer) {
    let area, perimeter;
    if (layer instanceof L.Polygon) {
        const latlngs = layer.getLatLngs()[0];
        area = (L.GeometryUtil.geodesicArea(latlngs) * 0.000247105).toFixed(2);
        let dist = 0;
        for (let i = 0; i < latlngs.length; i++) {
            dist += latlngs[i].distanceTo(latlngs[(i + 1) % latlngs.length]);
        }
        perimeter = (dist * 0.000621371).toFixed(2);
    } else if (layer instanceof L.Circle) {
        const radius = layer.getRadius();
        area = (Math.PI * radius * radius * 0.000247105).toFixed(2);
        perimeter = (2 * Math.PI * radius * 0.000621371).toFixed(2);
    }
    document.getElementById('acreage').innerText = area + ' Acres';
    document.getElementById('perimeter').innerText = perimeter;
    document.getElementById('machinery').innerText = 'Ready for Ops';
}

function updateWeather() {
    document.getElementById('temp').innerText = '74°F';
    document.getElementById('feels-like').innerText = '72°F';
    document.getElementById('precip-prob').innerText = '5%';
    document.getElementById('precip-amount').innerText = '0.0"';
    document.getElementById('wind').innerText = '8 mph WNW';
}
updateWeather();

window.askAI = function(topic) {
    const chat = document.getElementById('chat-history');
    const msg = document.createElement('p');
    msg.innerHTML = `<strong>Agent:</strong> Analyzing ${topic} for your current field... Optimization complete.`;
    chat.appendChild(msg);
};

document.getElementById('planting-date').addEventListener('change', (e) => {
    const start = new Date(e.target.value);
    const diff = Math.floor((new Date() - start) / (1000 * 60 * 60 * 24));
    document.getElementById('days-elapsed').innerText = diff > 0 ? diff : 0;
    document.getElementById('avg-temp').innerText = '68°F';
});
