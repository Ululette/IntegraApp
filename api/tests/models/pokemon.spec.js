const { Pokemon, Type, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Pokemon model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Pokemon.create({})
          .then(() => done(new Error("It requires a valid name")))
          .catch(() => done());
      });
      it("should work when its a valid name", () => {
        Pokemon.create({ name: "Pikachu" });
      });
      // it("should not work when it is a Pokemon with a name already in use", () => {
      //   Pokemon.create({ name: "Pikachu" })
      //     .then(() =>
      //       done(
      //         Pokemon.create({
      //           name: "Pikachu",
      //           image:
      //             "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
      //           hp: 12,
      //           attack: 33,
      //           defense: 33,
      //           speed: 44,
      //           height: 55,
      //           weight: 66,
      //           types: [1, 3],
      //         })
      //       )
      //     )
      //     .catch(() => done());
      // });
    });
  });
  describe("type", () => {
    it("should throw an error if type is already created", (done) => {
      Type.create({ id: 20, name: "shadow" })
        .then(() => done(new Error("Type already created")))
        .catch(() => done());
    });
  });
});
