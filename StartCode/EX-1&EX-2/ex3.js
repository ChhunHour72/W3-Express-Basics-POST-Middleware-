const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('Welcome to the Home Page');
});

app.get('/contact', (req, res) => {
    return res.send(`
        <form method="POST" action="/contact">
            <input type="text" name="name" placeholder="Your name" required />
            <button type="submit">Submit</button>
        </form> 
    `);
});

app.post('/contact', (req, res) => {
    const name = req.body.name;
    fs.appendFile('submissions.json', JSON.stringify({ name }) + '\n', (err) => {
        if (err) {
            console.error('Error writing to file', err);
            return res.status(500).send('Error saving your submission');
        } else {
            console.log('Submission saved');
        }
        return res.send(`
            <html>
                <head><title>Submission</title></head>
                <body>
                    <h1>Thank you for your submission, ${name}</h1>
                    <p>Your submission has been saved.</p>
                </body>
            </html>
        `);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});