import { PartialType } from '@nestjs/mapped-types';
import { CreateDictDataDto } from './create-dictdata.dto';

export class UpdateDictDataDto extends PartialType(CreateDictDataDto) {}
