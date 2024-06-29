const { Client } = require('pg');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const con = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "login_cred"
});

const app = express();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const staticPath = path.join(__dirname, '../frontend');

app.use(express.static(staticPath, { index: "Login.html" }));
app.use(urlencodedParser);

con.connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch(err => console.error('Connection error', err.stack));

app.post("/login", (req, res) => {
    var { email, pass } = req.body;

    con.query('SELECT pass FROM admin WHERE email = $1', [email], (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send('Database query error');
        } else {
            if (result.rows.length > 0 && result.rows[0].pass === pass) {
                console.log('User exists:', result.rows);
                res.redirect(`/home.html?email=${email}`); // Redirect to home page with email parameter
            } else {
                console.log('Invalid credentials');
                res.redirect('/Login.html?error=invalid'); // Redirect to login page with error parameter
            }
        }
    });
});

app.get('/Login.html', (req, res) => {
    const errorMessage = req.query.error === 'invalid' ? 'Invalid credentials. Please try again.' : '';
    res.sendFile(path.join(staticPath, 'Login.html'));
});

app.post('/home', (req, res) => {
    const { email, pass } = req.body;

    con.query('INSERT INTO admin (email, pass) VALUES ($1, $2)', [email, pass], (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).send('Database insert error');
        } else {
            res.redirect(`/home.html?email=${email}`); // Redirect to home page with email parameter
        }
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); // Store uploads in 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename file with timestamp
    }
});

const upload = multer({ storage: storage });

app.post('/submit_form', upload.single('report'), (req, res) => {
    const { name, type, location, time, desc, ano } = req.body;
    const email = req.query.email; // Get the email from query parameters
    console.log(desc)
    const image = req.file ? req.file.buffer : null; // Handle image upload
    const currentDateTime = new Date();
    const reporting = currentDateTime.toISOString().split('T')[0];
    const currentTime = currentDateTime.toTimeString().split(' ')[0];

    const query = `
        INSERT INTO crime_reports (email, name, type_of_crime, date_of_crime, date_of_reporting, time_of_crime, time_of_report, description, image ,location)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    `;

    con.query(query, [email, name, type, reporting, reporting, time, currentTime, desc, image, String(location)], (err, result) => {
        if (err) {
            console.error('Error inserting crime report:', err);
            res.status(500).json({ error: 'Error inserting crime report' });
        } else {
            console.log('Crime report inserted successfully');
            res.json({ success: true });
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
