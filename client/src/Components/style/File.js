import styled from 'styled-components'


export const FileWrap = styled.div ` 
    position: relative;
    margin: 1rem 0;
    width: 100% ;
    height: 40px ;
    border-radius: 5px ;
    background-color: #E2E8F0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FileBtn = styled.input ` 
    width: 100% ;
    height: 100% ;
    opacity: 0;
`

export const PostImage = styled.img ` 
    width: 100% ;
    height: 400px;
    object-fit: scale-down;
    margin: 1rem 0 0 0;
    border-radius: 5px ;
`