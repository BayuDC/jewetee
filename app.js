const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT ?? 3000;
const mongouri = process.env.MONGO;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.use(express.static('./public'));
app.use(expressLayouts);

if (process.env.NODE_ENV != 'production') {
    require('./utils/dev-mw')(app);
}

app.get('/', (req, res) => res.render('index'));

mongoose.connect(mongouri).then(() => {
    app.listen(port, () => {
        console.log('Listening at port', port);
    });
});
