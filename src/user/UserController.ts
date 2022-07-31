import { Body, Controller, Get, HttpException, Put, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guards'
import { UserDto } from 'src/dto'
import { UserService } from './UserService'
import { SuchBossDoesNotExistsError } from './errors'
import { ChangeBossPipe } from './pipes'
@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getUser(@Request() req): Promise<UserDto.UserAggregated[]> {
    return this.service.getAggregated(req.user.id)
  }

  @Put('boss')
  @UseGuards(AuthGuard)
  async changeBoss(@Request() req, @Body(ChangeBossPipe) body: { bossId: string }): Promise<void> {
    try {
      return await this.service.changeBoss(body.bossId, req.user.id)
    } catch (err) {
      if (err instanceof SuchBossDoesNotExistsError)
        throw new HttpException('Such Big Boss does not exists', 400)
    }
  }
}
