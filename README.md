# Documentación de uso

## Requisitos

- Node.js
- Java

## Instalación

Instalar [AWS CLI](https://aws.amazon.com/es/cli/) y luego configurar una cuenta de AWS.

```bash
# Configure sus credenciales:
$ aws configure
# Instalación de Serverless
$ npm install -g serverless
# Instalando dependencias
$ npm install
```

## Ejecución de Serverless

```bash
# Ejecutar en local, Lambdas y DynamoDB
$ npm run build && serverless offline start
```
![My Image](capturas/ejecutando_local.png)


```bash
# Subir a producción
$ npm run build && serverless deploy
```
![My Image](capturas/ejecutando_prod.png)


## Ejecutar Documentación en Swagger

```bash
# Levantar documentación en el puerto 4000
$ npx ts-node src/swagger.ts
```
![My Image](capturas/ejecutando_swagger.png)

Luego ver documentación en: http://localhost:4000/api

![My Image](capturas/swagger.png)

## Pruebas unitarias
Para ejecutar pruebas sin problemas debe estar corriendo en local el Serverless
```bash
$ npm run test
```
![My Image](capturas/pruebas_unitarias.png)

## Extra

Documentación en [Postman](https://documenter.getpostman.com/view/11052226/VUjMoRFx)

https://documenter.getpostman.com/view/11052226/VUjMoRFx
