import React, { useState, useEffect, useRef } from 'react';

/**
 * Home component - Main landing page for Nathan Gopee's portfolio
 * Refined and consolidated implementation (June 19, 2025)
 */
const Home = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const [mainVisible, setMainVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState(null);
  const [age, setAge] = useState(23);
  const [globeInitialized, setGlobeInitialized] = useState(false);
  const introRef = useRef(null);
  const mainRef = useRef(null);
  const globeRef = useRef(null);
  const animationCleanup = useRef(null);
  // Intro animation sequence
  const introAnimation = [
    { t: "{ }", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{ }", ms: 200 },
    { t: "{_}", ms: 200 },
    { t: "{N_}", ms: 100 },
    { t: "{NA_}", ms: 100 },
    { t: "{NAT_}", ms: 100 },
    { t: "{NATH_}", ms: 100 },
    { t: "{NATHA_}", ms: 100 },
    { t: "{NATHAN_}", ms: 100 },
    { t: "{NATHAN_}", ms: 100 },
    { t: "{NATHAN_G_}", ms: 100 },
    { t: "{NATHAN_GO_}", ms: 100 },
    { t: "{NATHAN_GOP_}", ms: 100 },
    { t: "{NATHAN_GOPE_}", ms: 100 },
    { t: "{NATHAN_GOPEE_}", ms: 100 },
    { t: "{NATHAN_GOPEE }", ms: 200 },
    { t: "{NATHAN_GOPEE_}", ms: 200 },
    { t: "{NATHAN_GOPEE }", ms: 200 },
    { t: "{NATHAN_GOPEE_}", ms: 200 },
    { t: "{NATHAN_GOPEE}", ms: 200 },
    { t: "{NATHAN_GOPEE}", ms: 200 }
  ];

  const languages = [
    {
      id: 'Java',
      name: 'Java',
      color: '#f16529',
      description: 'Java is the first language I started with and learned. I\'ve been using it for about 5 years now, and I\'d call myself proficient',
      projects: [
        {
          title: 'Fibonacci Fractal Engine',
          description: 'Led a team to develop a Java web application generating fractal images based on the Fibonacci sequence, allowing users to input a number and producing fractal construction data and raw images up to that number.',
          tech: 'Java, TypeScript, Vue.js, JUnit, RestAPI, Maven, Mockito, Docker, Git, GitHub, gRPC, Gson, Protobuf'
        }
      ]
    },
    {
      id: 'Python',
      name: 'Python',
      color: '#90c53f',
      description: 'Python is more my go to when making anything generic. I\'ve created and contributed to public and a few private apps over the few months I\'ve used it. I\'m still learning new things about it, but I\'m intermediate overall.',
      projects: [
        {
          title: 'To-Do List Managed on AWS Cloud',
          description: 'Developed a serverless to-do list manager allowing users to create, retrieve, update, and delete tasks.',
          tech: 'Python, TypeScript, Next.js, FastAPI, Docker, Git, GitHub, AWS Lambda, DynamoDB, Pytest'
        },
        {
          title: 'QView3D',
          description: 'Contributed to QView3D, an open-source 3D printing software, at the HVAMC 3D Printing Lab.',
          tech: 'Python, TypeScript, Vue.js, Flask, SQLite, Node.js, USB Serial, Git, GitHub, G-code, CSS'
        }
      ]
    },
    {
      id: 'HTML/CSS/Js',
      name: 'HTML/CSS/Js',
      color: '#5ec9f8',
      description: 'You\'re looking at this site aren\'t you. I\'m proficient at this stack.',
      projects: []
    },
    {
      id: 'others',
      name: 'others',
      color: '#ffdd48',
      description: 'Bruh chill gimme a sec, I\'ve also worked in TypeScript, C++, C#, and a bit of Assembly.',
      projects: []
    }
  ];

  useEffect(() => {
    // Calculate age dynamically
    const birthDate = new Date('2001-01-01'); // Adjust Nathan's birth date
    const today = new Date();
    const calculatedAge = today.getFullYear() - birthDate.getFullYear();
    setAge(calculatedAge);
  }, []);
  useEffect(() => {
    // Skip intro if already seen
    const skipIntro = localStorage.getItem('stepDenominator');
    const stepDenominator = skipIntro ? 2 : 1;

    let i = 0;
    const runIntro = () => {
      if (i < introAnimation.length) {
        const step = introAnimation[i];
        if (introRef.current) {
          introRef.current.innerText = step.t;
        }
        i++;
        setTimeout(runIntro, step.ms / stepDenominator);
      } else {
        setIntroComplete(true);
        localStorage.setItem('stepDenominator', '2');
        setTimeout(() => {
          setMainVisible(true);
          // Only initialize globe once
          if (!globeInitialized) {
            animationCleanup.current = initGlobe();
            setGlobeInitialized(true);
          }
        }, 500);
      }
    };

    runIntro();

    // Cleanup animation on unmount
    return () => {
      if (animationCleanup.current) {
        animationCleanup.current();
      }
    };
  }, [globeInitialized]);const initGlobe = () => {
    if (!globeRef.current) return;
    
    // Completely clear container
    globeRef.current.innerHTML = '';
    
    // Create canvas with proper styling
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions and position it to the right
    canvas.width = 450;
    canvas.height = 450;
    canvas.style.width = '450px';
    canvas.style.height = '450px';
    canvas.style.position = 'fixed';
    canvas.style.right = '5%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translateY(-50%)';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '15'; // Higher z-index to ensure it stays above other content
    canvas.style.opacity = '1';
    canvas.style.mixBlendMode = 'normal'; // Ensures proper blending without artifacts
    
    // Add canvas to document body instead of container to avoid positioning issues
    document.body.appendChild(canvas);
    
    let rotation = 0;
    let animationId;
    const centerX = 225;
    const centerY = 225;
    const radius = 180; // Slightly larger radius for better visibility
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, 400, 400);
      
      // Set line styles
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.7)';
      ctx.lineWidth = 1.5;
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
        // Draw rotating meridians (longitude lines) with improved rendering
      for (let i = 0; i < 15; i++) {
        const angle = (i * Math.PI * 2) / 15 + rotation;
        // Create a pulsing opacity effect based on angle
        const opacity = 0.5 + 0.35 * Math.sin(angle * 2 + rotation * 3);
        ctx.strokeStyle = `rgba(168, 85, 247, ${opacity})`;
        ctx.lineWidth = 1.25;
        
        ctx.beginPath();
        // Calculate proper ellipse width based on perspective angle
        const ellipseWidth = radius * Math.abs(Math.cos(angle));
        ctx.ellipse(centerX, centerY, ellipseWidth, radius, angle, 0, Math.PI * 2);
        ctx.stroke();
      }
        // Draw latitude lines with improved visual effect
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.6)';
      ctx.lineWidth = 1.25;
      // Create more latitude lines for a better globe effect
      for (let i = -3; i <= 3; i++) {
        if (i === 0) continue; // Skip equator, draw it separately
        const y = centerY + i * 40;
        const latRadius = Math.sqrt(Math.max(0, radius * radius - (i * 40) * (i * 40)));
        
        if (latRadius > 15) {
          ctx.beginPath();
          // Create a more elliptical shape for better 3D appearance
          ctx.ellipse(centerX, y, latRadius, latRadius * 0.1, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Draw equator with higher emphasis
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.9)';
      ctx.lineWidth = 1.75;
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radius, radius * 0.13, 0, 0, Math.PI * 2);
      ctx.stroke();
        // Draw animated satellites with enhanced visual effects
      for (let i = 0; i < 5; i++) { // Added an extra satellite
        // Each satellite has a slightly different color
        const hues = ['245, 158, 11', '236, 72, 153', '168, 85, 247', '59, 130, 246', '16, 185, 129'];
        ctx.fillStyle = `rgba(${hues[i]}, 0.9)`;
        
        // Calculate satellite position with variable speed and path
        const satelliteAngle = (rotation * (1.5 + i * 0.2)) + (i * Math.PI * 0.4);
        const satelliteRadius = radius + 20 + (i * 5);
        const x = centerX + Math.cos(satelliteAngle) * satelliteRadius;
        const y = centerY + Math.sin(satelliteAngle) * satelliteRadius * 0.25;
        
        // Draw satellite with a better glow effect
        ctx.shadowColor = `rgba(${hues[i]}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw a subtle trail
        ctx.shadowBlur = 4;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        const trailX = centerX + Math.cos(satelliteAngle - 0.1) * satelliteRadius;
        const trailY = centerY + Math.sin(satelliteAngle - 0.1) * satelliteRadius * 0.25;
        ctx.arc(trailX, trailY, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
        // Adjust rotation speed for smoother animation
      rotation += 0.008;
      
      // Create the animation loop with timing control
      const now = performance.now();
      const elapsed = now - (animate.lastTime || now);
      animate.lastTime = now;
      
      // Limit to approximately 60fps for consistency
      if (elapsed > 16 || !animate.lastTime) {
        animationId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          animationId = requestAnimationFrame(animate);
        }, 16 - elapsed);
      }
    };
    
    // Start animation
    animate();
    
    // Store canvas reference for cleanup
    globeRef.current.globeCanvas = canvas;
    
    // Return comprehensive cleanup function
    return () => {
      // Cancel animation frame to prevent memory leaks
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      // Remove canvas from DOM if it exists
      if (canvas && canvas.parentNode) {
        // Fade out the canvas before removing
        const fadeOut = () => {
          let opacity = parseFloat(canvas.style.opacity);
          if (opacity > 0) {
            opacity -= 0.1;
            canvas.style.opacity = opacity.toString();
            setTimeout(fadeOut, 30);
          } else {
            canvas.parentNode.removeChild(canvas);
          }
        };
        
        // Use immediate removal for component unmounts
        canvas.parentNode.removeChild(canvas);
      }
      
      // Clear references
      if (globeRef.current) {
        globeRef.current.globeCanvas = null;
      }
    };
  };

  const handleLanguageClick = (lang) => {
    if (currentLang === lang.id) {
      setCurrentLang(null);
    } else {
      setCurrentLang(lang.id);
    }
  };

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', position: 'relative' }}>
      {/* Intro Animation */}
      {!introComplete && (
        <h1 
          ref={introRef}
          className="intro"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%) translateY(-50%) scale(2, 2)',
            zIndex: 1000,
            fontFamily: 'Inconsolata, monospace',
            color: 'white'
          }}
        >
          { }
        </h1>
      )}

      {/* Main Content */}
      <div 
        ref={mainRef}
        id="main"
        style={{
          opacity: mainVisible ? 1 : 0,
          transition: 'opacity 0.5s',
          marginTop: '60px',
          padding: '20px'
        }}
      >
        {introComplete && (
          <h1 
            className="top"
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              marginBottom: '40px'
            }}
          >
            {"{NATHAN_GOPEE}"}
          </h1>
        )}

        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '20px' }}>Welcome to my personal portfolio!</h2>
          
          <h2 style={{ marginBottom: '20px' }}>
            I'm a <span className="age-display">{age}</span> year-old{' '}
            <span style={{ color: '#8e44ad' }}>Computer Science Graduate Student & Teaching Assistant</span>
          </h2>

          <h2 style={{ marginBottom: '40px' }}>
            who uses{' '}
            {languages.map((lang, index) => (
              <React.Fragment key={lang.id}>
                <span
                  className={`lang-button ${currentLang === lang.id ? 'active' : ''}`}
                  style={{ color: lang.color, cursor: 'pointer' }}
                  onClick={() => handleLanguageClick(lang)}
                  data-panel={lang.id}
                >
                  {lang.name}
                  <span 
                    className="underline" 
                    style={{ backgroundColor: lang.color }}
                  ></span>
                </span>
                {index < languages.length - 1 && (
                  <span>{index === languages.length - 2 ? ', and ' : ', '}</span>
                )}
              </React.Fragment>
            ))}
            .
          </h2>

          {/* Language Panels */}
          {languages.map((lang) => (
            <div
              key={lang.id}
              id={lang.id}
              className={`lang-panel ${currentLang === lang.id ? 'shown' : ''}`}
              style={{
                opacity: currentLang === lang.id ? 1 : 0,
                visibility: currentLang === lang.id ? 'visible' : 'hidden',
                position: currentLang === lang.id ? 'relative' : 'absolute',
                zIndex: currentLang === lang.id ? 100 : -100,
                marginTop: '60px',
                width: '100%',
                textAlign: 'center',
                transition: 'opacity 0.5s linear'
              }}
            >
              <h2>
                <a 
                  href={`https://docs.oracle.com/javase/specs/jls/se23/html/index.html`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: lang.color }}
                >
                  {lang.name}
                </a>
              </h2>
              <h3 style={{ margin: '20px 0', fontWeight: 'normal' }}>
                {lang.description}
              </h3>
              
              {lang.projects.length > 0 && (
                <div className="projects" style={{ marginTop: '40px' }}>
                  {lang.projects.map((project, index) => (
                    <div 
                      key={index}
                      className="project-card proj"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        padding: '20px',
                        margin: '20px 0',
                        textAlign: 'left'
                      }}
                    >
                      <h3 style={{ color: lang.color, marginBottom: '10px' }}>
                        {project.title}
                      </h3>
                      <p style={{ marginBottom: '15px', lineHeight: '1.6' }}>
                        {project.description}
                      </p>
                      <p style={{ 
                        color: 'rgba(255, 255, 255, 0.7)', 
                        fontSize: '0.9rem',
                        fontStyle: 'italic'
                      }}>
                        <strong>Technologies:</strong> {project.tech}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div 
            id="details"
            className={currentLang ? 'gone' : ''}
            style={{
              marginTop: '60px',
              opacity: currentLang ? 0 : 1,
              transition: 'opacity 0.25s'
            }}
          >
            <h2>
              Check out my{' '}
              <a 
                href="https://github.com/ndg8743" 
                className="d"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#8e44ad', textDecoration: 'underline' }}
              >
                GitHub
              </a>{' '}
              and{' '}
              <a 
                href="https://www.linkedin.com/in/nathangopee/" 
                className="d"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#8e44ad', textDecoration: 'underline' }}
              >
                LinkedIn
              </a>
              .
            </h2>
          </div>        </div>

      </div>      {/* Hidden globe container - canvas positioning handled in initGlobe */}
      <div 
        ref={globeRef}
        className="globe-container"
        style={{ 
          display: 'none', 
          position: 'absolute', 
          right: '0',
          zIndex: '-1' // Keep out of document flow
        }}
      />      {/* Location Info Display - Only show when main is visible */}
      {mainVisible && (
        <div 
          className="globe-info"
          style={{
            position: 'fixed',
            right: '5%',
            top: '50%',
            transform: 'translateY(-50%) translateY(260px)',
            width: '240px',
            background: 'rgba(0, 0, 0, 0.85)',
            border: '2px solid #a855f7',
            borderRadius: '12px',
            padding: '1rem',
            fontSize: '0.8rem',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Inconsolata, monospace',
            textAlign: 'center',
            boxShadow: '0 5px 20px rgba(168, 85, 247, 0.3)',
            zIndex: 20, // Higher z-index than globe to ensure visibility
            pointerEvents: 'none' // This element shouldn't capture mouse events
          }}
        >
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#a855f7' }}>🌍 Live Location</h4>
          <div style={{ color: '#10b981' }}>📍 Loading location...</div>
        </div>
      )}

      {/* Tiny Arrow Tabs - Ultra Minimal Indicators */}
      
      {/* Weather Tab - Right Edge */}
      <div 
        className="widget-tab weather-tab"
        style={{
          position: 'fixed',
          right: '0px',
          top: '20%',
          width: '6px',
          height: '30px',
          background: 'linear-gradient(45deg, #a855f7, #ec4899)',
          cursor: 'pointer',
          borderRadius: '8px 0 0 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          color: 'white',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '-2px 0 10px rgba(168, 85, 247, 0.4)'
        }}
        onMouseEnter={(e) => {
          e.target.style.width = '10px';
          e.target.style.boxShadow = '-5px 0 20px rgba(168, 85, 247, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.target.style.width = '6px';
          e.target.style.boxShadow = '-2px 0 10px rgba(168, 85, 247, 0.4)';
        }}
      >
        →
      </div>

      {/* IP Tab - Left Edge */}
      <div 
        className="widget-tab ip-tab"
        style={{
          position: 'fixed',
          left: '0px',
          top: '30%',
          width: '6px',
          height: '30px',
          background: 'linear-gradient(45deg, #a855f7, #10b981)',
          cursor: 'pointer',
          borderRadius: '0 8px 8px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          color: 'white',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '2px 0 10px rgba(168, 85, 247, 0.4)'
        }}
        onMouseEnter={(e) => {
          e.target.style.width = '10px';
          e.target.style.boxShadow = '5px 0 20px rgba(168, 85, 247, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.target.style.width = '6px';
          e.target.style.boxShadow = '2px 0 10px rgba(168, 85, 247, 0.4)';
        }}
      >
        ←
      </div>

      {/* Music Tab - Bottom Edge */}
      <div 
        className="widget-tab music-tab"
        style={{
          position: 'fixed',
          bottom: '0px',
          left: '20%',
          width: '30px',
          height: '6px',
          background: 'linear-gradient(45deg, #f97316, #ec4899)',
          cursor: 'pointer',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8px',
          color: 'white',
          zIndex: 1000,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: '0 -2px 10px rgba(249, 115, 22, 0.4)'
        }}
        onMouseEnter={(e) => {
          e.target.style.height = '10px';
          e.target.style.boxShadow = '0 -5px 20px rgba(249, 115, 22, 0.8)';
        }}
        onMouseLeave={(e) => {
          e.target.style.height = '6px';
          e.target.style.boxShadow = '0 -2px 10px rgba(249, 115, 22, 0.4)';
        }}
      >
        ↑
      </div>
    </div>
  );
};

export default Home;
