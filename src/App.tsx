import React, {useRef, useState } from 'react';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import { SubmitHandler, FormHandles } from '@unform/core';
import Select from './components/Select';
import {banks} from './services/banks';

import {Container} from './appStyles';
import getValidationErros from './uitils/getValidationsErros';

interface FormData {
  bank: string;
}

function App() {
  const [, setInputValue] = useState('');
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        banks: Yup.string().required(),
      });
      await schema.validate(data, {
        abortEarly: false,
      })
    } catch (err) {
      const erros = getValidationErros(err);
      formRef.current?.setErrors(erros);
    } 
  };
  
  const opionsBanks = banks.map(bank => ({
    label: `${bank.codigo} - ${bank.fullName}`,
    value: bank.fullName,
  }));

  const filterColors = (inputValue: string) => {
    return opionsBanks.filter(bank =>
      bank.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const handleInputChange = (newValue: string) => {
    const inputValue = newValue.replace(/\W/g, '');
    setInputValue(inputValue);
    return inputValue;
  };
  const loadOptions = (inputValue: string, callback: any) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Select 
          name="banks" 
          loadOptions={loadOptions} 
          onInputChange={handleInputChange}
          placeholder="Digite o código ou o nome do banco"
          />
        <button type="submit">cadastrar</button>
      </Form>
      
    </Container>
  );
}

export default App;
