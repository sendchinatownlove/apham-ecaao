const functions = require("firebase-functions");
require("dotenv").config();
const admin = require("firebase-admin");
admin.initializeApp();

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

exports.airtable_proxy = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");

    /**
     * Set up caching -- cache the results of this function for 1 hour
     * This speeds up our front-end and avoids rate-limiting from AirTable
     * Our maximum daily requests with this are 48 (2 table queries * 24 hrs)
     * 
     * Shouldn't apply when locally emulating
     * 
     * https://firebase.google.com/docs/hosting/manage-cache
     */
    res.set("Cache-Control", "public, max-age=3600, s-maxage=3600");

    const { table } = req.query;
    const airtableURL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${table}`;

    const config = {
        headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
        },
    };

    try {
        let records = []

        functions.logger.log("Sending request to AirTable");
        let result = await fetch(airtableURL, config);
        result = await result.json();

        records.push(...result.records);

        if (result.offset) {
            let res2 = await fetch(airtableURL + `?offset=${result.offset}`, config);
            res2 = await res2.json();
            records.push(...res2.records);
        }

        res.status(200).send(records);
    } catch (err) {
        functions.logger.error("Error fetching results from AirTable", err);
        res.status(500).send(err);
    }
});
