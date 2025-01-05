import React from 'react'
import { StyledDiv } from './styles'

interface TopLabelProps {
    children: React.ReactNode
}

const TopLabel = ({ children }: TopLabelProps) => {
    return (
        <StyledDiv>
            {children}
        </StyledDiv>
    )
}

export default TopLabel
