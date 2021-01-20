import { ValidationError } from 'yup';

// '[key: string]' significa q o nome do campo key do objeto vai ser gerado de forma dinâmica
interface Errors {
  [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};
  // aqui tem esse erro pq o 'error' pode ser dotipo string | undefined, então uma key não pode ser undefined
  // tentei botar a '!'q é negação para tentar
  err.inner.forEach(error => {
    validationErrors[error.path!] = error.message;
  });

  return validationErrors;
}
