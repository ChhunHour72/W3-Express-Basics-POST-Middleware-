// server.js
const express = require('express');
const app = express();
const PORT = 3000;

//middleware for logging request
app.use((req,res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    next();
});

// Route handlers
    app.get('/',(req,res) => {
        res.send(`
            <html>
                <head><title>Home</title></head>
                <body>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a simple Node.js server.</p>
                </body>
            </html>
        `);
    });


    // About Page (GET /about)
    app.get('/about',(req,res) => {
        res.send(`
            <html>
                <head><title>About Us</title></head>
                <body>
                    <h1>About us: at CADT, we love node.js!</h1>
                </body>
            </html>
        `);
        });

    // Contact Page (GET /contact-us)
        app.get('/contact-us',(req,res) => {
        res.send(`
            <html>
                <head><title>Contact Us</title></head>
                <body>
                    <h1>You can reach us via email</h1>
                </body>
            </html>
        `);
        });

    // Products Page (GET /products)
        app.get('/products',(req,res) => {
        res.send(`
            <html>
                <head><title>Products</title></head>
                <body>
                    <h1>Buy one get one</h1>
                </body>
            </html>
        `);
        });

    // Projects Page (GET /projects)
        app.get('/projects',(req,res) => {
        res.send(`
            <html>
                <head><title>Projects</title></head>
                <body>
                    <h1>Here are our awesome projects</h1>
                </body>
            </html>
        `);
        });

    // 404 - Not Found (All other cases)
    app.use((req,res) => {
        res.status(404).send(`404 - Page Not Found`);
    });

app.listen(PORT, () => {
    console.log('Server is running at http://localhost:3000');
});
