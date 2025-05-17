const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static('public')); // Serve static files

// Routes
app.get('/', (req, res) => {
    res.type('text').send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
    res.send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/contact', (req, res) => {
    const name = req.body.name?.trim();
    
    // Validation
    if (!name) {
        return res.status(400).send(`
            <h1>Error</h1>
            <p>Name cannot be empty!</p>
            <a href="/contact">Try again</a>
        `);
    }
    
    // Prepare submission
    const submission = { 
        name: name, 
        timestamp: new Date().toISOString() 
    };

    // File operations
    const filePath = path.join(__dirname, 'submissions.json');
    
    fs.readFile(filePath, 'utf8', (err, data) => {
        let submissions = [];
        if (!err && data) submissions = JSON.parse(data);
        
        submissions.push(submission);
        
        fs.writeFile(filePath, JSON.stringify(submissions, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file', err);
                return res.status(500).send(`
                    <h1>Error</h1>
                    <p>Failed to save submission</p>
                `);
            }
            
            // Confirmation page
            res.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Thank You!</title>
                    <style>body { font-family: Arial; text-align: center; padding: 50px; }</style>
                </head>
                <body>
                    <h1>Thank You, ${name}!</h1>
                    <p>Your submission has been saved.</p>
                    <a href="/contact">Submit another</a>
                </body>
                </html>
            `);
        });
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).type('text').send('404 Not Found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});