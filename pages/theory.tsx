import gql from 'graphql-tag'
import {Component} from 'react'
import {Query} from 'react-apollo'

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

interface Props {
  slug?: string
}

class Theory extends Component<Props> {
  public static async getInitialProps (ctx) {
    return {slug: ctx.query.slug}
  }

  public render () {
    if (!this.props.slug) {
      return null
    }

    return (
      <Layout>
        <Query
          query={query}
          variables={{id: this.props.slug}}
        >
          {({loading, error, data}) => this.renderQuery({loading, error, data})}
        </Query>
      </Layout>
    )
  }

  private renderQuery = ({loading, error, data}) => {
    if (loading || error) {
      return null
    }

    return JSON.stringify(data)
  }
}

export default WithApollo(Theory)
