# APHAM-ECAAO

Monorepo for sendchinatownlove food scavenger hunt. 

preview @ https://scl-scavengerhunt.web.app/
firebase console @ https://console.firebase.google.com/u/2/project/scl-scavengerhunt


## Requirements
- google identity (gmail/googleworkspace email)
- node / npm 
- firebase cli 
- firebase permission to project `scl-scaventhunt` from @stanzheng 

## Setup
```
cd app
mv .env_template .env # get env values from #discord->engineering
npm install
```

## Local development
```
npm run dev
# navigate http://localhost:5173/
```

### Database/Functions

checkout [`database/README.md`](database/README.md) and [functions/README.md](functions/README.md)


## Deploy
```#deploy full domain
firebase deploy -p DEV 
# https://scl-scavengerhunt.web.app/
#deploy only your own preview branch 
firebase hosting:channel:deploy <preview_name>  
https://scl-scavengerhunt--stanleytest-svbu3p3w.web.app/
# https://scl-scavengerhunt--stanleytest-svbu3p3w.web.app/
```


## Steps to Generate Bundle
``` 
# https://egghead.io/blog/build-realtime-and-authenticated-apps-with-firebase-vite
npm i -g firebase-tools
firebase experiments:enable webframeworks
firebase login
firebase init emulators
``` 

## @TODO

just a list to get started, not inclusive. Linear is best up to date list of TODOs.git

Frontend
- CSS framework (tailscale still cool?)
- Analytics Toolings
  
- Backend
  - Firebase Database Modeling
  - firebase setup for backend 
  - AirTable <-->Firebase sync+editing
  - Image Upload / Management
- DEVOPS
  - Domain Setup for Production x.sendchinatownlove.com
  - Cost Planning / Billing
  - Terraform Setup Modeling for GCP resources / storage bucket etc

- Product/Social
  - Analytics / Reach 

```firebase hosting


  "functions": [
    {
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" install",
        "npm --prefix \"$RESOURCE_DIR\" run lint",
        "npm --prefix \"$RESOURCE_DIR\" run build"
      ],
      "source": "functions/api-router",
      "codebase": "api-router",
      "runtime": "nodejs18"
    },
    {
    "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" install",
        "npm --prefix \"$RESOURCE_DIR\" run lint",
        "npm --prefix \"$RESOURCE_DIR\" run build"
      ],
      "source": "functions/generate-thumbnail",
      "codebase": "generate-thumbnail",
      "runtime": "nodejs18"
    }
  ],
```