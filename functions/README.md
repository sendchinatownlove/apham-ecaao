

each of the functions in the below are parallel functions / and are logically seperate below

## local 
have java installed, it will run a local mirror so you can test.
```
brew install java
# with firebase CLI
firebase emulators:start
```

## deploy 
```
# deploy all
# firebase deploy --only functions
# firebase deploy --only functions:api-router
# firebase deploy --only functions:generate-thumbnail
```

# https://firebase.google.com/docs/functions/typescript
# https://github.com/firebase/functions-samples/tree/main/generate-thumbnail
# https://firebase.google.com/docs/functions/organize-functions#managing_multiple_source_packages_monorepo


## Database

creating and configuring a database for us to access
```
# creating a database instance for dev
firebase init database
firebase database:instances:create dev
firebase functions:config:set database.url="https://scl-scavengerhunt.firebaseio.com"

## helpful functions
firebase functions:list
firebase database:instances:list


## check instance here for example

```