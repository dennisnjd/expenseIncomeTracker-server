import express from 'express';  // Use ES Module import
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';

const app = express();

const PORT = 3000;

//middleware to parse json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes
app.get('/',(req,res) => {
    res.send('hello world');
});

app.use('/auth',authRouter)


connectDB(); // Connect to MongoDB

 
// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});