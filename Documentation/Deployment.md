# Deployment

This documentation has the following structure:

0. Prerequisites
1. Technical details of the deployment
2. How to use

If you are not interested in the technical details you can skip to the last part of this document.

## 0. Prerequisites

In order to execute the deployment the following technologies need to be installed:

1. Docker - [Installation Guide](https://docs.docker.com/get-docker/)
2. Docker Compose [Installation Guide](https://docs.docker.com/compose/install/)
3. NodeJS and npm - for windows and linux use *nvm*, for mac use *n*

After installing docker, you need to checkout this repository and open the deployment folder. You can do this using the following commands:

```bash
git clone git@github.com:amosproj/amos2021ws03-teams-to-nextcloud.git
cd amos2021ws03-teams-to-nextcloud/deployment
```

**Important:** The deployment is created for deploying on a live instance with a public ip and a registered top level domain.

## 1. Technical Details

For the deployment we use docker compose with the following services:

**db**: This service is an instance of [MariaDB](https://hub.docker.com/_/mariadb). 
It uses a volume for persisting the data and creates a database and an user by using the *db.env* file.

**redis**: This service runs a [redis](https://redis.io), which is used by Nextcloud for caching.

**proxy** and **letsencrypt-companion** are the two services responsible for exposing the applications to the world.
The nginx proxy adds a proxy layer between Nextcloud and the internet. The proxy service uses the [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy) image,
which runs an nginx reverse proxy setup and automatically registers containers running on the same docker daemon
and routes traffic to them. It is designed to serve multiple sites on the same host machine.
The advantage in adding this layer is the ability to add a container for Let's Encrypt certificate handling. 
You can find more information also [here](https://github.com/nextcloud/docker/tree/master/.examples).

**app:** this services uses the [Nextcloud image](https://hub.docker.com/_/nextcloud), which is in turn based on the apache web server.
It is automatically registered to the reverse proxy using the environment variables mentioned in the next section.

**frontend:** this service runs our frontend. It is also registered to the reverse proxy.

## 2. How to use

As already mentioned the deployment setup is created using a docker compose file. 
Before starting the deployment you need to configure the properties for the containers.

### 2.1. Configuration
In the *docker-compose.yml* you need to set the following properites:

The **db** container is where the data base is running.
- *MYSQL_ROOT_PASSWORD* - set this to the password for the root user of the database

The **app** container represents the Nextcloud instance.

- *VIRTUAL_HOST* - set this to the domain name you are going to use
- *LETSENCRYPT_HOST* - set this to the domain name you are going to use
- *LETSENCRYPT_EMAIL* - set this to the email, to which the SSL certificate will be registed

The **frontend** container requires the same properties as the **app** container.

In the *db.env* file you need to set the following properties:

- *MYSQL_DATABASE* - the name of the database for the nextcloud app
- *MYSQL_USER* - the name of the database user for connecting to the database
- *MYSQL_PASSWORD* - the password for the user

In order for the containers to persistantly store the data on the host machine, you need to setup the *volumes* bindings
in the docker-compose file.

### 2.2. Building the frontend

In order to build the frontend you need NodeJS version 14^.

Open a terminal in the main directory of the repository.

To install the required pacakges run:
```bash
npm install
```

To build the frontend run:

```bash
npm run build
```

When the build is finished the frontend can be found in the *dist* folder. 
In the *docker-compose.yml* edit the volume in the frontend service, so that it points to the *dist* folder.

### 2.3. Starting the deployment

Once everything is set up, you can start the deployment using the following command:

```bash
docker-compose up -d
```

You should now be able to reach the Nextcloud instance and the frontend using the domains you have set up for them.