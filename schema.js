const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

/* hardcode data
const customers = [
  { id: '1', name: 'Althilus', email: 'a@blah.com', age: 25 },
  { id: '2', name: 'Lapse', email: 'l@blah.com', age: 26 },
  { id: '3', name: 'Mayple', email: 'm@blah.com', age: 24 },
  { id: '4', name: 'Dawn', email: 'd@blah.com', age: 25 }
];
*/

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        /*for (let i = 0; i < customers.length; i++) {
          if (customers[i].id == args.id) {
            return customers[i];
          }
        }*/
        return axios.get(`http://localhost:3000/customers/${args.id}`)
          .then(response => response.data);
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        //return customers;
        return axios.get('http://localhost:3000/customers').then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});