const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

//
// all graphQL queries are going to his this one endpoint, see
// the schema.js for details
//
app.use('/graphql', expressGraphQL({
  schema: schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Server is running on port 4000...');
});
