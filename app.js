const express = require('express');
const morgan = require('morgan');

const app = express();
 
app.use(morgan('dev'));
app.use(express.json());
 
app.get('/', function (req, res) {
    res.json({
        message: 'Hello Sakila Backend!'
    });
});

app.use('/api/actors', require('./routes/actor.route'));
app.use('/api/customers', require('./routes/customer.route'));

const PORT = 3000;
app.listen(PORT, function(){
    console.log(`Sakila Backend is running at http://localhost:${PORT}`);
});