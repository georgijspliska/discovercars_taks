'use strict';
const express = require('express');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

function CheckColor(color,def) {
  const regex = /^#([0-9A-F]{3}){1,2}$/i;
  if (regex.test(color)) {
    return color;
  }
  return def;
}

app.get('/', (req, res) => {
    res.send('Hello World Discover Cars');
});

app.get('/api/environment', (req, res) => {
    const env = Object.entries(process.env);
    const arr = [];
    const bgColor = '#ZZZZZZ';  // <- Backgroud Color Here 
    const fgColor = '#ZZZZZZ';  // <- Foregroud Color Here 
  
    for (const [key, value] of env) {
      arr.push({ key, value });
    }
  
    const format = req.query.format || 'html';
    
    switch (format) {
        case 'html':
            const html_res = `
              <html>
                <head>
                  <style>
                    body {
                      background-color: ${CheckColor(bgColor,'#FFFFFF')};
                      color: ${CheckColor(fgColor,'#000000')};
                    }
                  </style>
                </head>
                <body>
                  ${arr.map(({key, value}) => `<p>${key}: ${value}</p>`).join('')}
                </body>
              </html>
            `;
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

app.get('/api/headers', (req, res) => {
  const headers = Object.entries(req.headers);
  const arr = [];
  const bgColor = '#ZZZZZZ';  // <- Backgroud Color Here 
  const fgColor = '#ZZZZZZ';  // <- Foregroud Color Here 

  for (const [key, value] of headers) {
    arr.push({ key, value });
  }

  const format = req.query.format || 'html';

  switch (format) {
    case 'html':
        const html_res = `
          <html>
            <head>
              <style>
                body {
                  background-color: ${CheckColor(bgColor,'#FFFFFF')};
                  color: ${CheckColor(fgColor,'#000000')};
                }
              </style>
            </head>
            <body>
              ${arr.map(({key, value}) => `<p>${key}: ${value}</p>`).join('')}
            </body>
          </html>
        `;
        res.type('html').send(html_res);
        break;
    case 'json':
        res.type('json').send(JSON.stringify(arr));
        break;
    case 'xml':
        const xml = `<head>${arr.map(({key, value}) => `<${key}>${value}</${key}>`).join('')}</head>`;
        res.type('xml').send(xml);
        break;
    default:
        res.send(`Invalid format`);
}

});


app.use('/api/post', (req, res) => {

  const method = req.method;

  if (method !== 'POST') {
    res.status(405).send('Method not allowed');
    return;
  }

  const body = Object.entries(req.body);
  const arr = [];
  const bgColor = '#ZZZZZZ';  // <- Backgroud Color Here 
  const fgColor = '#ZZZZZZ';  // <- Foregroud Color Here 

  for (const [key, value] of body) {
    arr.push({ key, value });
  }

  switch (format) {
    case 'html':
        const html_res = `
          <html>
            <head>
              <style>
                body {
                  background-color: ${CheckColor(bgColor,'#FFFFFF')};
                  color: ${CheckColor(fgColor,'#000000')};
                }
              </style>
            </head>
            <body>
              ${arr.map(({key, value}) => `<p>${key}: ${value}</p>`).join('')}
            </body>
          </html>
        `;
        res.type('html').send(html_res);
        break;
    case 'json':
        res.type('json').send(JSON.stringify(arr));
        break;
    case 'xml':
        const xml = `<body>${arr.map(({key, value}) => `<${key}>${value}</${key}>`).join('')}</body>`;
        res.type('xml').send(xml);
        break;
    default:
        res.send(`Invalid format`);
  }

});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});
