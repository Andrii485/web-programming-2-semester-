const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Express is running!'));
app.listen(3000, '0.0.0.0', () => console.log('Listening on port 3000'));