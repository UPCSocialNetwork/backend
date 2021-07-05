# Express Typescript Backend

En aquest repositori es troba el backend de l'aplicació OnCampus.

### Estructura de directoris

```
+-- scripts
|   +-- dev.sh
|   +-- setup-github-actions.sh
|   +-- script.py
+-- src
|   +-- controllers
|   |   +-- grau
|   |   |   +-- add.ts
|   |   |   +-- getOne.ts
|   |   |   +-- getAll.ts
|   |   |   +-- update.ts
|   |   |   +-- delete.ts
|   |   |   +-- index.ts
|   |   +-- ...
|   +-- errors
|   |   +-- application-error.ts
|   |   +-- bad-request.ts
|   +-- lib
|   |   +-- console-logger
|   |   |   +-- index.ts
|   |   |   +-- winston-transport.ts
|   |   +-- safe-mongo-connection.ts
|   +-- middleware
|   |   +-- request-middleware.ts
|   |   +-- authentication.ts
|   |   +-- socket.ts
|   +-- models
|   |   +-- pluginst
|   |   |   +-- timestamp-plugin.ts
|   |   +-- Grau.ts
|   |   +-- ...
|   +-- public
|   |   +-- index.html
|   +-- app.ts
|   +-- mongo-connection.ts
|   +-- routes.ts
|   +-- server.ts
+-- .env.default
+-- .eslintrc.json
+-- .gitignore
+-- docker-compose.dev.yml
+-- docker-compose.yml
+-- Dockerfile
+-- jest.config.js
+-- LICENSE
+-- nodemon.json
+-- openapi.json
+-- package-lock.json
+-- package.json
+-- README.md
+-- tsconfig.json
```
