- nest new project-name
- nest generate library common(to share code between apps, it is monorepo)
- for validation joi (pnpm i joi)
- connect to mongodb (brew services start mongodb-community@6.0 )
- stop mongodb server (mongo) brew services stop mongodb-community@6.0
- create an app(nest g app app-name)
- create resource (nest g resource resource-name)
- for logging using pino (pnpm i nestjs-pino pino-http)
- we added whitelist to validation pipe to strip validated object of any properties that do not have any decorators. (main.ts)
- class transforms used to to transform date string to date object(createReservation.dto.ts)
- build docker file(docker build ../../ -f Dockerfile -t sleepr_reservations)
- run docker file(docker run -p 3000:3000 sleepr_reservations)
- run the docker compose yaml file(docker-compose up)

## Issues

- to get refresh token from the google api
  https://www.udemy.com/course/nestjs-microservices-build-deploy-a-scaleable-backend/learn/lecture/37165868#questions

- take a look on the mail not send issue
