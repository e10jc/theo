import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import * as isNode from 'detect-node'
import Head from 'next/head'
import fetch from 'node-fetch'
import {Component} from 'react'
import {ApolloProvider, getDataFromTree} from 'react-apollo'

const initApollo = (initialState = {}) => (
  new ApolloClient({
    link: new HttpLink({
      fetch,
      uri: 'http://localhost:3000/graphql'
    }),
    cache: new InMemoryCache().restore(initialState),
    ssrMode: isNode
  })
)

export default ComposedComponent => (
  class WithApollo extends Component {
    client: ApolloClient<any>

    static displayName = 'WithApollo'

    static async getInitialProps (ctx) {
      const composedInitialProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {} 
      const client = initApollo()

      await getDataFromTree(
        <ComposedComponent ctx={ctx} {...composedInitialProps} />, {
          router: {
            asPath: ctx.asPath,
            pathname: ctx.pathname,
            query: ctx.query
          },
          client
        }
      )

      if (!isNode) {
        Head.rewind()
      }

      return {
        serverState: {
          apollo: {
            data: client.cache.extract()
          }
        },
        ...composedInitialProps
      }
    }

    constructor (props) {
      super(props)
      this.client = initApollo(props.serverState.apollo.data)
    }

    render () {
      return (
        <ApolloProvider client={this.client}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }  
  }
)