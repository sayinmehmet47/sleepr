#  Notes From the course

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
