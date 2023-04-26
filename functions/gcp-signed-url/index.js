const functions = require("firebase-functions");
require("dotenv").config();
const admin = require("firebase-admin");
admin.initializeApp();

const cors = require("cors")({
    origin: true,
});

// The ID of your GCS bucket
const bucketName = "scl-ecaao-tasks";

// Imports the Google Cloud client library
const { Storage } = require("@google-cloud/storage");

// Creates a client
const storage = new Storage();

exports.generateV4UploadSignedUrl = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const url = await generateV4UploadSignedUrl();
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json({ url: url });
    });
});

async function generateV4UploadSignedUrl() {
    const fileName = "test-file-name.png";

    // Will give us if it's png or jpeg
    contentType = fileName.split('.').pop();

    // These options will allow temporary uploading of the file with outgoing
    // Content-Type: application/octet-stream header.
    const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: "application/octet-stream",
    };

    // Get a v4 signed URL for uploading file
    const [url] = await storage.bucket(bucketName).file(fileName).getSignedUrl(options);

    console.log("Generated PUT signed URL:");
    console.log(url);
    console.log("You can use this URL with any user agent, for example:");
    console.log("curl -X PUT -H 'Content-Type: application/octet-stream' " + `--upload-file my-file '${url}'`);

    return url;
}
