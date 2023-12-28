import { Module } from '@nestjs/common';
import { SysdictService } from './sysdict.service';
import { SysdictController } from './sysdict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysDict } from './entities/sysdict.entity';
import { DictData } from './entities/dictdata.entity';
import { DictDataController } from './dictdata.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SysDict, DictData])],
  controllers: [SysdictController, DictDataController],
  providers: [SysdictService],
  exports: [SysdictService],
})
export class SysdictModule {}
