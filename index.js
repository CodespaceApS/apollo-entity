const data = require('./data')
const { gql } = require('apollo-server')
// Require all entities

module.exports.addQuery = data.addQuery
module.exports.addMutation = data.addMutation
module.exports.addType = data.addType

module.exports.init = (func, directives = '') => {
  func()
  const resolvers = {}
  if (Object.keys(data.mutations).length > 0) {
    resolvers['Mutation'] = data.mutations
  }
  if (Object.keys(data.queries).length > 0) {
    resolvers['Query'] = data.queries
  }

  const typeDefs = `
  ${directives}
  ${data.types.join()}

  ${data.typeQueries.length > 0 ? `
  type Query {
    ${data.typeQueries.join(',')}
  }
  ` : ''}
  ${data.typeMutations.length > 0 ? `
  type Mutation {
    ${data.typeMutations.join(',')}
  }
  ` : ''}
  `
  console.log(typeDefs)
  console.log(resolvers)

  return { typeDefs: gql`${typeDefs}`, resolvers }
}
