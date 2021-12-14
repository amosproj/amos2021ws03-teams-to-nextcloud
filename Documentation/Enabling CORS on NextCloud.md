# Enabling CORS on NextCloud

This documentation has the following structure:

0. Prerequisites
1. A brief explanation
2. Dealing with simple requests
3. Dealing with "preflight" requests

## 0. Prerequisites

A good undersanding of the following guide is required to know exactly what we are doing here: [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

## 1. A brief explanation

Basically the problem lies in loading resources from a different origin than the one we are currently at. For example let's say that our frontend webapp is running on `https://tms2nc.de/` and our NextCloud server on `https://nextcloud.tms2nc.de/`. When our webapp wants to make a request to the NextCloud server, the browser sees that it has a different origin that the one currently loaded (our frontend). When this happens CORS is the mechanism, which is supposed to control the process of resource loading. There are two types of requests: simple and "preflighted" requests:

1. The simple requests are triggered when we want to read a resource from the different origin. If the webserver doesn't explicitly specify that it allows cross-origin requests from our current origin (`https://tms2nc.de/`) the browser will automatically block all of these requests.

2. "Preflighted" requests are done when we want to do an operation to the resource that can eventually change it's state. In that case the browser first sends a "preflighted" request, basically asking the webserver if it will allow the operation to be executed. And if the server allows it, only then the browser sends the real request.

By default the NextCloud webserver is not configured to allow cross-origin requests, so we have to configure it ourselves.

## 2. Dealing with simple requests

Dealing with simple requests boils down to setting up the right HTTP request/response headers, which the browser expects to see. More details are provided in the guide, listed in the prerequisites. All we need to do to make this work, is configure our apache webserver to set up the right headers. For this add the following lines to the `.htaccess` file in the apache root directory (`/var/www/html`):

```
Header always add Access-Control-Allow-Origin "https://tms2nc.de"
Header always add Access-Control-Allow-Headers "Authorization, Origin, X-Requested-With, Content-Type, Accept, DNT, X-CustomHeader, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Range, Range, Depth, Destination"
Header always add Access-Control-Allow-Methods "GET, HEAD, POST, PUT, OPTIONS, MOVE, DELETE, COPY, LOCK, UNLOCK, PROPFIND, MRCOL"
Header always add Access-Control-Allow-Credentials "true"
```

where `https://tms2nc.de` is the address of our frontend. After that make sure to activate the apache module headers:

```
a2enmod headers
```

Source: [Header set Access-Control-Allow-Origin in .htaccess doesn't work](https://stackoverflow.com/questions/10640596/header-set-access-control-allow-origin-in-htaccess-doesnt-work/11691776#11691776)

## 3. Dealing with "preflight" requests
 
 For the "preflight" requests, we just have to configure our webserver to respond with a 204 to the HTTP OPTIONS request, which checks if the webserver will allow the action. We can achieve this by using the rewrite in the same `.htaccess` file and adding the following lines:

```
RewriteEngine On
RewriteCond %{REQUEST METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [L,R=204]
```

Source: [Return empty response from Apache](https://stackoverflow.com/questions/27703871/return-empty-response-from-apache/)
