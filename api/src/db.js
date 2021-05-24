require("dotenv").config(); // The dotenv is a zero-dependency module that loads environment variables from a . env file into process. env . Storing configuration in the environment separate from code is based on the Twelve-FType App methodology.
const { Sequelize } = require("sequelize");
const fs = require("fs"); // js file system module allows you to work with the file system on your computer.
const path = require("path"); // The path module provides utilities for working with file and directory paths.
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries // https://futurestud.io/tutorials/sequelize-disable-sql-query-logging
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed // https://sequelize.org/v3/docs/usage/ // A flag for using a native library or not. In the case of 'pg' -- set this to true will allow SSL support. - default: false // https://www.ssl.com/faqs/faq-what-is-ssl/
  }
);

const basename = path.basename(__filename); // https://nodejs.org/api/path.html#path_path_basename_path_ext  // https://www.tutorialspoint.com/nodejs/nodejs_global_objects.htm#:~:text=The%20__filename%20represents%20the,path%20to%20that%20module%20file.

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models")) // https://www.geeksforgeeks.org/node-js-fs-readdirsync-method/
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Orders } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

// https://sequelize.org/master/manual/assocs.html#many-to-many-relationships
// https://bezkoder.com/sequelize-associate-many-to-many/

// relationships

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
