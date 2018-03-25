import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import Layout from '../components/layout'
import WithApollo from '../lib/with-apollo'

const Home = ({data}) => (
  <div>
    <h2>Theories</h2>
    <ul>
      {data.theories && data.theories.map(theory => (
        <li key={theory.id}>
          {theory.title}
        </li>
      ))}
    </ul>
  </div>
)

const HomeGQL = graphql(gql`
  {
    theories {
      id
      title
    }
  }
`)(Home)

const HomeLayout = () => (
  <Layout>
    <HomeGQL />
  </Layout>
)

export default WithApollo(HomeLayout)