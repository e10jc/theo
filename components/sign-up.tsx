import gql from 'graphql-tag'
import {Component} from 'react'
import {Mutation} from 'react-apollo'

const mutation = gql`
  mutation ($email: String!, $password: String!) {
    createUser (email: $email, password: $password) {
      id
    }
  }
`

interface Props {
  closePortal: () => void
}

interface State {
  user: {
    email?: string,
    password?: string,
  }
}

const initialState = {
  user: {
    email: '',
    password: '',
  }
}

export default class SignUp extends Component<Props, State> {
  public readonly state = initialState

  public render () {
    const renderForm = createUser => {
      const handleFormSubmit = e => {
        e.preventDefault()
        createUser({
          variables: {
            email: this.state.user.email,
            password: this.state.user.password
          }
        })
        this.setState(initialState)
      }

      return (
        <div>
          <form onSubmit={handleFormSubmit}>
            <input
              name='email'
              onChange={this.handleFormEmailChange}
              placeholder='you@me.com'
              required={true}
              value={this.state.user.email}
              type='email'
            />
            <input
              name='email'
              onChange={this.handleFormPasswordChange}
              placeholder='password'
              required={true}
              value={this.state.user.password}
              type='password'
            />
            <button type='submit'>Submit</button>
          </form>

          <button onClick={this.props.closePortal}>Close</button>
        </div>
      )
    }

    return (
      <Mutation
        mutation={mutation}
        onCompleted={this.handleCompletedMutation}
      >
        {renderForm}
      </Mutation>
    )
  }

  private handleCompletedMutation = ({createUser: user}) => {
    console.log(user)
  }

  private handleFormEmailChange = e => {
    const email = e.target.value
    this.setState(Object.assign({}, this.state, {user: {...this.state.user, email}}))
  }

  private handleFormPasswordChange = e => {
    const password = e.target.value
    this.setState(Object.assign({}, this.state, {user: {...this.state.user, password}}))
  }
}
