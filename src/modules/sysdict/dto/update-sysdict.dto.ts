import { PartialType } from '@nestjs/mapped-types';
import { CreateSysdictDto } from './create-sysdict.dto';

export class UpdateSysdictDto extends PartialType(CreateSysdictDto) {}
