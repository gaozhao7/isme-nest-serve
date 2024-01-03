import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SysdictService } from './sysdict.service';
import { CreateDictDataDto } from './dto/create-dictdata.dto';
import { GetSysDictDto } from './dto/query-sysdict.dto';
import { UpdateDictDataDto } from './dto/update-dictdata.dto';


@Controller('dictdata')
export class DictDataController {
  constructor(private readonly sysdictService: SysdictService) { }

  // 字典值相关接口
  @Get()
  findAllDictData(@Query() query: GetSysDictDto) {
    return this.sysdictService.findAllDictData(query);
  }

  @Post()
  create(@Body() createDictDatadto: CreateDictDataDto) {
    return this.sysdictService.createDictData(createDictDatadto);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysdictService.findOneDictData(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSysdictDto: UpdateDictDataDto) {
    return this.sysdictService.updateDictData(+id, updateSysdictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysdictService.removeDictData(+id);
  }


}
