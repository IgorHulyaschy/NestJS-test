import { Body, Controller, HttpException, Post } from '@nestjs/common'
import { UserWithSuchEmailAlreadyExistsError } from 'src/credentials/errors'
import { AuthDto } from 'src/dto'
import { AuthService } from './AuthService'
import { WrongCredentialsError } from './errors'
import { SignInPipe, SignUpPipe } from './pipes'

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('sign-up')
  async signUp(@Body(SignUpPipe) dto: AuthDto.SignUp): Promise<string> {
    try {
      return await this.service.signUp(dto)
    } catch (err) {
      if (err instanceof UserWithSuchEmailAlreadyExistsError)
        throw new HttpException('User with such email already exists', 400)
      throw err
    }
  }

  @Post('sign-in')
  async signIn(@Body(SignInPipe) { email, password }: AuthDto.SignIn): Promise<string> {
    try {
      return await this.service.validateCredentials(email, password)
    } catch (err) {
      if (err instanceof WrongCredentialsError) throw new HttpException('Wrong credentials', 400)
      throw err
    }
  }
}
