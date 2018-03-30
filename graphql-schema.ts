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

    async createUser (_, {email, password}, {ctx}) {
      const user = await User.query().insertGraph({email, password})

      if (user) {
        ctx.cookies.set('id', user.id, {signed: true})
      }

      return user
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
