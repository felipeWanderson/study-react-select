import React, { useRef, useEffect, useState, useCallback } from 'react';
import { OptionTypeBase } from 'react-select'; 
import Select, { Props as AsyncProps } from 'react-select/async';
import { useField } from '@unform/core';
import {Container} from './styles';

interface Props extends AsyncProps<OptionTypeBase, false> { 
  name: string;
}

const AsyncSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.select.state.value) {
            return [];
          }

          return ref.select.state.value.map(
            (option: OptionTypeBase) => option.value,
          );
        }
        if (!ref.select.state.value) {
          return '';
        }

        return ref.select.state.value.value;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const msgStyles = {
    color: 'white',
  };

  const LoadingMessage = (props: any) => {
    return (   
        <div
          style={props.getStyles('loadingMessage', props)}
        >
          <span>Carregando....</span>
        </div>
      
    );
  };

  const NoOptionsMessage = () => {
    return (
      <div>
        <span>sem opções</span>
      </div>
    );
  };
  
  return (
    <Container isErrored={!!error} isFocused={isFocused}>
      <Select
        cacheOptions
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="select"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        openMenuOnClick={false}
        styles={{
          loadingMessage: base => ({
            ...base,
            color: 'black',
          }),
          noOptionsMessage: base => ({ ...base, ...msgStyles }),
        }}
        components={{ LoadingMessage, NoOptionsMessage }}
        {...rest}
      />
      {error && <span>{error}</span>}
    </Container>
  );
};

export default AsyncSelect;