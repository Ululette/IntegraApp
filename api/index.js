const { default: axios } = require("axios");
const server = require("./src/app.js");
const { conn, Type } = require("./src/db.js");
const { BASE_URL } = require("./constants");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  console.log("connection to database successful");
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    // const typesFromApi = axios.get(`${BASE_URL}/type`);
    // Promise.all([typesFromApi])
    //   .then((types) => {
    //     const typesToBeCreated = [];
    //     for (let i = 0; i < types[0].data.results.length; i++) {
    //       typesToBeCreated.push({
    //         id: i + 1,
    //         name: types[0].data.results[i].name,
    //       });
    //     }
    //     Type.bulkCreate(typesToBeCreated).then(() => {
    //       console.log("Types from API created succesfully");
    //     });
    //   })
    //   .catch(() => console.error("Types from API were not created"));
  });
});