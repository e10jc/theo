import {makeExecutableSchema} from 'graphql-tools'

import {Theory} from './models'

const typeDefs = `
  type Theory {
    id: ID!
    title: String!
  }

  type Query {
    theory (id: Int!): Theory
    theories: [Theory]
  }

  type Mutation {
    createTheory (title: String!): Theory
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
    }
  },

  Query: {
    theories () {
      return Theory.query()
    },

    theory (_, args: {id: number}) {
      return Theory.query().findById(args.id)
    },
  }
}

export default makeExecutableSchema({resolvers, typeDefs})
