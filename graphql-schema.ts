import {makeExecutableSchema} from 'graphql-tools'

import {Theory, User} from './models'

const typeDefs = `
  type Theory {
    id: ID!
    title: String!
  }

  type User {
    id: ID!
  }

  type Query {
    theory (id: Int!): Theory
    theories: [Theory]
  }

  type Mutation {
    createTheory (title: String!): Theory
    createUser (email: String!, password: String!): User
  }

  schema {
    mutation: Mutation
    query: Query
  }
`

const resolvers = {
  Mutation: {
    createTheory (_, {title}) {
      return Theory.query().insertGraph({title})
    },

    createUser (_, {email, password}) {
      return User.query().insertGraph({email, password})
    },
  },

  Query: {
    theories () {
      return Theory.query()
    },

    theory (_, {id}) {
      return Theory.query().findById(id)
    },
  }
}

export default makeExecutableSchema({resolvers, typeDefs})
