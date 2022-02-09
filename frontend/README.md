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
file is stored at [plugin-assets/manifest.json](../plugin-assets/manifest.json)  
after adjusting the manifest.json file run:  
```
npm run package
```

follow the instructions on how to deploy your app:  
https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/apps-upload

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
