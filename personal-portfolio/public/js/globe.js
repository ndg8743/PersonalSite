let globe;

function initGlobe() {
    if (!window.ENCOM || !window.grid) {
        console.log('ENCOM Globe or grid data not loaded yet');
        return;
    }

    const main = document.getElementById('main');
    const detailsEl = document.getElementById('details');
    
    if (!main || !detailsEl) {
        console.log('Required elements not found');
        return;
    }    try {        
        // Create globe with fixed 450x450 dimensions for the new layout
        globe = new ENCOM.Globe(450, 450, {
            font: "Inconsolata",
            data: [],
            tiles: grid.tiles,
            baseColor: "#000011",  // Slightly lighter base
            markerColor: "#a855f7", // Purple theme color
            pinColor: "#10b981",    // Green theme color
            satelliteColor: "#ec4899", // Pink theme color
            scale: 1.0,             // Perfect scale for 450px container
            dayLength: 12000,       // Faster rotation
            introLinesDuration: 2000,
            maxPins: 500,
            maxMarkers: 4,
            viewAngle: 0.15         // Better viewing angle
        });

        detailsEl.appendChild(globe.domElement);globe.init();
        animate();

        // Enhanced IP geolocation with user location tracking
        addUserLocationToGlobe();
        addVisitorLocationsToGlobe();

        // Add constellation
        var constellation = [];
        var opts = {
            coreColor: "#ff0000",
            numWaves: 8
        };
        var alt = 1;

        for (var i = 0; i < 2; i++) {
            for (var j = 0; j < 3; j++) {
                constellation.push({
                    lat: 50 * i - 30 + 15 * Math.random(),
                    lon: 120 * j - 120 + 30 * i,
                    altitude: alt
                });
            }
        }

        globe.addConstellation(constellation, opts);
    } catch (error) {
        console.error('Globe initialization failed:', error);
    }
}

function animate() {
    if (globe) {
        globe.tick();
    }
    requestAnimationFrame(animate);
}

// Handle window resize - globe now has fixed dimensions
window.addEventListener('resize', () => {
    // Globe now uses fixed 450x450 dimensions, no resize needed
    console.log('Window resized - globe maintains fixed dimensions');
});

// Make initGlobe available globally
window.initGlobe = initGlobe;

// Initialize globe when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing globe...');
    
    // Wait a bit for other scripts to load
    setTimeout(() => {
        initGlobe();
        
        // If globe still not visible, try again
        setTimeout(() => {
            if (!globe) {
                console.log('Retrying globe initialization...');
                initGlobe();
            }
        }, 2000);
    }, 1000);
});

// Also try when window loads
window.addEventListener('load', function() {
    if (!globe) {
        console.log('Window loaded, trying globe init again...');
        setTimeout(initGlobe, 500);
    }
});

// Enhanced IP geolocation functions
function addUserLocationToGlobe() {
    // Add current user's location with special marker
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            if (data.latitude && data.longitude) {
                console.log('Adding user location to globe:', data.city, data.country);
                
                // Add a special pulsing marker for current user
                globe.addMarker(
                    data.latitude, 
                    data.longitude, 
                    `YOU ARE HERE\n${data.city}, ${data.country}\nIP: ${data.ip}\nISP: ${data.org}`,
                    false // don't animate trajectory
                );
                
                // Add a pin for the user's location
                globe.addPin(data.latitude, data.longitude, `${data.city}, ${data.country_name}`);
                
                // Store user location globally for other components
                window.userLocation = {
                    lat: data.latitude,
                    lon: data.longitude,
                    city: data.city,
                    country: data.country_name,
                    ip: data.ip,
                    isp: data.org,
                    timezone: data.timezone
                };
                
                // Update IP widget with more detailed info
                updateIPWidget(data);
            }
        })
        .catch(error => {
            console.log('Primary IP service failed, trying backup...');
            // Fallback to another service
            fetch('https://api.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => {
                    fetch(`https://ip-api.com/json/${data.ip}`)
                        .then(response => response.json())
                        .then(geoData => {
                            if (geoData.lat && geoData.lon) {
                                globe.addMarker(
                                    geoData.lat, 
                                    geoData.lon, 
                                    `YOU ARE HERE\n${geoData.city}, ${geoData.country}\nIP: ${data.ip}`,
                                    false
                                );
                                globe.addPin(geoData.lat, geoData.lon, `${geoData.city}, ${geoData.country}`);
                                
                                window.userLocation = {
                                    lat: geoData.lat,
                                    lon: geoData.lon,
                                    city: geoData.city,
                                    country: geoData.country,
                                    ip: data.ip,
                                    isp: geoData.isp,
                                    timezone: geoData.timezone
                                };
                            }
                        })
                        .catch(err => console.log('Backup IP geolocation also failed:', err));
                })
                .catch(err => console.log('IP detection failed completely:', err));
        });
}

function addVisitorLocationsToGlobe() {
    // Add some sample visitor locations to make the globe more dynamic
    const visitorLocations = [
        { lat: 40.7128, lon: -74.0060, label: "New York, NY", ip: "198.51.100.1" },
        { lat: 37.7749, lon: -122.4194, label: "San Francisco, CA", ip: "203.0.113.1" },
        { lat: 51.5074, lon: -0.1278, label: "London, UK", ip: "192.0.2.1" },
        { lat: 35.6762, lon: 139.6503, label: "Tokyo, Japan", ip: "198.51.100.2" },
        { lat: -33.8688, lon: 151.2093, label: "Sydney, Australia", ip: "203.0.113.2" },
        { lat: 52.5200, lon: 13.4050, label: "Berlin, Germany", ip: "192.0.2.2" },
        { lat: 55.7558, lon: 37.6173, label: "Moscow, Russia", ip: "198.51.100.3" }
    ];
    
    // Add visitor locations with delay for dramatic effect
    visitorLocations.forEach((location, index) => {
        setTimeout(() => {
            globe.addPin(location.lat, location.lon, `${location.label}\nVisitor IP: ${location.ip}`);
        }, 2000 + (index * 1000)); // Staggered appearance
    });
}

function updateIPWidget(data) {
    const ipWidget = document.querySelector('.ip-widget #ip-info');
    if (ipWidget) {
        ipWidget.innerHTML = `
            <div style="display: grid; gap: 0.8rem;">
                <div><strong>🌍 Location:</strong> ${data.city}, ${data.country_name}</div>
                <div><strong>📍 Coordinates:</strong> ${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}</div>
                <div><strong>🌐 IP Address:</strong> ${data.ip}</div>
                <div><strong>🏢 ISP:</strong> ${data.org}</div>
                <div><strong>🕒 Timezone:</strong> ${data.timezone}</div>
                <div><strong>🔒 Connection:</strong> ${data.version}</div>
                <div style="font-size: 0.8rem; color: #10b981; margin-top: 0.5rem;">
                    ✓ Location synced with globe
                </div>
            </div>
        `;
    }
}
