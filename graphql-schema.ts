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

  schema {
    query: Query
  }
`

const resolvers = {
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
