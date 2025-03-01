let map;
let markers = {}; // Store markers for each bus

// Initialize Leaflet Map
function initMap() {
    map = L.map("map").setView([0, 0], 12); // Default center (updated later)

    // Set up OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    fetchBusLocation(); // Get first location immediately
    setInterval(fetchBusLocation, 5000); // Update every 5 sec
}

// Fetch Bus Locations from Backend
async function fetchBusLocation() {
    try {
        const response = await fetch("http://localhost:5000/tracking/get-location");
        const locations = await response.json();

        for (const bus_id in locations) {
            const { latitude, longitude } = locations[bus_id];

            // If the bus already has a marker, update its position
            if (markers[bus_id]) {
                markers[bus_id].setLatLng([latitude, longitude]);
            } else {
                // Add new marker for the bus
                markers[bus_id] = L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup(`Bus ${bus_id}`)
                    .openPopup();
            }

            // Center map on first bus found
            if (Object.keys(locations).length > 0) {
                const firstBus = Object.values(locations)[0];
                map.setView([firstBus.latitude, firstBus.longitude], 12);
            }
        }
    } catch (error) {
        console.error("Error fetching bus locations:", error);
    }
}
