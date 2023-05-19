# learn-k8s
This project is about learning Kubernetes.

## Table of Content
* [Prerequisite](#prerequisite)
* [Getting started](#getting-started)
* [Postman Collection](#postman-collection)
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

## Postman Collection

Check the `docs` folder.

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

curl --location 'http://0.0.0.0:3000'

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

When the app is live.

```
GET /liveness
Host: 0.0.0.0:3000

curl --location 'http://0.0.0.0:3000/liveness'

Response: 
Status: 200 Content-Type: application/json
Body:
{
    "data": {
        "message": "I am live!"
    }
}
```

When the app is not live.

```
GET /liveness
Host: 0.0.0.0:3000

curl --location 'http://0.0.0.0:3000/liveness'

Response:
Status: 500 Content-Type: application/json
Body:
{
    "data": {
        "message": "I am not live!"
    }
}
```

### Readiness

Use this for **readinessProbe** in Kubernetes.

When the app is ready.

```
GET /readiness
Host: 0.0.0.0:3000

curl --location 'http://0.0.0.0:3000/readiness'

Response:
Status: 200 Content-Type: application/json
Body:
{
    "data": {
        "message": "I am ready!"
    }
}
```

When the app is not ready.

```
GET /readiness
Host: 0.0.0.0:3000

curl --location 'http://0.0.0.0:3000/readiness'

Response:
Status: 500 Content-Type: application/json
Body:
{
    "data": {
        "message": "I am not ready!"
    }
}
```

### Readiness: make unhealthy

This API will make the pod readiness unhealthy. Pass the TTL in seconds.

```
Request:
{
  "data": {
    "ttl": 100
  }
}
```

Default ttl: 60 seconds.

```
GET /readiness/make/unhealthy
Host: 0.0.0.0:3000

curl --location --request PUT 'http://0.0.0.0:3000/readiness/make/unhealthy' \
--header 'Content-Type: application/json' \
--data '{
    "data": {
        "ttl": 10
    }
}'

Response:
Status: 200 Content-Type: application/json
Body:
{
    "data": {
        "message": "I am unhealthy!"
    }
}
```

### Version
```
GET /version
Host: 0.0.0.0:3000

curl --location 'http://0.0.0.0:3000/version'

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

### Metadata
```
GET /metadata
Host: 0.0.0.0:3000

curl --location 'http://0.0.0.0:3000/metadata'

Response:
Status: 200 Content-Type: text/plain
Body:
{
    "data": {
        "os": "darwin",
        "hostname": "Yusufs-MacBook-Pro-2.local",
        "uptime": {
            "unit": "sec",
            "quantity": "891910"
        },
        "memory": {
            "unit": "bytes",
            "quantity": "17179869184"
        },
        "cpus": [
            {
                "model": "Apple M1 Pro",
                "speed": 24,
                "times": {
                    "user": 99240520,
                    "nice": 0,
                    "sys": 57942390,
                    "idle": 219834960,
                    "irq": 0
                }
            }
        ]
    }
}
```

### Metrics
```
GET /metrics
Host: 0.0.0.0:3000

curl --location 'http://0.0.0.0:3000/metrics'

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