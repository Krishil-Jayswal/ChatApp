import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.json({
        message: 'Hello'
    });
});

app.listen(3000, ()  => {
    console.log('Server is running on port 3000.');
});
