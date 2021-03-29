import React from 'react'
import styled from 'styled-components'

const Header = styled.h3``

const Wrapper = styled.div``

const Popup = ({ feature }) => {
  const { id, name, description } = feature.properties

  return (
    <Wrapper id={`popup-${id}`}>
      <Header>{name}</Header>
      {description}
    </Wrapper>
  )
}

export default Popup
