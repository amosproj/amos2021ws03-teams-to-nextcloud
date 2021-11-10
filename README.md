# amos2021ws03-teams-to-nextcloud

The AMOS Project of Group 03 
Teams Plugin for uploading files into Nextcloud

Built with Vuejs, Bootstrap-Vuejs
 
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

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
