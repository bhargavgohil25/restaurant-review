# Contributing

## Getting Started

1. Submit an issue describing your proposed change.
2. Fork the repository on GitHub.
3. Clone the fork to your local setup.


## Installation

Clone the Repo :
```bash
$ git clone https://github.com/Bhargav252000/restaurant-review.git 
$ cd restaurant-review
```
To set up Frontend follow :
```bash
$ cd client
$ npm install
## To start the Frontend run
$ npm start
## This will start Frontend at http://localhost:3000
```
To set up Backend server follow :
```bash
$ cd ../server
$ npm install  
$ npm run server 
## By default the server will start at http://localhost:3005
```
To setup the backend follow :

- Install Postgres from [here](https://www.postgresql.org/download/) according to your preferred OS.
- Enter the postgresql by `psql -U postgres` , enter the password (w.r.t windows)
- Can be confirmed you are in PostgreSQL,  if you see `postgres=#` at start
- Create a Database with any name.
- Create a `.env` file and add all the required Information
- By default `port : 5432` , `user : postgres` , `host : localhost`
- Add a script `"migrate" : "node-pg-migrate"` in `package.json` file
- `npm run migrate create <NAME_OF_MIGRATION>` this will create a migration folder in server directory.
- Copy all the code from [here](https://github.com/Bhargav252000/restaurant-review/blob/master/server/migrations/1624872144540_all-tables-and-config.js) and add it in the newly file created in migrations.
- If you are windows user run `$env:DATABASE_URL="postgres://postgres:<YOUR_DATABASE_PASSWORD>localhost:5432/<DATABASE_NAME>"; npm run migrate up`


## Making Changes

* Create a branch : `git checkout -b branch-name`. Please avoid working directly on the `master` branch.
* Make commits of logical units.
* Make sure your commit messages are in the proper format.

## Submitting Changes

* Push your changes to the branch in your fork of the repository.
* Submit a pull request to the repository.
* The contributors look at Pull Requests and review them on a regular basis.