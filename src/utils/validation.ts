import moment from "moment"

export const IsEmailValid = (email: string): boolean => {
  const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  return reg.test(email)
}

export const isBirthDateValid = (dateString: string): boolean => {
  const reg = /[0-9]{2}-[0-9]{2}-[0-9]{4}/g

  if (!reg.test(dateString)) return false
  if (new Date(moment(dateString, 'DD-MM-YYYY').format()).getTime() > new Date().getTime()) return false
  return true
}

export const isDocumentValid = (cpf: string): boolean => {
  const reg = /^(?:(\d)\1{10})$|(\D)|^(\d{12,})$|^(\d{0,10})$/g

  cpf = cpf.replace(/[^\d]+/g, '')
  
  // Elimina CPFs invalidos conhecidos	
  if (cpf.match(reg))return false

  // Valida 1o digito	
  let add = 0

  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i)

  let rev = 11 - (add % 11)

  if (rev == 10 || rev == 11)rev = 0
  if (rev != parseInt(cpf.charAt(9)))return false
  // Valida 2o digito	
  
  add = 0
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (add % 11)
  
  if (rev == 10 || rev == 11) rev = 0
  if (rev != parseInt(cpf.charAt(10)))return false

  return true
}