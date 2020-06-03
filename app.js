const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('common')); // let's see what 'common' format looks like
const apps = require('./apps-data.js');

app.get('/apps', (req, res) => {
  // ALL OUR CODE HERE
  let { search = "", sort } = req.query;

  if(search.toLowerCase()){
    if (!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(search)) { 
      return res.status(400).send("Search must be one of Action, Puzzle, Strategy, Casual, Arcade, Card");
    }
  }

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).send('Sort must be either "app" or "rating"');
    }
  }

  let results = apps
  .filter(app =>
    app.Genres.toLowerCase().includes(search.toLowerCase())
  );

  if (sort) {
    sort = sort.charAt(0).toUpperCase() + sort.slice(1);

    if(sort === 'App'){
      results.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
    }

    if(sort === 'Rating'){
      results.sort((a, b) => {
        return a[sort] < b[sort] ? 1 : a[sort] > b[sort] ? -1 : 0;
      });
    }
  }

    res.json(results);
});

module.exports = app;
