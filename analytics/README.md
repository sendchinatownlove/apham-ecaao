# Script for Engagement Analysis

Script for running analysis on users data in firebase realtime database.

## Setup
1. get the latest data from the realtime database: https://console.firebase.google.com/u/0/project/scl-scavengerhunt/database/scl-scavengerhunt-default-rtdb/data
    - click three vertical dots in upper right corner and select "export JSON"
2. move JSON file to `analytics` folder: make sure it has the name `scl-scavengerhunt-default-rtdb-export.json`
3. run the following:
    ```
    cd analytics
    npm install
    npm run start
    ```