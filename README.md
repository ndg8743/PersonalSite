# Nathan Gopee's Portfolio

A modern, interactive portfolio site showcasing my skills, projects, and experience as a Computer Science student.

## Repository Cleanup (June 19, 2025)

This repository has been cleaned up and consolidated into a single cohesive portfolio site. The following changes were made:

- Removed multiple duplicate implementations 
- Consolidated all functionality into a single React application
- Removed redundant files and folders
- Fixed globe visualization and animation issues
- Improved code organization and quality

## Features

- Interactive 3D globe visualization with geolocation features
- Typewriter-style intro animation
- Hidden widget system with minimal UI indicators
- Modern dark theme with purple accent colors
- Projects showcase organized by programming language
- Dynamic age calculation
- Responsive design for all screen sizes

## Technologies Used

- React.js for UI components and state management
- HTML5 Canvas for custom animations and globe visualization
- CSS3 with modern styling techniques
- JavaScript ES6+ features
- IP geolocation API integration
- Local storage for user preferences

## Running the Portfolio

```powershell
# Navigate to the portfolio directory
cd personal-portfolio

# Install dependencies
npm install

# Start development server
npm start

# Or with legacy SSL (for Node.js v22+)
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm start

# Build for production
npm run build
```

## File Structure

```
personal-portfolio/
├── public/           # Static assets
│   ├── index.html    # HTML template
│   ├── favicon.ico   # Site favicon
│   └── js/           # JavaScript utilities
│       ├── intro.js  # Intro animation
│       └── globe.js  # Globe visualization
├── src/              # React source code
│   ├── components/   # Reusable React components
│   ├── pages/        # Page components including Home_clean.jsx (main implementation)
│   ├── App.jsx       # Main application component
│   └── index.js      # Application entry point
└── README.md         # Project documentation
```

