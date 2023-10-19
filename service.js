import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// data
import db from './_db.js'

// types
import { typeDefs } from './schema.js'

// resolvers
const resolvers = {
  Query: {
    questions() {
      return db.questions
    }, 
  }
}


// server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
  })
  
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
  })
  
  console.log(`Server ready at: ${url}`)


// const express = require("express");
// const app = express();
// app.use(express.json());

// const fs = require('fs');
// const data = fs.readFileSync('question.json');
// const items = JSON.parse(data);

// // To solve the cors issue
// const cors = require('cors');
// app.use(express.static('public'));
// app.use(cors());

// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// // GET request
// app.get('/api/items', (req, res) => {
//     res.send(items);
// });

// app.get('/api', (req, res) => {
//     res.send('This is my testing route..... ')
//   })

// //PORT ENVIRONMENT VARIABLE
// const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Listening on port ${port}..`));

