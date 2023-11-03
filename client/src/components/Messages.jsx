import React from 'react'
import styled from 'styled-components'


const Messages = () => {
  return (
    <Container>Messages</Container>
  )
}

const Container = styled.div`
height: 80%;
@media (max-width: 600px) {
  width: 90%;
}
@media (min-width: 601px) and (max-width: 1024px) {
  width: 45%;
}
@media (min-width: 1025px) {
  width: 30%;
}
`;

export default Messages