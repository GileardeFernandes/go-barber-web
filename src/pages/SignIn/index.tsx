import React,{useRef, useCallback, useContext} from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import {Form} from '@unform/web';
import * as Yup from 'yup';
import { FormHandles} from '@unform/core';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background } from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErros from '../../utils/getValidationErros';
import {AuthContext} from '../../context/authContext';


interface SigInFormData {
  email: string;
  password:string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const {SigIn} = useContext(AuthContext);

  const handleSubmit = useCallback(async (data: SigInFormData) => {
     try{
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email('Digite um Email válido'),
          password: Yup.string().required('Senha obrigatória')
        });

        await schema.validate(data,{abortEarly:false});
        SigIn({
          email: data.email,
          password: data.password
        });
     }catch(err){
         const erros = getValidationErros(err);
         formRef.current?.setErrors(erros);
     }
  },[])

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Go barber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="login">
          <FiLogIn />
          Criar conta
        </a>
      </Content>

      <Background />
    </Container>
  );
};

export default SignIn;
