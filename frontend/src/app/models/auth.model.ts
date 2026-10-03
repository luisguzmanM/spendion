export interface SignUp  {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface Login  {
  email: string,
  password: string
}
export interface AuthResponse {
  msj: string,
  person: Person,
  token: string
}
export interface Person {
	email: string,
  fname: string,
  lname: string,
  created?: string,
  confirmed?: boolean,
  id_person: number,
  dc_susc?: string,
  id_susc?: number,
  flg_premium?: boolean,
}