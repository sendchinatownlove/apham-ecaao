# APHAM-ECAAO

Monorepo for sendchinatownlove food scavenger hunt. 

preview @ https://scl-scavengerhunt.web.app/
firebase console @ https://console.firebase.google.com/u/2/project/scl-scavengerhunt


## Requirements
- google identity (gmail/googleworkspace email)
- node / npm 
- firebase cli 
- firebase permission to project `scl-scaventhunt` from @stanzheng 

## Development
``` # 
cd app
mv .env_template .env # get env values from #discord->engineering
npm run dev
# navigate http://localhost:5173/
```


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