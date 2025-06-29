const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Make sure cors is installed (npm install cors)

const app = express();

app.use(bodyParser.json()); // To parse JSON bodies
app.use(cors()); // To allow cross-origin requests

const PORT = process.env.PORT || 5000; // Server will run on port 5000 by default

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/studybuddy')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define the Subject Schema and Model
const subjectSchema = new mongoose.Schema({
    name: String,
    tasks: [
        {
            title: String,
            completed: Boolean
        }
    ]
});

const Subject = mongoose.model('Subject', subjectSchema); // Model name should typically start with a capital letter

// GET: to fetch all the subjects from the database
app.get('/api/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Error fetching subjects', error: error.message });
    }
});

// POST: to add a new subject to the database
app.post('/api/subjects', async (req, res) => {
    try {
        const { name, tasks } = req.body;
        // Basic validation: ensure 'name' is provided
        if (!name || name.trim() === '') {
            return res.status(400).json({ message: 'Subject name cannot be empty.' });
        }

        const newSubject = new Subject({
            name: name,
            tasks: tasks || [] // Ensure tasks is an array, default to empty if not provided
        });

        const savedSubject = await newSubject.save();
        res.status(201).json(savedSubject); // Respond with 201 Created status
    } catch (error) {
        console.error('Error saving new subject:', error);
        res.status(500).json({ message: 'Error saving subject to database', error: error.message });
    }
});

// DELETE: to delete subjects from the database
app.delete('/api/subjects/:id', async (req, res) => {

    try {
        console.log("Subject successfully deleted")
        const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
        res.json(deletedSubject);
    }
    catch (error) {

        console.error(error);
    }
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`);
});
