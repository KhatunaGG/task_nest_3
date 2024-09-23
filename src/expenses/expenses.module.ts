import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { Permission } from './permission.middleware';
import { Timepermission } from './timepermission.middleware';
import { UserAgent } from './userAgent.middleware';

@Module({
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Permission).forRoutes({path: '*', method: RequestMethod.ALL})
    consumer.apply(Timepermission).forRoutes({path: '*', method: RequestMethod.ALL})
    consumer.apply(UserAgent).forRoutes({path: '*', method: RequestMethod.ALL})
  }
}
