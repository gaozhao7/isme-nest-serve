import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SysdictService } from './sysdict.service';
import { CreateSysdictDto } from './dto/create-sysdict.dto';
import { UpdateSysdictDto } from './dto/update-sysdict.dto';
import { GetSysDictDto } from './dto/query-sysdict.dto';

@Controller('sysdict')
export class SysdictController {
  constructor(private readonly sysdictService: SysdictService) {}

  @Post()
  create(@Body() createSysdictDto: CreateSysdictDto) {
    return this.sysdictService.create(createSysdictDto);
  }

  @Get()
  findAll(@Query() query: GetSysDictDto) {
    return this.sysdictService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sysdictService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSysdictDto: UpdateSysdictDto) {
    return this.sysdictService.update(+id, updateSysdictDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sysdictService.remove(+id);
  }

  
}
