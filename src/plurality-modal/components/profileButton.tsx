import React from 'react'
import { Button } from 'antd'
import styled from 'styled-components'

interface ButtonCustomizations {
    minWidth?: string
    height?: string
    borderRadius?: string
    backgroundColor?: string
    color?: string
    hoverBackgroundColor?: string
    hoverTextColor?: string
    marginTop?: string
}

interface ProfileButtonProps {
    handleClick: () => void
    customizations?: ButtonCustomizations
}

const SocialButtonWrapper = styled(Button) <ButtonCustomizations>`
  min-width: ${props => props.minWidth || '180px'};
  height: ${props => props.height || '40px'};
  border-radius: ${props => props.borderRadius || '10px'};
  border: none;
  background-color: ${props => props.backgroundColor || '#ACACAC'};
  color: ${props => props.color || '#fff'};
  margin-top: ${props => props.marginTop || '0.5rem'};
  transition: background-color 0.8s ease;
  
  &:hover {
    background-color: ${props => props.hoverBackgroundColor || '#000000'} !important;
    color: ${props => props.hoverTextColor || '#fff'} !important;
  }
`

const ProfileButton = ({
    handleClick,
    customizations
}: ProfileButtonProps) => {

    return (
        <SocialButtonWrapper
            type="default"
            onClick={handleClick}
            {...customizations}
        >
            Connect Profile
        </SocialButtonWrapper>
    )
}

export default ProfileButton
