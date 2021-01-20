/* eslint-disable react/jsx-props-no-spreading */
import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';
import { Container, Error } from './styles';
import Tooltip from '../Tooltip/index';

// para extender todas as propriedades do input e sobrescrever a propriedade name e colocala como obrigatória
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: React.ComponentType<IconBaseProps>; // para receber um componente como propriedade
  // e para adicionar as propriedades do react-icons passar o IconBaseProps
}
// para o spread funcionar no typescript tem q desabilitar no eslint essa regra->  "react/jsx-props-no-spreading": "off",
// o icon para funcionar como componente tem q ser passado com letra Maiúscula no React
const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {
  const { fieldName, defaultValue, error, registerField } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null); // passando p o useRef q a referência é para
  // um elemento HTML input

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  // usar useCallback para evitar desnecessárias recriações da função handleInputBlur
  // qdo o elemento for renderizado
  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // código original
    // if (inputRef.current?.value) {
    //   // a '?' é para verificar se tem valor só se tiver valor pq o inputRef foi inicializado como null
    //   setIsFilled(true);
    // } else {
    //   setIsFilled(false);
    // }
    // uma maneira de reduzir o código
    setIsFilled(!!inputRef.current?.value);
  }, []);

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  return (
    <Container isErrored={!!error} isFocused={isFocused} isFilled={isFilled}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleOnFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <Error title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
    </Container>
  );
};
export default Input;
