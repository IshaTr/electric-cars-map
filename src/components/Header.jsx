import React from 'react'
import styled from 'styled-components'
import Flex from './common/Flex'
import Logo from '../images/deed-logo.png'

const Container = styled(Flex)`
  padding: 0.5rem 1rem;
  z-index: 99;
`

const LogoWrapper = styled.div`
  background: ${(props) => `url(${props.src})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 50px;
  width: 50px;
`

const Header = (props) => (
  <Container
    justify="space-between"
    alignItems="center"
    width="100%"
    bgColor="#000"
    position="fixed"
  >
    <LogoWrapper src={Logo} />
  </Container>
)

export default Header
