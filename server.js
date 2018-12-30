const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('/'));
app.use('/', express.static(path.join(__dirname)));
app.get('/', (req, res) => res.sendfile('index.html'));
app.get('/list', (req, res) => fs.readdir('./img', (err, files) => res.send(files)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));