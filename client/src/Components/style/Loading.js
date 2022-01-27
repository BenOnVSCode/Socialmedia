import styled from 'styled-components'
import  { motion } from 'framer-motion'

export const Container = styled.div ` 
    position: relative;
    width: 300px ;
    height: 100vh ;
    margin: 0 auto ;
    align-self: center;
    justify-self: center;
`

export const Circle = styled(motion.span) ` 
    display: block ;
    width: 300px ;
    height: 300px ;
    border: 2rem solid #e9e9e9;
    border-top: 2rem solid #F8333C;
    border-radius: 50% ;
    position: absolute;
    box-sizing: border-box;
    top: 30%;
    left: 0;
`