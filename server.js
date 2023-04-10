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
    const arr = [];
  
    for (const [key, value] of env) {
      arr.push({ key, value });
    }
  
    const format = req.query.format || 'html';
    
    switch (format) {
        case 'html':
            const html_res = arr.map(({key, value}) => `<p>${key}: ${value}</p>`).join('');
            res.type('html').send(html_res);
            break;
        case 'json':
            res.type('json').send(arr);
            break;
        case 'xml':
            const xml = `<env>${arr.map(({key, value}) => `<${key}>${value}</${key}>`).join('')}</env>`;
            res.type('xml').send(xml);
            break;
        default:
            res.send(`Invalid format`);
    }
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
