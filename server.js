'use strict';
const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World Discover Cars');
});

app.get('/api/environment', (req, res) => {
    const env = Object.entries(process.env);
    let String = '';  
    for (const [key, value] of env) {
      String += `${key}: ${value}<br>`;
    }  
    res.send(String);
  });

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
