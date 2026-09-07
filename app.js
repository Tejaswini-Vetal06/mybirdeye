document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map (centered around a fictional/generic location, e.g., Bangalore as per the UI mock)
    // 12.9716° N, 77.5946° E
    const map = L.map('map', {
        zoomControl: false // Disable default zoom control to customize if needed
    }).setView([12.9344, 77.6192], 14); // Coordinates roughly matching Koramangala

    // Add a tile layer (using standard OpenStreetMap for now to avoid needing an API key)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom Icon generation
    const createCustomIcon = (color, iconClass) => {
        return L.divIcon({
            html: `<div class="w-8 h-8 rounded-full bg-${color}-500 text-white flex items-center justify-center shadow-lg border-2 border-white">
                      <i class="fas ${iconClass}"></i>
                   </div>`,
            className: 'custom-leaflet-icon',
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
        });
    };

    const icons = {
        pothole: createCustomIcon('red', 'fa-road'),
        garbage: createCustomIcon('orange', 'fa-trash'),
        streetlight: createCustomIcon('yellow', 'fa-lightbulb'),
        water: createCustomIcon('blue', 'fa-tint')
    };

    // Dummy data for markers
    const issues = [
        { lat: 12.9354, lng: 77.6142, type: 'pothole', title: 'Large pothole on MG Road', status: 'Reported' },
        { lat: 12.9324, lng: 77.6212, type: 'garbage', title: 'Overflowing garbage bin', status: 'In progress' },
        { lat: 12.9384, lng: 77.6252, type: 'streetlight', title: 'Streetlight not working', status: 'Reported' },
        { lat: 12.9300, lng: 77.6180, type: 'pothole', title: 'Road damage', status: 'Verified' },
        { lat: 12.9400, lng: 77.6100, type: 'water', title: 'Water Leakage', status: 'Resolved' }
    ];

    // Add markers to the map
    issues.forEach(issue => {
        const marker = L.marker([issue.lat, issue.lng], { icon: icons[issue.type] }).addTo(map);
        
        // Simple popup
        marker.bindPopup(`
            <div class="p-1">
                <h4 class="font-bold text-sm">${issue.title}</h4>
                <p class="text-xs text-gray-500 mt-1 capitalize">${issue.type} • ${issue.status}</p>
            </div>
        `);
    });

    // Handle map interaction - close panels or popups on click
    map.on('click', () => {
        // close logic if needed
    });
});
