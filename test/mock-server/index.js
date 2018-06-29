import mockValidCertificate from '../fixtures/valid-certificate-example';
import mockInvalidCertificate from '../fixtures/invalid-certificate-example';
const express = require('express');
const app = express();

app.get('/to/certificate', (req, res) => res.send(mockValidCertificate));
app.get('/to/certificate/invalid', (req, res) => res.send(mockInvalidCertificate));

app.listen(3001, () => console.log('mock server started on port 3001!'));
