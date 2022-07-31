export interface SignIn {
  email: string
  password: string
}

export interface SignUp extends SignIn {
  fname: string
  lname: string
  bossId?: string
}
