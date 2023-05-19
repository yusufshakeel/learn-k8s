# learn-k8s
This project is about learning Kubernetes.

## Table of Content
* [Prerequisite](#prerequisite)
* [Getting started](#getting-started)
* [Localhost server](#localhost-server)
* [API endpoints](#api-endpoints)

## Prerequisite

This project depends on the following.

* NodeJS (v14 or higher)
* Docker (Optional. Needed only if you want to create docker image and run the project in a container.)

## Getting started

This is a NodeJS project. To get started, first install all the packages by running the following command in the terminal.

```shell
npm i
```

## Localhost server

To start the localhost server.

```shell
npm run start
```

## API endpoints

Check out the `docs` folder. It has the Postman collection.

### Home
```
GET /
Host: 0.0.0.0:3000

Response:
Status: 200 Content-Type: application/json
Body:
{
    "data": {
        "message": "Hello, World!"
    }
}
```

### Liveness

Use this for **livenessProbe** in Kubernetes.

```
GET /liveness
Host: 0.0.0.0:3000

Response: 
Status: 200 Content-Type: application/json
Body:
{
    "data": {
        "message": "I am alive!"
    }
}
```

### Readiness

Use this for **readinessProbe** in Kubernetes.

```
GET /readiness
Host: 0.0.0.0:3000

Response:
Status: 200 Content-Type: application/json
Body:
{
    "data": {
        "message": "I am ready!"
    }
}
```

### Version
```
GET /version
Host: 0.0.0.0:3000

Response:
Status: 200 Content-Type: application/json
Body:
{
    "data": {
        "version": "0.1.0"
    }
}
```

To change the version set the environment variable APPLICATION_VERSION=`semver`.

Example: `APPLICATION_VERSION=1.0.0`

### Metrics
```
GET /metrics
Host: 0.0.0.0:3000

Response:
Status: 200 Content-Type: text/plain
Body:
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.22259

more line follows...
```

## Tests

To run the test suite.

```shell
npm run test
```

## License

It's free :smiley:

[MIT License](https://github.com/yusufshakeel/learn-k8s/blob/main/LICENSE) Copyright (c) 2023 Yusuf Shakeel

## Donate

Feeling generous :smiley: [Donate via PayPal](https://www.paypal.me/yusufshakeel)