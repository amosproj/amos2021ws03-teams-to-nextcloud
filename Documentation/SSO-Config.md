# SSO Config

In order to facilitate the authentication to our Nextcloud instance we have setup a Single Sign On authentication using 
the Microsoft Azure Active Directory. Nextcloud itself provides the option to integrate Active Directory as Single Sign On.

## Configuration Guide

In order to properly configure the SSO we followed this [guide](https://medium.com/@ntrussell/enable-nextcloud-sso-authentication-through-microsoft-azure-active-directory-saml-abe37d735cd). 

In the guide there is at the time of writing one mistake. In **Step 2** when setting the *Identifier (Entity ID)* you should
set it to the following URL:

```bash
https://nextcloud.yourdomain.com/apps/user_saml/saml/metadata
```

**Important:** The SSO configuration requires a top level domain for your Nextcloud instance.

If you plan on using SSL with your Nextcloud instance then you should also set the following property in your *config/config.php*
which is located in the Nextcloud container:

```bash
'overwriteprotocol' => 'https'
```
