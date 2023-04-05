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
```
cp app/env_template # 
cd app
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
