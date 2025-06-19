// Enhanced Features JavaScript - The Ultimate Portfolio Experience

// Weather API Integration - Load data without showing widget
async function loadWeatherData() {
    try {
        const response = await fetch('https://wttr.in/?format=j1');
        const data = await response.json();
        
        const weatherInfo = document.getElementById('weather-info');
        const current = data.current_condition[0];
        
        // Store weather data globally for when widget is shown
        window.weatherData = {
            temp: current.temp_F,
            condition: current.weatherDesc[0].value,
            emoji: getWeatherEmoji(current.weatherCode),
            feelsLike: current.FeelsLikeF,
            humidity: current.humidity,
            wind: current.windspeedMiles,
            visibility: current.visibility
        };
        
        // Populate the widget but don't show it
        weatherInfo.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="font-size: 2rem;">${window.weatherData.emoji}</div>
                <div>
                    <div style="font-size: 1.5rem; color: #a855f7;">${window.weatherData.temp}°F</div>
                    <div style="color: #aacfd1;">${window.weatherData.condition}</div>
                    <div style="font-size: 0.8rem; color: #666;">Feels like ${window.weatherData.feelsLike}°F</div>
                </div>
            </div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #333;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>💧 Humidity</span>
                    <span>${window.weatherData.humidity}%</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>💨 Wind</span>
                    <span>${window.weatherData.wind} mph</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>👁️ Visibility</span>
                    <span>${window.weatherData.visibility} miles</span>
                </div>
            </div>
        `;
        
        console.log('✅ Weather data loaded (widget remains hidden)');
    } catch (error) {
        console.error('Weather loading failed:', error);
        document.getElementById('weather-info').innerHTML = `
            <div style="color: #f59e0b;">
                <div>🌤️ Weather unavailable</div>
                <div style="font-size: 0.8rem;">Check connection</div>
            </div>
        `;
    }
}

// IP and Location Information - Load data without showing widget
async function loadIPData() {
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        // Store for globe integration
        window.currentUserLocation = data;
        
        const ipInfo = document.getElementById('ip-info');
        
        // Populate the widget but don't show it
        ipInfo.innerHTML = `
            <div style="display: grid; gap: 0.8rem;">
                <div><strong>🌍 Location:</strong> ${data.city}, ${data.country_name}</div>
                <div><strong>📍 Coordinates:</strong> ${data.latitude.toFixed(4)}, ${data.longitude.toFixed(4)}</div>
                <div><strong>🌐 IP Address:</strong> ${data.ip}</div>
                <div><strong>🏢 ISP:</strong> ${data.org}</div>
                <div><strong>🕒 Timezone:</strong> ${data.timezone}</div>
                <div><strong>🔒 Version:</strong> IPv${data.version}</div>
                <div style="font-size: 0.8rem; color: #10b981; margin-top: 0.5rem;">
                    ✓ Location synced with globe
                </div>
            </div>
        `;
        
        // Update globe location overlay
        const globeLocationData = document.getElementById('globe-location-data');
        if (globeLocationData) {
            globeLocationData.innerHTML = `
                <div style="display: grid; gap: 0.3rem; font-size: 0.8rem;">
                    <div style="color: #10b981;">📍 ${data.city}, ${data.country_name}</div>
                    <div style="color: #aacfd1;">🌐 ${data.ip}</div>
                    <div style="color: #aacfd1;">⏰ ${data.timezone}</div>
                    <div style="color: #ec4899; font-size: 0.7rem;">Connected via ${data.org}</div>
                </div>
            `;
        }
        
        // Trigger globe update if available
        if (window.globe && window.addUserLocationToGlobe) {
            console.log('Syncing location with globe...');
            // The globe integration will be handled by globe.js
        }
        
        console.log('✅ IP data loaded (widget remains hidden)');
        
    } catch (error) {
        console.error('IP info loading failed:', error);
        document.getElementById('ip-info').innerHTML = `
            <div style="color: #f59e0b;">
                <div>🌍 Location unavailable</div>
                <div style="font-size: 0.8rem;">Using default location</div>
                <div style="margin-top: 0.5rem; font-size: 0.8rem;">
                    <div>📍 New York, NY</div>
                    <div>🌐 IP: Hidden</div>
                </div>
            </div>
        `;
        
        // Update globe overlay with error state
        const globeLocationData = document.getElementById('globe-location-data');
        if (globeLocationData) {
            globeLocationData.innerHTML = `
                <div style="color: #f59e0b; font-size: 0.8rem;">
                    📍 Location detection disabled
                </div>
            `;
        }
    }
}
        
        const ipInfo = document.getElementById('ip-info');
        ipInfo.innerHTML = `
            <div style="margin-bottom: 1rem;">
                <div style="font-size: 1.2rem; color: #10b981; margin-bottom: 0.5rem;">🌍 ${data.city}, ${data.region}</div>
                <div style="color: #aacfd1;">${data.country_name}</div>
            </div>
            <div style="margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>🌐 IP Address</span>
                    <span>${data.ip}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>🏢 ISP</span>
                    <span>${data.org}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>📍 Coordinates</span>
                    <span>${data.latitude.toFixed(2)}, ${data.longitude.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <span>⏰ Timezone</span>
                    <span>${data.timezone}</span>
                </div>
            </div>
            <div style="padding-top: 1rem; border-top: 1px solid #333; font-size: 0.8rem; color: #666;">
                Connection detected and globe synchronized! 🎯
            </div>
        `;
        
        // Update globe with user location if globe is available
        if (typeof globe !== 'undefined' && globe && data.latitude && data.longitude) {
            globe.addPin(data.latitude, data.longitude, "You are here! 📍");
        }
        
    } catch (error) {
        console.error('IP info loading failed:', error);
        document.getElementById('ip-info').innerHTML = `
            <div style="color: #f59e0b;">
                <div>🌍 Location unavailable</div>
                <div style="font-size: 0.8rem;">Privacy mode detected</div>
            </div>
        `;
    }
}

// Particle System for Background
function initParticleSystem() {
    const canvas = document.getElementById('particles-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.life = Math.random() * 100 + 50;
            this.maxLife = this.life;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            return this.life > 0;
        }
        
        draw() {
            const alpha = this.life / this.maxLife;
            ctx.save();
            ctx.globalAlpha = alpha * 0.3;
            ctx.fillStyle = '#a855f7';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Add new particles
        if (particles.length < 100 && Math.random() < 0.3) {
            particles.push(new Particle());
        }
        
        // Update and draw particles
        particles = particles.filter(particle => {
            particle.update();
            particle.draw();
            return particle.life > 0;
        });
        
        requestAnimationFrame(animate);
    };
    
    animate();
}

// Enhanced Counter Animations
function animateCounters() {
    const counters = [
        { id: 'loc-counter', target: 50000, duration: 3000 },
        { id: 'commits-today', target: 42, duration: 2000 },
        { id: 'uptime', target: 99.9, duration: 2500, isFloat: true },
        { id: 'response-time', target: 47, duration: 1500 }
    ];
    
    counters.forEach(counter => {
        const element = document.getElementById(counter.id);
        if (!element) return;
        
        let current = 0;
        const increment = counter.target / (counter.duration / 16);
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= counter.target) {
                current = counter.target;
                clearInterval(timer);
            }
            
            if (counter.isFloat) {
                element.textContent = current.toFixed(1);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Skill Radar Chart
function drawSkillRadar() {
    const canvas = document.getElementById('skill-radar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 150;
    
    const skills = [
        { name: 'JavaScript', value: 90 },
        { name: 'Python', value: 85 },
        { name: 'Java', value: 95 },
        { name: 'React', value: 88 },
        { name: 'Node.js', value: 82 },
        { name: 'AI/ML', value: 75 },
        { name: 'Cloud', value: 78 },
        { name: 'DevOps', value: 70 }
    ];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.3)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    
    // Draw axes
    skills.forEach((skill, index) => {
        const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.stroke();
        
        // Labels
        ctx.fillStyle = '#a855f7';
        ctx.font = '12px Inconsolata';
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, x + 20 * Math.cos(angle), y + 20 * Math.sin(angle));
    });
    
    // Draw skill polygon
    ctx.beginPath();
    skills.forEach((skill, index) => {
        const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
        const distance = (skill.value / 100) * radius;
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw skill points
    skills.forEach((skill, index) => {
        const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
        const distance = (skill.value / 100) * radius;
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#a855f7';
        ctx.fill();
    });
}

// Music Player Functionality
function initMusicPlayer() {
    const playBtn = document.getElementById('play-btn');
    let isPlaying = false;
    
    if (!playBtn) return;
    
    playBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        playBtn.textContent = isPlaying ? '⏸️' : '▶️';
        
        if (isPlaying) {
            playBtn.style.background = '#10b981';
            // Simulate playing progress
            simulatePlayProgress();
        } else {
            playBtn.style.background = '#f59e0b';
        }
    });
}

function simulatePlayProgress() {
    const progressBar = document.querySelector('.music-player .progress-fill');
    let progress = 65;
    
    const interval = setInterval(() => {
        if (!document.getElementById('play-btn').textContent.includes('⏸️')) {
            clearInterval(interval);
            return;
        }
        
        progress += 0.1;
        if (progress > 100) progress = 0;
        
        progressBar.style.setProperty('--progress', `${progress}%`);
    }, 100);
}

// Lab Experiments
function runExperiment(experimentType) {
    const terminal = document.getElementById('lab-terminal');
    if (!terminal) return;
    
    const experiments = {
        'ai-generator': {
            command: 'python ai_code_generator.py --prompt "create a sorting algorithm"',
            output: `Generating code from natural language...
            
✅ Code generated successfully!

def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

📊 Confidence: 94%
⚡ Generation time: 0.34s`
        },
        'quantum-sim': {
            command: 'quantum-simulator --qubits 3 --circuit bell_state',
            output: `Initializing quantum simulator...
            
🔬 Creating 3-qubit system
⚛️  Applying Hadamard gate to qubit 0
🔗 Applying CNOT gate between qubits 0 and 1
📊 Measuring quantum state...

Result: |00⟩ + |11⟩ (Bell state created!)
🎯 Fidelity: 99.2%`
        },
        'music-ai': {
            command: 'music-composer --genre lofi --mood relaxed --duration 30s',
            output: `🎵 AI Music Composer v2.1

Analyzing mood: relaxed 😌
Selected genre: lofi hip-hop
Generating composition...

♪ Created 4-chord progression: Dm - Am - F - C
🥁 Added subtle drum pattern (72 BPM)
🎹 Layered ambient piano melodies
📻 Applied vinyl warmth filter

🎶 Composition complete! 
   Duration: 30.2 seconds
   🔥 Vibe level: Maximum chill`
        },
        'prediction': {
            command: 'predict-timeline --project "E-commerce Platform" --team-size 3',
            output: `🔮 Development Timeline Predictor

Project: E-commerce Platform
Team size: 3 developers
Complexity: High

📊 Analysis complete:
  - Frontend development: 6-8 weeks
  - Backend API: 4-6 weeks  
  - Database design: 2-3 weeks
  - Testing & deployment: 3-4 weeks
  
🎯 Estimated completion: 15-21 weeks
📈 Confidence interval: 87%
⚠️  Risk factors: 3rd party integrations, scaling requirements`
        }
    };
    
    const experiment = experiments[experimentType];
    if (!experiment) return;
    
    // Add command to terminal
    const commandDiv = document.createElement('div');
    commandDiv.innerHTML = `<div style="margin-top: 1rem;">
        <span style="color: #10b981;">lab@nathan:~$ </span>${experiment.command}
    </div>`;
    terminal.appendChild(commandDiv);
    
    // Simulate typing output
    const outputDiv = document.createElement('div');
    outputDiv.style.whiteSpace = 'pre-line';
    outputDiv.style.marginTop = '0.5rem';
    outputDiv.style.color = '#aacfd1';
    terminal.appendChild(outputDiv);
    
    let i = 0;
    const typeOutput = () => {
        if (i < experiment.output.length) {
            outputDiv.textContent += experiment.output[i];
            i++;
            setTimeout(typeOutput, 20);
        }
        terminal.scrollTop = terminal.scrollHeight;
    };
    
    setTimeout(typeOutput, 500);
}

// Lab Terminal Input Handler
function initLabTerminal() {
    const input = document.getElementById('lab-input');
    if (!input) return;
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const command = input.value.trim();
            const terminal = document.getElementById('lab-terminal');
            
            // Add command to terminal
            const commandDiv = document.createElement('div');
            commandDiv.innerHTML = `<div style="margin-top: 1rem;">
                <span style="color: #10b981;">lab@nathan:~$ </span>${command}
            </div>`;
            terminal.appendChild(commandDiv);
            
            // Process command
            processLabCommand(command);
            
            input.value = '';
            terminal.scrollTop = terminal.scrollHeight;
        }
    });
}

function processLabCommand(command) {
    const terminal = document.getElementById('lab-terminal');
    const outputDiv = document.createElement('div');
    outputDiv.style.marginTop = '0.5rem';
    outputDiv.style.color = '#aacfd1';
    
    const responses = {
        'help': `Available commands:
  generate-code    - Generate code from description
  predict-weather  - AI weather prediction
  analyze-sentiment - Analyze text sentiment  
  create-art      - Generate ASCII art
  system-status   - Show system information
  clear          - Clear terminal`,
        'generate-code': '🤖 Code generator ready! Generating sample function...\n\nfunction fibonacci(n) {\n  return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);\n}',
        'predict-weather': '🌤️ AI Weather Model: 73% chance of sunny skies tomorrow\n☀️ Confidence: High | Data sources: 47 sensors',
        'analyze-sentiment': '😊 Sentiment Analysis: Positive (87% confidence)\n💭 Detected emotions: Excitement, Curiosity, Optimism',
        'create-art': `    ╭─────────────────╮
    │  ◉     ◉     │
    │      ___      │  
    │                │
    ╰─────────────────╯
    
ASCII Art: Happy Developer!`,
        'system-status': `🖥️  System Status:
  CPU: 💪 8-core ARM64 @ 3.2GHz
  RAM: 📦 16GB (67% used)
  Storage: 💾 1TB SSD (42% used)  
  Network: 🌐 1Gbps (Connected)
  AI Models: 🤖 4 loaded
  Status: ✅ All systems optimal`,
        'clear': 'CLEAR_TERMINAL'
    };
    
    const response = responses[command.toLowerCase()] || `Command not found: ${command}\nType 'help' for available commands.`;
    
    if (response === 'CLEAR_TERMINAL') {
        terminal.innerHTML = `
            <div>Welcome to the Experimental Lab! 🧪</div>
            <div>Available commands: generate-code, predict-weather, analyze-sentiment, create-art</div>
            <div style="margin-top: 1rem;">
                <span style="color: #10b981;">lab@nathan:~$ </span>
                <input type="text" id="lab-input" style="background: transparent; border: none; color: #a855f7; font-family: inherit; outline: none; width: 70%;" placeholder="Type a command...">
            </div>
        `;
        initLabTerminal();
        return;
    }
    
    outputDiv.textContent = response;
    terminal.appendChild(outputDiv);
    terminal.scrollTop = terminal.scrollHeight;
}

// Contact Form Enhancement
function initContactForm() {
    const form = document.getElementById('contact-form-element');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Simulate sending
        button.textContent = '🚀 Sending...';
        button.style.background = 'linear-gradient(45deg, #f59e0b, #10b981)';
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        button.textContent = '✅ Message Sent!';
        button.style.background = 'linear-gradient(45deg, #10b981, #34d399)';
        
        // Show success message
        const successDiv = document.createElement('div');
        successDiv.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; border-radius: 8px; padding: 1rem; margin-top: 1rem; text-align: center;">
                ✅ Thanks for reaching out! I'll get back to you within 24 hours.
            </div>
        `;
        form.appendChild(successDiv);
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = 'linear-gradient(45deg, #a855f7, #10b981)';
            form.reset();
            if (successDiv.parentNode) {
                successDiv.parentNode.removeChild(successDiv);
            }
        }, 3000);
    });
}

// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const isLight = body.style.background === 'rgb(255, 255, 255)';
    
    if (isLight) {
        body.style.background = 'black';
        body.style.color = 'white';
    } else {
        body.style.background = 'white';
        body.style.color = 'black';
    }
    
    // Add theme transition effect
    body.style.transition = 'all 0.5s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 500);
}

// Utility Functions
function getWeatherEmoji(code) {
    const weatherCodes = {
        '113': '☀️', '116': '⛅', '119': '☁️', '122': '☁️',
        '143': '🌫️', '176': '🌦️', '179': '🌨️', '182': '🌧️',
        '185': '🌧️', '200': '⛈️', '227': '❄️', '230': '❄️',
        '248': '🌫️', '260': '🌫️', '263': '🌦️', '266': '🌦️',
        '281': '🌧️', '284': '🌧️', '293': '🌦️', '296': '🌦️',
        '299': '🌧️', '302': '🌧️', '305': '🌧️', '308': '🌧️',
        '311': '🌧️', '314': '🌧️', '317': '🌧️', '320': '🌨️',
        '323': '🌨️', '326': '🌨️', '329': '❄️', '332': '❄️',
        '335': '❄️', '338': '❄️', '350': '🌨️', '353': '🌦️',
        '356': '🌧️', '359': '🌧️', '362': '🌨️', '365': '🌨️',
        '368': '🌨️', '371': '❄️', '374': '🌨️', '377': '🌨️',
        '386': '⛈️', '389': '⛈️', '392': '⛈️', '395': '❄️'
    };
    return weatherCodes[code] || '🌤️';
}

function updateNextAvailabilityCheck() {
    const nextUpdate = document.getElementById('next-update');
    if (!nextUpdate) return;
    
    const now = new Date();
    const next = new Date(now.getTime() + 60000); // 1 minute from now
    nextUpdate.textContent = next.toLocaleTimeString();
}

// Initialize everything when DOM is ready
function initAllFeatures() {
    console.log('🚀 Initializing ultimate portfolio features...');
    
    // Check for globe elements
    const detailsEl = document.getElementById('details');
    if (detailsEl) {
        console.log('✅ Globe container found');
        // Add a subtle indicator that globe should be here
        detailsEl.style.border = '1px solid rgba(168, 85, 247, 0.2)';
        detailsEl.innerHTML = '<div style="position: absolute; bottom: 20px; right: 20px; color: #666; font-size: 12px;">🌍 Globe Loading...</div>';
    } else {
        console.log('❌ Globe container not found');
    }
    
    // Check for required globe scripts
    if (typeof ENCOM !== 'undefined') {
        console.log('✅ ENCOM Globe library loaded');
    } else {
        console.log('❌ ENCOM Globe library not loaded');
    }
    
    if (typeof grid !== 'undefined') {
        console.log('✅ Grid data loaded');
    } else {
        console.log('❌ Grid data not loaded');
    }
      // Core features - Load data but keep widgets hidden
    loadWeatherData(); // Renamed to indicate it only loads data
    loadIPData(); // Renamed to indicate it only loads data
    initParticleSystem();
    initMusicPlayer();
    initLabTerminal();
    initContactForm();
    
    // Animations and visuals
    setTimeout(animateCounters, 1000);
    setTimeout(drawSkillRadar, 1500);
    
    // Updates
    updateNextAvailabilityCheck();
    setInterval(updateNextAvailabilityCheck, 60000);
    
    // Try to initialize globe after a delay
    setTimeout(() => {
        if (typeof window.initGlobe === 'function') {
            console.log('🌍 Calling initGlobe function...');
            window.initGlobe();
        } else {
            console.log('❌ initGlobe function not available');
        }
    }, 2000);
    
    console.log('✅ All features loaded successfully!');
}

// Export for global access
window.runExperiment = runExperiment;
window.toggleTheme = toggleTheme;
window.scheduleCall = () => alert('📞 Call scheduling feature coming soon!');
window.downloadResume = () => alert('📄 Resume download feature coming soon!');
window.scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllFeatures);
} else {
    initAllFeatures();
}
