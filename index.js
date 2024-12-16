const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

// Middleware
app.use(express.json());

// Session Configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// Importing route modules
console.log("Loading route modules");
const userRouter = require('./server/routes/user');
const projectRouter = require('./server/routes/project');
const commentRouter = require('./server/routes/comment');
const adminRouter = require('./server/routes/admin');
console.log("Loaded route modules successfully");

// CORS Middleware - Only allow our frontend origin
app.use(function (req, res, next) {
    console.log(`${req.method} request for '${req.url}'`);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
    next();
});

// Authentication Middleware for Protected Routes
const authCheck = (req, res, next) => {
    if (req.session && (req.session.userId || req.session.adminId)) {
        next();
    } else {
        res.status(401).json({ message: 'Authentication required' });
    }
};

// Admin Check Middleware
const adminCheck = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

// API Route Handling
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/comment', authCheck, commentRouter); // Require auth for comments
app.use('/admin', adminRouter);

// Serve Static Frontend Files
app.use(express.static(path.join(__dirname, 'public')));

// Default Route to Serve HTML Files
app.get('*', (req, res) => {
    console.log(`Serving file: ${path.join(__dirname, 'public/html/index.html')}`);
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: process.env.NODE_ENV === 'production' 
            ? 'Internal server error' 
            : err.message
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found'
    });
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
