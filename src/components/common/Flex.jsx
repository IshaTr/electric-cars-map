import styled from 'styled-components'

const Flex = styled.div`
  display: flex;
  justify-content: ${(props) => props.justify || 'unset'};
  align-items: ${(props) => props.alignItems || 'unset'};
  flex-direction: ${(props) => props.direction || 'unset'};
  width: ${(props) => props.width || 'unset'};
  background: ${(props) => props.bgColor || 'unset'};
  position: ${(props) => props.position || 'unset'};
`

export default Flex
