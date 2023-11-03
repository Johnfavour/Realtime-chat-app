import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'

const Welcome = ({ currentUser }) => {
    return(
        <Container>
            <img src={Robot} alt="Robot" />
            <h1>
                Welcome, <span>{currentUser.username}!</span>
            </h1>
            <h3>Please select a chat to Start Messaging.</h3>
        </Container>
    );
};

const Container = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
color: white;
@media (max-width: 600px) {
    width: 90%;
}
@media (min-width: 601px) and (max-width: 1024px) {
    width: 45%;
}
@media (min-width: 1025px) {
    width: 30%;
}
img {
    height: 20rem;
}
span {
    color: #4e00ff;
}
`;

export default Welcome;