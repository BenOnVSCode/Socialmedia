import React from 'react'
import { Circle, Container } from './style/Loading'

const Loading = () => {

    const spinTransition = {
        loop: Infinity,
        duration: 1,
        ease: 'linear'
    }
    return (
        <Container>
            <Circle animate={{rotate: 360}} transition={spinTransition}/>
        </Container>
    )
}

export default Loading
