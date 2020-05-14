# apollo-entities

apollo-entities is a javascript library for dealing with graphql as entities.

## Installation

Install with npm
```bash
npm install apollo-entities
```

Install with yarn
```bash
yarn add apollo-entities
```

## Imports
```
const { init, addType, addMutation, addQuery } = require('apollo-entities')
```


## Usage
Simple setup

#### index.js
```
const apolloEntities = require('apollo-entities')
const { ApolloServer } = require('apollo-server');

// require all entities before calling init.
require('./entities/user')
const { typeDefs, resolvers } = apolloEntities.init()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```
#### './entities/user.js
```
const { addType, addQuery } = require('apollo-entities')

addType(`
  type User {
    name: String,
  }
`)

addQuery('getUser', 'getUser: User', () => ({ name: 'John doe' }))
```

The code above will produce the following result:

#### Query:
```
{
  getUser {name}
}
```
#### Result:
```
{
  "data": {
    "getUser": {
      "name": "John doe"
    }
  }
}
```

## Adding directives:
You can add directives when you call the init func.
```
const { typeDefs, resolvers } = apolloEntities.init(`
  directive @toOne on FIELD_DEFINITION
  directive @toMany on FIELD_DEFINITION
  directive @toManyMany on FIELD_DEFINITION
  directive @second on FIELD_DEFINITION
  directive @first on FIELD_DEFINITION
`)
```

## Entity functions:

### Add type
```
addType(`
  input LoginInput {
    email: String,
    password: String,
    token: String
  }

  type User {
    name: String,
  }
`)
```

### Add mutation
```
addMutation(name, typeDef, resolver)

addMutation('updateArticle', 'updateArticle(id: Int, input: UpdateArticleInput): Article', updateResolver)
```

### Add query
```
addQuery = (name, typeDef, resolver)

addQuery('articles', 'articles: [Article]', resolverReturningArticles)
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)