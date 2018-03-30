import Link from 'next/link'
import {Component} from 'react'
import {Portal} from 'react-portal'
import styled from 'styled-components'

import NewTheory from './new-theory'
import SignUp from './sign-up'

interface State {
  isNewTheoryPortalOpen: boolean,
  isSignUpPortalOpen: boolean,
}

export default class Layout extends Component<any, State> {
  public readonly state = {
    isNewTheoryPortalOpen: false,
    isSignUpPortalOpen: false,
  }

  public render () {
    const Title = styled.h1`
      a {
        color: red;
      }
    `

    return (
      <div>
        <Title>
          <Link href='/'>
            <a>Theo</a>
          </Link>
        </Title>

        {this.props.children}

        {this.state.isNewTheoryPortalOpen && this.renderNewTheoryPortal()}

        <div>
          <button onClick={this.handleOpenNewTheoryPortalButtonClick}>New theory</button>
        </div>

        {this.state.isSignUpPortalOpen && this.renderSignUpPortal()}

        <div>
          <button onClick={this.handleOpenSignUpPortalButtonClick}>Sign up</button>
        </div>
      </div>
    )
  }

  public renderNewTheoryPortal () {
    return (
      <Portal>
        <NewTheory
          closePortal={this.handleCloseNewTheoryPortalButtonClick}
        />
      </Portal>
    )
  }

  public renderSignUpPortal () {
    return (
      <Portal>
        <SignUp
          closePortal={this.handleCloseSignUpPortalButtonClick}
        />
      </Portal>
    )
  }

  private handleOpenNewTheoryPortalButtonClick = () => {
    this.setState({isNewTheoryPortalOpen: true})
  }

  private handleOpenSignUpPortalButtonClick = () => {
    this.setState({isSignUpPortalOpen: true})
  }

  private handleCloseNewTheoryPortalButtonClick = () => {
    this.setState({isNewTheoryPortalOpen: false})
  }

  private handleCloseSignUpPortalButtonClick = () => {
    this.setState({isSignUpPortalOpen: true})
  }
}
