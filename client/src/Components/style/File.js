import styled from 'styled-components'
import { CloseIcon } from '@chakra-ui/icons'



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
    border-radius: 5px ;
`
export const PostImageContainer = styled.div ` 
    position: relative;
    width: 100% ;
    margin: 2rem 0 0 0 ;
`
export const RemovePostImgae = styled(CloseIcon) ` 
    position: absolute;
    top: -15px;
    right: -10px;
    cursor: pointer;
    background-color: #E53E3E;
    width: 30px ;
    height: 30px ;
    padding: 5px;
    border-radius: 50%;
    color: #fff ;
    border: 2px #fff solid;
`