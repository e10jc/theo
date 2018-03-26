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
    cache: new InMemoryCache().restore(initialState),
    link: new HttpLink({
      fetch,
      uri: 'http://localhost:3000/graphql'
    }),
    ssrMode: isNode
  })
)

export default ComposedComponent => (
  class WithApollo extends Component {
    public static displayName = 'WithApollo'

    public static async getInitialProps (ctx) {
      const composedInitialProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps(ctx)
        : {}
      const client = initApollo()

      await getDataFromTree(
        <ComposedComponent ctx={ctx} {...composedInitialProps} />, {
          client,
          router: {
            asPath: ctx.asPath,
            pathname: ctx.pathname,
            query: ctx.query
          }
        }
      )

      if (isNode) {
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

    public client: ApolloClient<any>

    constructor (props) {
      super(props)
      this.client = initApollo(props.serverState.apollo.data)
    }

    public render () {
      return (
        <ApolloProvider client={this.client}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
)
