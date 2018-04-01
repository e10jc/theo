import {Component} from 'react'

const STORAGE_KEY = 'currentUser'

interface Props {
  currentUser?: {
    id: string
  }
}

export default ComposedComponent => (
  class WithCurrentUser extends Component<Props> {
    public static getInitialProps = async ctx => {
      const composedInitialProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps(ctx)
        : {}

      return {
        currentUser: ctx.req ? ctx.req.user : JSON.parse(localStorage.getItem(STORAGE_KEY)),
        ...composedInitialProps
      }
    }

    public componentDidMount () {
      if (this.props.currentUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.props.currentUser))
      }
    }

    public render () {
      return <ComposedComponent {...this.props} />
    }
  }
)
