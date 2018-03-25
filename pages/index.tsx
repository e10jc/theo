import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import gql from 'graphql-tag'
import fetch from 'node-fetch'
import {ApolloProvider, graphql} from 'react-apollo'

const client = new ApolloClient({
  link: new HttpLink({fetch}),
  cache: new InMemoryCache()
})

const Layout = ({children}) => (
  <div>
    {children}
  </div>
)

const Home = ({data: {theories}}) => (
  <div>
    <h1>Theories</h1>
    <ul>
      {theories && theories.map(theory => (
        <li key={theory.id}>
          {theory.title}
        </li>
      ))}
    </ul>
  </div>
)

const WrappedHome = graphql(gql`
  {
    theories {
      id
      title
    }
  }
`)(Home)

export default () => (
  <ApolloProvider client={client}>
    <Layout>
      <WrappedHome />
    </Layout>
  </ApolloProvider>
)
