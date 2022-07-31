export interface Credentials extends CreateCredentials {
  id: string
}

export interface CreateCredentials {
  fname: string
  lname: string
  email: string
  password: string
}
