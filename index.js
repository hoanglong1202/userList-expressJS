const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const userRoute = require('./router/user.router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'pug');
app.set('views', './view');

app.get('/', function (req, res) {
    res.render('index', {
        name: 'Accel'
    });
});

app.use('/users', userRoute);

app.listen(3000, function () {
    console.log('server is start on port');
});