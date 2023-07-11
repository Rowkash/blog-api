## NestJS PostgreSQL Sequelize Docker

My simple server web API written in NestJS framework. PostgreSQL database is used for data storage. Sequelize is used to interact with the database

<table width="100%">
  <tr>
    <td align="center" valign="middle" width="25%">
      <a href="https://nestjs.com/">
        <img height="50" alt="NestJS" src="https://hsto.org/getpro/habr/post_images/d11/98b/ac8/d1198bac8e4ced0d89d5e5983061f418.png"/>
      </a>
      <br />
      NestJS
    </td>
    <td align="center" valign="middle" width="25%">
      <a href="https://www.postgresql.org/">
      <img height="50" alt="PostgresSQL" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/640px-Postgresql_elephant.svg.png"/>
      </a>
      <br />
      PostgresSQL
    </td>
    <td align="center" valign="middle" width="25%">
      <a href="https://sequelize.org">
      <img height="50" alt="Sequelize" src="https://sequelize.org/img/logo.svg"/>
      </a>
      <br />
      Sequelize
    </td>
    <td align="center" valign="middle" width="25%">
      <a href="https://www.docker.com/">
      <img height="50" alt="Docker" src="https://1000logos.net/wp-content/uploads/2021/11/Docker-Logo.png"/>
      </a>
      <br />
      Docker
    </td>
  </tr>
</table>

## Installation and launch methods

Copy repository

```shell
git clone https://github.com/Rowkash/blog-api.git
```
At the root of the repository, create a ".development.env" and ".production.env" files with the settings for connecting to the database and our JWT secret code. For example:

```shell
PORT=5000 # Port of our main app  
POSTGRES_HOST=localhost # (use "postgres" when running a project using Docker)
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=root
POSTGRES_DB=blog
JWT_SECRET=secret
```

* For production we use the settings file " .production.env ", for development we use " .development.env "

### Without Docker

- Install PostgreSQL on your computer from the official [site](https://www.postgresql.org/download/)
- Create server instance and database, add user and password as specified in .development.env file
- Make sure postgreSQL is up and running
- Open the project in the editor and install the dependencies

```shell

# yarn package manager
yarn install
yarn start ## (or "yarn start:dev" for development )

# npm package manager
npm install
npm run start ## (or "npm run start:dev" for development )

# pnpm package manager
pnpm install
pnpm run start ## (or "pnpm run start:dev" for development )
```

### With Docker

- Install Docker from the official [site](https://www.docker.com/)
- Run the command:

```shell
docker-compose up
# -d - to run in the background
# --build - to rebuild containers
```
