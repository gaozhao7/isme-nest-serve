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
import { isNumberObject } from 'util/types';

export class CreateDictDataDto {

    @IsString()
    @IsNotEmpty({ message: '字典标签不能为空' })
    dictlabel: string;

    @IsString()
    @IsNotEmpty({ message: '字典数据不能为空' })
    dictvalue: string;
    
    @IsOptional()
    dictsort: number;

    @IsOptional()
    listclass: string;

    @IsBoolean()
    @IsOptional()
    status?: boolean;

    @IsString()
    @IsNotEmpty({ message: '字典类型不能为空' })
    dictcode: string;
}
