# Back End of Celebrity Recognization AI Single Page Application

[這個 SPA 中文的架構和說明](https://www.bdr.rocks/project/ai-%E6%98%8E%E6%98%9F%E8%BE%A8%E8%AD%98-spa-%E5%85%A8%E7%AB%AF%E5%B0%88%E6%A1%88/ "這個 SPA 中文的架構和說明")

This is the back-end open source code of CeleRec SPA, which can recognize celebrities.

[The source code of front end.](https://github.com/yellowful/celerec)

## Installation

You can download or clone this project from git hub.

```shell
    git clone https://github.com/yellowful/sbbackend.git
```

Install it:

```shell
    npm install
```

## Register

Sign up Clarifai for free to get an API key in advance.

## Setting

When you develop in your local environment, you could try variable command such as:

```shell
clarifaiApiKey=xxxxxxxxxxxxx node smartbrainbackend.js
```

When you deploy to your back end cloud platform such as Heroku, set the config variables `clarifaiApiKey`.

## Create Relational Database

Create two tables via [PostgreSQL](https://www.postgresql.org/):

users table：

```sql
CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);
```

login table:

```sql
CREATE TABLE login (
    id SERIAL PRIMARY KEY,
    hash VARCHAR(100) NOT NULL, 
    email TEXT UNIQUE NOT NULL,
);
```

## Run

Run the app when you are developing locally:

```shell
  npm run start:dev
```

## License

The code used for generating this web site are licensed as [MIT](./LICENSE "MIT").
