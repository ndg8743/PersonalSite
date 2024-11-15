const express = require('express');
const app = express();
app.use(express.json());

// Importing route modules
const userRouter = require('./server/routes/user');
const projectRouter = require('./server/routes/project');
const commentRouter = require('./server/routes/comment');

// CORS Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Route Handling
app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/comment', commentRouter);

// Server Setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
