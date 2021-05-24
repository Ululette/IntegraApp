/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  id: "e9c2583f-1a34-402f-b024-9d14b3419a75",
  name: "Pikachu",
  image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
  hp: 12,
  attack: 33,
  defense: 33,
  speed: 44,
  height: 55,
  weight: 66,
  types: [1, 3],
};

describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });
  describe("GET /pokemons?name=", () => {
    it("should get 200", () => agent.get("/pokemons?name=Pikachu").expect(200));
    it("should get 500", () =>
      agent
        .get("/pokemons?name=Pikachu5")
        .expect(
          "The name of Pokémon Pikachu5 was not found in the API or database."
        ));
  });
});
