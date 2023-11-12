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

take a look on the authentication expirations

- still struggling with this error

```
sleepr-reservations-1   | [Nest] 1163  - 11/12/2023, 5:48:21 PM   ERROR [ExceptionHandler] Nest can't resolve dependencies of the ReservationRepository (?, EntityManager). Please make sure that the argument ReservationModel at index [0] is available in the ReservationsModule context.
```
