# Backend component of the median prime number(s) getter App

## Description
Node.js server that finds the median prime number(s) using the Sieve of Eratosthenes algorithm and returns array of results or an error.
There are also endpoints for loading the history of previous calculations and deleting all calculations from the history.

## Technologies used:
- Node.js;
- TypeScript;
- Express;
- Sequelize;
- Neon DB;
- Jest;

## How to work with. Steps:
1. Download or clone repository. `git clone git@github.com:Oleksandr-Filo/backend_component.git`.
2. Open project folder with code editor (VS Code, WebStorm, other).
3. Use a 14th version of Node.js.
4. Run ```npm install``` in terminal.
5. Run ```npm run sync-db``` in terminal in order to connect to DB.
6. Open second terminal and run ```npm start```.
7. Server is running on ```http://localhost:5000```.
