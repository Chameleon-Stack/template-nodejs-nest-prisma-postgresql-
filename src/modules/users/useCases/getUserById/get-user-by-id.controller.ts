import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BaseControllerInterface } from '../../../../common/interfaces/base-controller.interface';
import { CustomApiResponseGetDataWrapper } from '../../../../system/decorators/swagger/api-response-get.decorator';
import { UserEntityDTO } from '../../dtos/response/user.entity.dto';
import { UserEntity } from '../../entities/user.entity';
import { GetUserByIdUseCase } from './get-user-by-id.usecase';

@ApiTags('User')
@Controller('user')
export class GetUserByIdController implements BaseControllerInterface {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Get user by id' })
  @CustomApiResponseGetDataWrapper({
    status: 200,
    description: 'Get user By Id',
    type: UserEntityDTO,
  })
  public async handle(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    return this.getUserByIdUseCase.execute(id);
  }
}
