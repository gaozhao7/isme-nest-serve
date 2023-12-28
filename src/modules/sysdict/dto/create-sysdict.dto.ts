import {
    Allow,
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
  } from 'class-validator';

import { DictData } from '../entities/dictdata.entity';

export class CreateSysdictDto {

    @IsString()
    @IsNotEmpty({ message: '字典名称不能为空' })
    dictname: string;

    @IsString()
    @IsNotEmpty({ message: '字典编码不能为空' })
    dictcode: string;
    
    @IsString()
    remark: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsOptional()
    @IsArray()
    dictDatas?: DictData[];

}
