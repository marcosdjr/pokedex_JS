const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3001;
//const port = 3001;

let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());


var pokedex = [
  {
    number: "1",
    name: "Bulbasaur",
    type: "Grama/Venenoso",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png",
    description: "Anfíbio quadrúpede bla bla bla bla bla",
    height: "71.1 cm",
    weight: "13 kg",
    category: "Seed",
    ability: "Overgrow",
  },
  {
    number: "2",
    name: "Ivysaur",
    type: "Grama/Venenoso",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/002.png",
    description: "Há um broto na parte de trás deste Pokémon.",
    height: "99.1 cm",
    weight: "13 kg",
    category: "Seed",
    ability: "Overgrow",
  },
  {
    number: "3",
    name: "Venusaur",
    type: "Grama/Venenoso",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/003.png",
    description: "Sua flor cresce quando absorve energia solar",
    height: "2.0 m",
    weight: "100 kg",
    category: "Seed",
    ability: "Overgrow",
  },
];


// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

app.get("/", (req, res) => {

  setTimeout(() => {
    message = "";
  }, 5000);

  res.render("index", {
    pokemon: pokedex,
    message
  }); 
});

app.get("/detalhes", (req, res) => {
  res.render("detalhes");
});

// app.post("/cadastro", (req, res) => {
//   const {number, name, type, image, description, height, weight, category, ability} = req.body;
//   res.send({number: number, name: name, type: type, image: image, description: description, height: height, weight: weight, category: category, ability: ability});
//   res.redirect("/")
// });

app.get("/cadastro", (req, res) => {
    
  res.render("cadastro");
});


// app.post("/sent", (req, res) => {
//   const { name, img, type } = req.body;
//   res.send({
//     name: name,
//     image: img,
//     type: type
//   });
//   //res.redirect("/")
// })


app.post("/pokedex", (req, res) => {
  const {
    number,
    name,
    type,
    image,
    description,
    height,
    weight,
    category,
    ability,
  } = req.body;
  const poke = {
    number: number,
    name: name,
    type: type,
    image: image,
    description: description,
    height: height,
    weight: weight,
    category: category,
    ability: ability,
  };

  pokedex.push(poke);
  res.redirect("/");

  message = "Pokémon inserido na Pokédex!!!";
});

app.get("/detalhes/:number", (req, res) => {
  res.render("detalhes", { pokemon: pokedex.filter(i => i.number === req.params.number), number: req.params.number });
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

