const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send(`
        <html>
            <head><title>Home</title></head>
            <body>
                <h1>Welcome to CADT</h1>
                <p>We love node.js</p>
            </body>
        </html>
    `);
});

app.get('/about', (req, res) => {
return res.send(`
        <html>
            <head><title>About</title></head>
            <body>
                <h1>About Us</h1>
                <p>At CADT, we love node.js</p>
            </body>
        </html>
    `);
});

app.get('/contact-us', (req, res) => {
    return res.send(`
        <html>
            <head><title>Contact Us</title></head>
            <body>
                <h1>Contact Us</h1>
                <p>You can reach us via email</p>
            </body>
        </html>
    `);
});

app.get('/products', (req, res) => {
    return res.send(`
        <html>
            <head><title>Product</title></head>
            <body>
                <p>Buy one get one</p>
            </body>
        </html>
    `);
});

app.get('/projects', (req, res) => {
    return res.send(`
        <html>
            <head><title>Projects</title></head>
            <body>
                <p>Here are our awesome projects</p>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
})