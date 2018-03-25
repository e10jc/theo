import gql from 'graphql-tag'
import {Component} from 'react'
import {graphql, Query} from 'react-apollo'

import Layout from '../components/layout'
import WithApollo from '../lib/with-apollo'

const query = gql`
  query theory ($id: Int!) {
    theory (id: $id) {
      id
      title
    }
  }
`

class Theory extends Component {
  static async getInitialProps (ctx) {
    return {slug: ctx.query.slug}
  }

  render () {
    if (!this.props.slug) return null

    return (
      <Layout>
        <Query 
          query={query} 
          variables={{id: this.props.slug}}
        >
          {({loading, error, data}) => {
            if (loading || error) return null

            return JSON.stringify(data)
          }}
        </Query>
      </Layout>
    )
  }
}

export default WithApollo(Theory)