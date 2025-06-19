// Widget Hover Functionality
let weatherTimeout, ipTimeout, musicTimeout;

// Weather Widget Functions
function showWeatherWidget() {
    clearTimeout(weatherTimeout);
    const widget = document.getElementById('weather-widget');
    if (widget) {
        widget.classList.add('visible');
    }
}

function hideWeatherWidget() {
    weatherTimeout = setTimeout(() => {
        const widget = document.getElementById('weather-widget');
        if (widget) {
            widget.classList.remove('visible');
        }
    }, 500); // Delay before hiding
}

// IP Widget Functions
function showIPWidget() {
    clearTimeout(ipTimeout);
    const widget = document.getElementById('ip-widget');
    if (widget) {
        widget.classList.add('visible');
    }
}

function hideIPWidget() {
    ipTimeout = setTimeout(() => {
        const widget = document.getElementById('ip-widget');
        if (widget) {
            widget.classList.remove('visible');
        }
    }, 500); // Delay before hiding
}

// Music Player Functions
function showMusicPlayer() {
    clearTimeout(musicTimeout);
    const widget = document.getElementById('music-player');
    if (widget) {
        widget.classList.add('visible');
    }
}

function hideMusicPlayer() {
    musicTimeout = setTimeout(() => {
        const widget = document.getElementById('music-player');
        if (widget) {
            widget.classList.remove('visible');
        }
    }, 500); // Delay before hiding
}

// Enhanced widget hover with mouse tracking
function initWidgetHover() {
    const weatherWidget = document.getElementById('weather-widget');
    const ipWidget = document.getElementById('ip-widget');
    const musicPlayer = document.getElementById('music-player');
    
    // Add hover events to widgets themselves to keep them visible
    if (weatherWidget) {
        weatherWidget.addEventListener('mouseenter', () => {
            clearTimeout(weatherTimeout);
            weatherWidget.classList.add('visible');
        });
        
        weatherWidget.addEventListener('mouseleave', () => {
            hideWeatherWidget();
        });
    }
    
    if (ipWidget) {
        ipWidget.addEventListener('mouseenter', () => {
            clearTimeout(ipTimeout);
            ipWidget.classList.add('visible');
        });
        
        ipWidget.addEventListener('mouseleave', () => {
            hideIPWidget();
        });
    }
    
    if (musicPlayer) {
        musicPlayer.addEventListener('mouseenter', () => {
            clearTimeout(musicTimeout);
            musicPlayer.classList.add('visible');
        });
        
        musicPlayer.addEventListener('mouseleave', () => {
            hideMusicPlayer();
        });
    }
}

// Make functions globally available
window.showWeatherWidget = showWeatherWidget;
window.hideWeatherWidget = hideWeatherWidget;
window.showIPWidget = showIPWidget;
window.hideIPWidget = hideIPWidget;
window.showMusicPlayer = showMusicPlayer;
window.hideMusicPlayer = hideMusicPlayer;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all widgets are hidden on page load
    hideAllWidgetsOnLoad();
    initWidgetHover();
    console.log('Widget hover functionality initialized - all widgets hidden by default');
});

// Force hide all widgets on page load
function hideAllWidgetsOnLoad() {
    const weatherWidget = document.getElementById('weather-widget');
    const ipWidget = document.getElementById('ip-widget');
    const musicPlayer = document.getElementById('music-player');
    
    // Remove any visible classes that might have been added
    if (weatherWidget) {
        weatherWidget.classList.remove('visible');
        console.log('Weather widget hidden on load');
    }
    if (ipWidget) {
        ipWidget.classList.remove('visible');
        console.log('IP widget hidden on load');
    }
    if (musicPlayer) {
        musicPlayer.classList.remove('visible');
        console.log('Music player hidden on load');
    }
}
