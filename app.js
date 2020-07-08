const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const port = process.env.PORT || 3030;
const app = express();

app.use(bodyParser.json());

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});