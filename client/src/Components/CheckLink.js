import { Spinner, Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { checkRecoveryLink } from '../redux/actions/auth'

const CheckLink = () => {
    const {email, code} = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(checkRecoveryLink({email, code}))
    }, [])
    return (
        <Flex w="100%" justifyContent="center" alignItems="center">
            <Spinner size="xl" color="red.400" />
        </Flex>
    
    )
}

export default CheckLink