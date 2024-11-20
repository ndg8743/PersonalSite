const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
app.use(express.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Importing route modules
console.log("Loading route modules");
const userRouter = require('./server/routes/user');
const projectRouter = require('./server/routes/project');
const commentRouter = require('./server/routes/comment');
const adminRouter = require('./server/routes/admin');
console.log("Loaded route modules successfully");

// CORS Middleware
app.use(function (req, res, next) {
    console.log(`${req.method} request for '${req.url}'`);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// API Route Handling
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/comment', commentRouter);
app.use('/admin', adminRouter);

// Serve Static Frontend Files
app.use(express.static(path.join(__dirname, 'public')));

// Default Route to Serve HTML Files
app.get('*', (req, res) => {
    console.log(`Serving file: ${path.join(__dirname, 'public/html/index.html')}`);
    res.sendFile(path.join(__dirname, 'public/html/index.html'));
});

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}/`);
});