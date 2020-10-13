const express = require("express");
const app = express();
const axios = require("axios");
const getPokemonStats = require("./functions/getPokemonStats");
const { response } = require("express");
const PORT = process.env.PORT || 4000;

app.get("/", async (req, res, next) => {
  const pokemen = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=151`
  );
  console.log(pokemen.data);
  res.json(pokemen.data.results);
});

app.get("/pokemon/:id", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${req.params.id}`
    );
    const pokemonData = getPokemonStats(response);
    res.json(pokemonData);
  } catch (error) {
    console.log("error", error);
  }
});

app.get("/pokemon/name/:name", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${req.params.name}`
    );
    const pokemonData = getPokemonStats(response);
    res.json(pokemonData);
  } catch (error) {
    console.log("error", error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Listening at Port: ${PORT}`);
});
