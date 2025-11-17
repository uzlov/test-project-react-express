# Dev tools wrapper

> Development container (and other tools)

## Getting started

Clone repo to `app` folder inside of current wrapper.
For full setup project:

```bash
$ make
```

Why do we need it? For simplify development process.

### Prerequisites

#### Start project

Full install-build of project.
Stop and start docker containers, start APP.
But, without update of containers images.

```bash
$ make
```

#### Stop project

Stop project containers.
Usable for development.

```bash
$ make stop
```

#### Start docker containers

As result, we should have started project containers.
Usable for development.

```bash
$ make up
```

#### Rebuild docker images and start project

Stop and start docker containers.
With update of containers images.
Need to use after some changes in docker configuration.

```bash
$ make rebuild
```

### Development

Please, check "Start project".
After that, open [localhost:8080](http://localhost:8080) in your browser.

