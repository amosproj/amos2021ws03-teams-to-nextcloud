## 0 Prerequisites

- [have a Microsoft Teams Tenant](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant)
- create a .zip of the following three files inside the [public](/public/) folder
  - [`manifest.json`](/public/manifest.json)
  - [`color.png`](/public/color.png)
  - [`outline.png`](/public/outline.png)

## 1 Upload App to Teams

There are multiple ways depending on how your Microsoft Teams Tenant is set up.

### 1.1 Sideloading

If you followed the instructions of the Prerequisites you can simply upload the [Developer Portal App](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/build-and-test/teams-developer-portal)  

This is for testing the app.

**Be sure sideloading is enabled, according to the documentation this can take up to 24 hours before being possible after enabling it**

Import the app from the Developer Portal App via the zip file

and edit the urls inside `Configure > App Features > Group and channel app`

Set the configuration url to the page where the frontend is uploaded `{base_url}/#/configuration`

Press the Preview in Teams button

### 1.2 Upload to Tenant directly 

for this to work the manifest.json file needs to be edited correctly  
set the following setting to the url where the frontend is hosted:
```json
...
 "configurableTabs": [
        {
            "configurationUrl": "https://the.frontend.url/#/configuration",
            ...
        }
    ],
...
```
**The url should point to the configuration page of the frontend located at `{base_url}/#/configuration`**

After that turn the three files from step 0 into a zip file again and upload these via the Button `Upload a custom App` on the app store page of your Teams Tenant.

![image](https://user-images.githubusercontent.com/16943959/143460375-095ea87b-6972-4570-aa45-a1f23064f8fe.png)

### 1.3 Add as Admin

[See this guide on how to allow direct upload to the org or teams](https://docs.microsoft.com/en-us/microsoftteams/upload-custom-apps#upload)


This is for release versions of this App  
set up the manifest.json file exactly as in **1.2**

Go to https://admin.teams.microsoft.com/policies/manage-apps

Press the Upload button on the App table and upload the .zip file.

After a bit of time the app should be available inside the Teams channels

## 2 Add to a channel

From a Team inside Teams click the + Button on the top of the channel

![image](https://user-images.githubusercontent.com/16943959/143462519-955fdf47-f3f3-453b-8879-7b6613c92a64.png)

Then search for `Nextcloud` and add the app 

A configuration page should appear after setting up the app press the save button and the Tab should now be added to your channel.

