const mockValidCertificate = require('../fixtures/v2/valid-certificate-example.json');
const mockInvalidCertificate = require('../fixtures/v2/invalid-certificate-example.json');
const express = require('express');
const app = express();

app.get('/to/certificate', (req, res) => res.send(mockValidCertificate));
app.get('/to/certificate/invalid', (req, res) => res.send(mockInvalidCertificate));

app.listen(3001, () => console.log('mock server started on port 3001!'));
