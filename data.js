module.exports.queries = {}
module.exports.mutations = {}
module.exports.types = []
module.exports.typeMutations = []
module.exports.typeQueries = []
module.exports.addType = (typeDef) => {
  module.exports.types.push(typeDef)
}
module.exports.addQuery = (name, typeDef, resolver) => {
  module.exports.queries[name] = resolver
  module.exports.typeQueries.push(typeDef)
}
module.exports.addMutation = (name, typeDef, resolver) => {
  module.exports.mutations[name] = resolver
  module.exports.typeMutations.push(typeDef)
}