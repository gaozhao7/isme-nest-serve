import {
    Allow,
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
export class GetSysDictDto {
    @Allow()
    pageSize?: number;

    @Allow()
    pageNo?: number;

    @Allow()
    dictname?: string;

    @Allow()
    dictcode?: string;

    @Allow()
    dictlabel?: string;

    @Allow()
    status?: boolean;
}