import { ValidationError } from 'yup';

interface Erros {
  [key: string]: string;
}
export default function getValidationErros(err: ValidationError): Erros {
  const validateErros: Erros = {};

  err.inner.forEach(error => {
    validateErros[error.path] = error.message;
  });

  return validateErros;
}
