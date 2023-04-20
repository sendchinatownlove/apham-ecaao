const functions = require('firebase-functions');
require('dotenv').config();
const admin = require('firebase-admin');
admin.initializeApp();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

exports.airtable_proxy = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const { table } = req.query;
  const airtableURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}`;

  const config = {
    headers: {
      Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  fetch(airtableURL, config)
    .then((res) => res.json())
    .then((data) => res.send(data.records))
    .catch((err) => res.status(500).send(err));
});
