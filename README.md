<h3 align="center"> TMS2NC </h3>
<p align="center">
<img align="center" src="https://user-images.githubusercontent.com/79105432/152644732-6bff09cf-7aec-40a2-8098-dee7abea120e.png" width="200" height="200"/>

# Product mission <br/>
Using the Teams to NextCloud plugin will provide the user with an alternative to the already built-in Sharepoint plugin for storing and managing data inside of Microsoft Teams. Users will be able to upload, download, modify data that is stored in NextCloud from inside of Teams as this is a core functionality of data management software. Additionaly, our plugin will enable the users to bind a shared folder to a specific channel, so that only the members of this channel will be able to see it and work on it.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

To test your locally running server within Teams start an [ngrok](https://ngrok.com/) tunnel
Copy the `https:` url inside the `manifest.json`
update the [.env](.env) file in the project root to include your current ngrok `https:` url.
Then upload your app to Teams.

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Package to an uploadable zip

Update the `manifest.json` file to include the public url of your Tab file (inside the `staticTabs` the property `contentUrl`)  
file is stored at [public/manifest.json](public/manifest.json)  
after adjusting the manifest.json file run:  
```
npm run package
```

follow the instructions on how to deploy your app:  
https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/apps-upload

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
