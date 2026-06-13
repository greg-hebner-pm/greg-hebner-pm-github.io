// Initialize Map
const map = L.map('map').setView([38.8339, -104.8214], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Drawing Controls for Acreage Mapping
const drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);
const drawControl = new L.Control.Draw({
    edit: { featureGroup: drawnItems },
    draw: { polygon: true, rectangle: false, circle: false, marker: false, polyline: false }
});
map.addControl(drawControl);

// Calculate Acreage
map.on(L.Draw.Event.CREATED, function (e) {
    drawnItems.clearLayers();
    const layer = e.layer;
    drawnItems.addLayer(layer);
    // Area in square meters to acres
    const area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
    const acres = (area * 0.000247105).toFixed(2);
    document.getElementById('acreage').innerText = `Field Size: ${acres} Acres`;
});

// AI Agent Logic
document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const msg = this.value;
        const history = document.getElementById('chat-history');
        history.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
        history.innerHTML += `<p><strong>AI:</strong> Analyzing field data for ${msg}...</p>`;
        this.value = '';
    }
});
