import mockCertificate from '../fixtures/certificate-example';
const express = require('express');
const app = express();

app.get('/to/certificate', (req, res) => res.send(mockCertificate));

app.listen(3001, () => console.log('mock server started on port 3001!'));
