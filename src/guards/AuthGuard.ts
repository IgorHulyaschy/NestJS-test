import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { CredentialsService } from 'src/credentials'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly credentialsService: CredentialsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.header('Authorization').split(' ')[1]
    try {
      request.user = await this.credentialsService.validateToken(token)
      return true
    } catch (err) {
      return false
    }
  }
}
