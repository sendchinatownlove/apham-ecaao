import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
require("dotenv").config();

// For local testing (maybe not working?)
// const creds = require("../credentials.json");

// admin.initializeApp({
//     credential: admin.credential.cert(creds),
// });

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

type fileInfoDTO = {
    filename: string;
    filetype: string;
};

exports.generateV4UploadSignedUrl = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        // res.set("Access-Control-Allow-Origin", "*");

        switch (req.method) {
            case "POST":
                console.log(JSON.stringify(req.body));
                // if (!req.body || !req.body["filename"] || !req.body["filetype"]) {
                //     res.status(500).send({ message: "missing fields" });
                //     return;
                // }

                try {
                    const url = await generateV4UploadSignedUrl(req.body);
                    functions.logger.log("Successfully generated upload url");
                    res.status(200).send({ url: url });
                } catch (error) {
                    functions.logger.error("Error when generating upload url:", error);
                    // res.status(500).send({ url: "", message: "server-side error when creating upload url" });
                }
                return;
            default:
                // res.status(404).send({ message: "unsupported" });
        }
    });
});

async function generateV4UploadSignedUrl(fileInfo: fileInfoDTO) {
    const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: fileInfo.filetype,
    };

    const [url] = await storage.bucket(bucketName).file(fileInfo.filename).getSignedUrl(options);

    // Uncomment for local testing
    // console.log("Generated PUT signed URL:");
    // console.log(url);
    // console.log("You can use this URL with any user agent, for example:");
    // console.log(`curl -X PUT -H 'Content-Type: ${fileInfo.filetype}' ` + `--upload-file my-file '${url}'`);

    return url;
}

// Uncomment the following line to test locally
// generateV4UploadSignedUrl({filename: "testname.jpg", filetype: "image/jpg"});
