import gql from 'graphql-tag'
import Link from 'next/link'
import {Query} from 'react-apollo'

import Layout from '../components/layout'
import WithApollo from '../lib/with-apollo'

const query = gql`
  {
    theories {
      id
      title
    }
  }
`

const Home = () => (
  <Layout>
    <Query query={query}>
      {({loading, error, data}) => {
        if (loading || error) return null
        
        return (
          <div>
            <h2>Theories</h2>
            <ul>
              {data.theories && data.theories.map(theory => (
                <li key={theory.id}>
                  <Link href={`/${theory.id}`}>
                    <a>{theory.title}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }}
    </Query>
  </Layout>
)

export default WithApollo(Home)