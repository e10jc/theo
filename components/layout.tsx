import Link from 'next/link'
import {Component} from 'react'
import {Portal} from 'react-portal'
import styled from 'styled-components'

import NewTheory from './new-theory'

interface State {
  isNewTheoryPortalOpen: boolean
}

export default class Layout extends Component<any, State> {
  public readonly state = {
    isNewTheoryPortalOpen: false
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

  private handleOpenNewTheoryPortalButtonClick = () => {
    this.setState({isNewTheoryPortalOpen: true})
  }

  private handleCloseNewTheoryPortalButtonClick = () => {
    this.setState({isNewTheoryPortalOpen: false})
  }
}
