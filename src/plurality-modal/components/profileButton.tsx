import React from 'react'
import { Button, Skeleton } from 'antd'
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
    fontSize?: string
    fontFamily?: string
}

interface ProfileButtonProps {
    text?: string
    isLoading: boolean
    handleClick: () => void
    customizations?: ButtonCustomizations
}

const SocialButtonWrapper = styled(Button) <ButtonCustomizations>`
  min-width: ${props => props.minWidth || '180px'};
  height: ${props => props.height || '40px'};
  border-radius: ${props => props.borderRadius || '10px'};
  border: none;
  font-size: ${props => props.fontSize || '14px'};
  font-family: ${props => props.fontFamily || 'Lexend, sans-serif'};;
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
    text,
    handleClick,
    customizations,
    isLoading = false
  }: ProfileButtonProps) => {
    if (isLoading) {
      return (
        <Skeleton.Button
          active
          shape="round"
          style={{
            minWidth: customizations?.minWidth || '180px',
            height: customizations?.height || '40px',
            borderRadius: customizations?.borderRadius || '10px',
            marginTop: customizations?.marginTop || '0.5rem'
          }}
        />
      );
    }
  
    return (
      <SocialButtonWrapper
        type="default"
        onClick={handleClick}
        {...customizations}
      >
        {text}
      </SocialButtonWrapper>
    );
  }
  

export default ProfileButton
