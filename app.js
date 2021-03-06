const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT ?? 3000;
const mongouri = process.env.MONGO;

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.use(express.json());
app.use(express.static('./public'));
app.use(expressLayouts);
app.use(cookieParser());

if (process.env.NODE_ENV != 'production') {
    require('./utils/mw-dev')(app);
}

app.use(require('./routes/main'));
app.use(require('./routes/auth'));
app.use((req, res) => res.sendStatus(404));

mongoose.connect(mongouri).then(() => {
    app.listen(port, () => {
        console.log('Listening at port', port);
    });
});
