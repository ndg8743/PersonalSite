import React, { useEffect } from 'react';

const Home = () => {
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

  return (
    <div style={{ background: 'black', color: 'white', minHeight: '100vh', position: 'relative' }}>
      {/* Intro Animation (handled by intro.js) */}
      <h1 
        id="intro"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '3rem',
          fontFamily: 'Inconsolata, monospace',
          margin: 0,
          transition: 'all 0.5s ease',
          zIndex: 1000
        }}
      >
        {'{_}'}
      </h1>

      {/* Main Content */}
      <div 
        id="main" 
        style={{
          opacity: 0,
          transition: 'opacity 0.5s ease',
          padding: '2rem',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header */}
        <header style={{ 
          marginBottom: '2rem',
          borderBottom: '1px solid #333',
          paddingBottom: '1rem'
        }}>
          <h1 style={{ 
            fontSize: '2rem', 
            margin: 0,
            fontFamily: 'Inconsolata, monospace',
            color: '#8e44ad'
          }}>
            NATHAN GOPEE
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            margin: '0.5rem 0',
            color: '#aacfd1'
          }}>
            Computer Science Student | Age: <span id="age">23.0000000000</span>
          </p>
          <p style={{ 
            color: '#666',
            fontStyle: 'italic'
          }}>
            Full-stack developer passionate about clean code and innovative solutions.
          </p>
        </header>

        {/* Programming Languages Section */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            color: '#8e44ad',
            fontFamily: 'Inconsolata, monospace',
            marginBottom: '1.5rem'
          }}>
            PROGRAMMING LANGUAGES
          </h2>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {languages.map((lang) => (
              <div
                key={lang.id}
                style={{
                  border: `2px solid ${lang.color}`,
                  padding: '1.5rem',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: 'rgba(142, 68, 173, 0.1)'
                  }
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(142, 68, 173, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                }}
              >
                <h3 style={{ 
                  color: lang.color,
                  fontFamily: 'Inconsolata, monospace',
                  fontSize: '1.3rem',
                  marginBottom: '0.5rem'
                }}>
                  {lang.name}
                </h3>
                <p style={{ 
                  color: '#ccc',
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {lang.description}
                </p>
                
                {lang.projects.length > 0 && (
                  <div>
                    <h4 style={{ 
                      color: '#aacfd1',
                      fontSize: '1rem',
                      marginBottom: '0.5rem'
                    }}>
                      Featured Projects:
                    </h4>
                    {lang.projects.map((project, index) => (
                      <div key={index} style={{ 
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: '1rem',
                        borderRadius: '4px',
                        marginBottom: '0.5rem'
                      }}>
                        <h5 style={{ 
                          color: '#fff',
                          fontSize: '0.9rem',
                          marginBottom: '0.5rem'
                        }}>
                          {project.title}
                        </h5>
                        <p style={{ 
                          color: '#bbb',
                          fontSize: '0.8rem',
                          marginBottom: '0.5rem',
                          lineHeight: '1.4'
                        }}>
                          {project.description}
                        </p>
                        <p style={{ 
                          color: '#8e44ad',
                          fontSize: '0.7rem',
                          fontStyle: 'italic'
                        }}>
                          Tech: {project.tech}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section style={{ 
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            color: '#8e44ad',
            fontFamily: 'Inconsolata, monospace',
            marginBottom: '1rem'
          }}>
            CONNECT WITH ME
          </h2>
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap'
          }}>
            <a 
              href="mailto:gopeen1@newpaltz.edu"
              style={{
                color: '#aacfd1',
                textDecoration: 'none',
                fontFamily: 'Inconsolata, monospace',
                padding: '0.5rem 1rem',
                border: '1px solid #aacfd1',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#aacfd1';
                e.target.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#aacfd1';
              }}
            >
              EMAIL
            </a>
            <a 
              href="https://github.com/nathangopee"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#aacfd1',
                textDecoration: 'none',
                fontFamily: 'Inconsolata, monospace',
                padding: '0.5rem 1rem',
                border: '1px solid #aacfd1',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#aacfd1';
                e.target.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#aacfd1';
              }}
            >
              GITHUB
            </a>
            <a 
              href="https://linkedin.com/in/nathangopee"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#aacfd1',
                textDecoration: 'none',
                fontFamily: 'Inconsolata, monospace',
                padding: '0.5rem 1rem',
                border: '1px solid #aacfd1',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#aacfd1';
                e.target.style.color = 'black';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#aacfd1';
              }}
            >
              LINKEDIN
            </a>
          </div>
        </section>
      </div>

      {/* Globe Container (handled by globe.js) */}
      <div 
        id="details" 
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </div>
  );
};

export default Home;