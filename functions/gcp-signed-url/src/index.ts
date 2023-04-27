import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();
require("dotenv").config();

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
        res.set("Access-Control-Allow-Origin", "*");

        switch (req.method) {
            case "POST":
                console.log(JSON.stringify(req.body));
                if (!req.body || !req.body["filename"] || !req.body["filetype"]) {
                    res.status(500).send({ message: "missing fields" });
                    break;
                }

                try {
                    const url = await generateV4UploadSignedUrl(req.body);
                    functions.logger.log("Successfully generated upload url");
                    res.status(200).send({ url: url });
                } catch (error) {
                    functions.logger.error("Error when generating upload url:", error);
                    res.status(500).send({ url: "", message: "server-side error when creating upload url" });
                }
                break;
            default:
                res.status(404).send({ message: "unsupported" });
        }
    });
});

/**
 * The actual call to the Google Storage SDK to generate a signed upload URL
 *
 * Can test locally by calling the function like:
 * generateV4UploadSignedUrl({filename: "testname.jpg", filetype: "image/jpg"});
 *
 * and then uploading like:
 * curl -X PUT -H 'Content-Type: ${fileInfo.filetype}' ` + `--upload-file my-file '${url}'
 *
 * @param fileInfo The file info tuple
 * @returns the Signed URL for upload
 */
async function generateV4UploadSignedUrl(fileInfo: fileInfoDTO) {
    const options = {
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: fileInfo.filetype,
    };

    const [url] = await storage.bucket(bucketName).file(fileInfo.filename).getSignedUrl(options);

    return url;
}
