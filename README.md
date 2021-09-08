# Discover

App architeture: [link to whimsical](https://whimsical.com/discover-structure-FqAqf9DABN9RzzmPThEuWz)

# External dependencies

- Docker
- MySQL 8
- Prisma/Client to generate models
- Vs Code to run with devcontainer

# How to

## Create a model library

- Use the nx generator and give the name as : models-<name-of-database>

- After that, create a folder called **schema** under src

- Add 3 scripts inside package.json to:

  - Will update the prisma.schema with the database schema.
    - prisma-update-`<database-name>`: npx prisma db pull --schema=./libs/models/`<database-name>`/src/schema/schema.prisma,
  - Will generate the prisma cliente.
    - prisma-generate-`<database-name>`: prisma generate --schema=./libs/models/`<database-name>`/src/schema/schema.prisma,
  - Will create the migration
    - prisma-migrate-`<database-name>`: prisma migrate dev --create-only --schema=./libs/models/`<database-name>`/src/schema/schema.prisma

- Then create a nest service which will be used on the API'S and provides the connection

- The last step is to add an asset inside workspace.json for each project that used a prisma service
  - E.g.:
    ```json
      "options": {
        "outputPath": "dist/apps/atlas",
        "main": "apps/atlas/src/main.ts",
        "tsConfig": "apps/atlas/tsconfig.app.json",
        "assets": [
          "apps/atlas/src/assets",
          {
          "glob": "schema.prisma",
          "input": "libs/models/veritas/src/schema",
          "output": "."
          }
        ]
      },
    ```

## Create a nest module

There is a generator called `nest-module`. To use do:
`nx workspace-generator nest-module --app <name of the project>`

The command will generate the follow directory:

- /name
  - /providers
    - name.service.ts
  - /controllers
    - name.controller.ts
  - name.module.ts
