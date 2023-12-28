import { Injectable } from '@nestjs/common';
import { CreateSysdictDto } from './dto/create-sysdict.dto';
import { UpdateSysdictDto } from './dto/update-sysdict.dto';
import { GetSysDictDto } from './dto/query-sysdict.dto';
import { SysDict } from './entities/sysdict.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DictData } from './entities/dictdata.entity';
import { CustomException, ErrorCode } from '@/common/exceptions/custom.exception';
import { CreateDictDataDto } from './dto/create-dictdata.dto';
import { UpdateDictDataDto } from './dto/update-dictdata.dto'

@Injectable()
export class SysdictService {


  constructor(
    @InjectRepository(SysDict) private sysDictRep: Repository<SysDict>,
    @InjectRepository(DictData) private dictDataRepo: Repository<DictData>,
  ) { }

  async create(createSysdictDto: CreateSysdictDto) {
    const { dictcode } = createSysdictDto;
    const existSysDict = await this.findByDictCode(dictcode);

    if (existSysDict) {
      throw new CustomException(ErrorCode.ERR_40001);
    }
    const newSysDict = this.sysDictRep.create(createSysdictDto);
    await this.sysDictRep.save(newSysDict);
    return true;
  }

  async findAll(query: GetSysDictDto) {
    const pageSize = query.pageSize || 10;
    const pageNo = query.pageNo || 1;
    const [pageData, total] = await this.sysDictRep.findAndCount({

      relations: {
        dictDatas: true,
      },
      where: {
        dictname: Like(`%${query.dictname || ''}%`),
        dictcode: Like(`%${query.dictcode || ''}%`),
        status: query.status || undefined,
      },
      order: {
        createTime: 'DESC',
      },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
    });

    return { pageData, total };
  }

  async findOne(id: number) {
    return this.sysDictRep.findOne({
      where: { id },
    });
  }

  async update(id: number, updateSysdictDto: UpdateSysdictDto) {
    const findSysDict = await this.findOne(id);
    const newSysDict = this.sysDictRep.merge(findSysDict, updateSysdictDto);
    await this.sysDictRep.save(newSysDict);
    return true;
  }

  async remove(id: number) {
    await this.sysDictRep.delete(id);
    await this.dictDataRepo
      .createQueryBuilder('dictdata')
      .delete()
      .where('dictdata.sysDictId = :id', { id })
      .execute();
    return true;
  }

  /**
   * 根据字典编码查询数据
   * @param dictcode 字典编码
   * @returns 
   */
  async findByDictCode(dictcode: string) {
    return this.sysDictRep.findOne({
      where: { dictcode },
      select: ['id', 'dictcode', 'dictname', 'status', 'remark'],
    });
  }

  // 字典值相关接口
  async findAllDictData(query: GetSysDictDto) {
    if (query.dictcode === undefined) {
      return { pageData: [], total: 0 };
    }
    // 根据编码查询字典
    const existSysDict = await this.findByDictCode(query.dictcode);
    if (!existSysDict) {
      throw new CustomException(ErrorCode.ERR_40002);
    }
    const pageSize = query.pageSize || 10;
    const pageNo = query.pageNo || 1;
    const [pageData, total] = await this.dictDataRepo.findAndCount({
      where: {
        //sysDict: existSysDict,
        sysDict: { id: existSysDict.id },
        dictlabel: Like(`%${query.dictlabel || ''}%`),
        status: query.status || undefined,
      },
      relations: {
        sysDict: true,
      },
      order: {
        dictsort: 'ASC',
      },
      take: pageSize,
      skip: (pageNo - 1) * pageSize,
    });

    return { pageData, total };
  }

  async createDictData(createDictDatadto: CreateDictDataDto) {
    const { dictcode } = createDictDatadto;
    const existSysDict = await this.findByDictCode(dictcode);
    if (!existSysDict) {
      throw new CustomException(ErrorCode.ERR_40002);
    }
    const newSysDict = this.dictDataRepo.create(createDictDatadto);
    newSysDict.sysDict = existSysDict;
    await this.dictDataRepo.save(newSysDict);
    return true;
  }


  findOneDictData(id: number) {
    return this.dictDataRepo.findOne({
      where: { id },
    });
  }
  async updateDictData(id: number, updateSysdictDto: UpdateDictDataDto) {
    const findSysDict = await this.findOneDictData(id);
    const newSysDict = this.dictDataRepo.merge(findSysDict, updateSysdictDto);
    await this.dictDataRepo.save(newSysDict);
    return true;
  }
  async removeDictData(id: number) {
    await this.dictDataRepo.delete(id);
    return true;
  }
}
