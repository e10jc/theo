import gql from 'graphql-tag'
import Link from 'next/link'
import {Query} from 'react-apollo'

import Layout from '../components/layout'
import WithApollo from '../lib/with-apollo'
import WithCurrentUser from '../lib/with-current-user'

const query = gql`
  {
    theories {
      id
      title
    }
  }
`

const renderTheory = theory => (
  <li key={theory.id}>
    <Link href={`/${theory.id}`}>
      <a>{theory.title}</a>
    </Link>
  </li>
)

const renderQuery = ({loading, error, data}) => {
  if (loading || error) {
    return null
  }

  return (
    <div>
      <h2>Theories</h2>
      <ul>
        {data.theories && data.theories.map(renderTheory)}
      </ul>
    </div>
  )
}

const Home = () => (
  <Layout>
    <Query query={query}>
      {({loading, error, data}) => renderQuery({loading, error, data})}
    </Query>
  </Layout>
)

export default WithCurrentUser(WithApollo(Home))
