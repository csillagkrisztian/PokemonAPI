const getPokemonStats = (response) => {
  const {
    abilities,
    height,
    name,
    sprites,
    weight,
    stats,
    types,
  } = response.data;

  const pokemonAbilities = abilities.map(({ ability }) => {
    return ability.name;
  });

  const pokemonStats = stats.reduce((base, next) => {
    if (!base.hp) {
      const objectKeys = Object.values(base);
      const statObject = {
        [objectKeys[2].name]: objectKeys[0],
      };
      return {
        ...statObject,
      };
    } else {
      const itemKeys = Object.values(next);
      const itemStatObject =
        itemKeys[2].name === "special-attack"
          ? {
              specialAttack: itemKeys[0],
            }
          : itemKeys[2].name === "special-defense"
          ? {
              specialDefence: itemKeys[0],
            }
          : {
              [itemKeys[2].name]: itemKeys[0],
            };
      return { ...base, ...itemStatObject };
    }
  });

  const pokemonTypes = types.map(({ type }) => type.name);
  return {
    name,
    image: sprites.other["official-artwork"]["front_default"],
    types: pokemonTypes,
    abilities: pokemonAbilities,
    stats: pokemonStats,
    height,
    weight,
  };
};

module.exports = getPokemonStats;
