import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { AnimationContainer, Background, Container, Content } from './styles';
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input/index';
import Button from '../../components/Button/index';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({}); // p zerar os erros logo no início
        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .required('E-mail is required')
            .email('Invalid e-mail format'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Min 6 characters'),
        });

        await schema.validate(data, {
          abortEarly: false, // para retorar todos os erros de uma só vez, por padrão ele vai retornando um a um
        });

        api.post('users', data);

        history.push('/');

        addToast({
          type: 'success',
          title: 'User added',
          description: 'Now you could do your login',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return; // isso impede q o resto seja processado. Só processa se não for um erro de validação
        }
        addToast({
          type: 'error',
          title: 'Register error',
          description:
            'An error has occurred during the register process, please check your credentials',
        });
      }
    },
    [history, addToast],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Register</h1>
            <Input name="name" icon={FiUser} placeholder="Name" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Input
              name="password"
              icon={FiLock}
              placeholder="Password"
              type="password"
            />
            <Button type="submit">Sign up</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft size={25} />
            Back to log in
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
