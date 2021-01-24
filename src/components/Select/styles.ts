import styled, { css }  from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
border: 2px solid gray;
  .select-container, 
  .select__control,
  .select__control--is-focused,
  .select__control--menu-is-open,
  .select__menu,
  .select__menu-list,
  .select__options,
  .css-1pahdxg-control {
    border: none;
    box-shadow: none;
  }
  .select__indicators {
    display: none;
  }

  ${props => 
    props.isFocused && 
    css`
      border-color: green;
    `}
  ${props => 
    props.isErrored && 
    css`
      border-color: red;
    `}
`;
