const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// EJS seadistus
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Staatiliste failide kaust
app.use(express.static(path.join(__dirname, 'public')));

// Loomade andmete lugemine JSON-failist
const dataPath = path.join(__dirname, 'data', 'loomad.json');
const animals = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Avaleht - viimased 4 lisatud looma
app.get('/', (req, res) => {
  const latestAnimals = animals.slice(-4);
  res.render('index', {
    title: 'Avaleht',
    animals: latestAnimals
  });
});

// Loomad - kõik loomad
app.get('/loomad', (req, res) => {
  res.render('animals', {
    title: 'Loomad',
    animals: animals
  });
});

// Meist
app.get('/meist', (req, res) => {
  res.render('about', {
    title: 'Meist'
  });
});

// Kontakt
app.get('/kontakt', (req, res) => {
  res.render('contact', {
    title: 'Kontakt'
  });
});

// 404 leht tundmatutele aadressidele
app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Lehte ei leitud'
  });
});

// Server käima
app.listen(PORT, () => {
  console.log(`Server töötab aadressil http://localhost:${PORT}`);
});

