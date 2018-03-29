import gql from 'graphql-tag'
import {Component} from 'react'
import {Mutation} from 'react-apollo'

const mutation = gql`
  mutation ($title: String!) {
    createTheory (title: $title) {
      id
      title
    }
  }
`

interface Props {
  closePortal: () => void
}

interface State {
  theory: {
    title?: string
  }
}

const initialState = {
  theory: {
    title: ''
  }
}

export default class NewTheory extends Component<Props, State> {
  public readonly state = initialState

  public render () {
    const renderForm = createTheory => {
      const handleFormSubmit = e => {
        e.preventDefault()
        createTheory({variables: {title: this.state.theory.title}})
        this.setState(initialState)
      }

      return (
        <div>
          <form onSubmit={handleFormSubmit}>
            <input
              name='title'
              onChange={this.handleFormTitleChange}
              placeholder='Title'
              value={this.state.theory.title}
              type='text'
            />
            <button type='submit'>Submit</button>
          </form>

          <button onClick={this.props.closePortal}>Close</button>
        </div>
      )
    }

    return (
      <Mutation mutation={mutation}>
        {renderForm}
      </Mutation>
    )
  }

  private handleFormTitleChange = e => {
    const title = e.target.value
    this.setState(Object.assign({}, this.state, {theory: {...this.state.theory, title}}))
  }
}
