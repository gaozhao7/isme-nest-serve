

import { Column, Entity, ManyToOne, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { SysDict } from './sysdict.entity';
/**
 * 字典枚举值
 */
@Entity()
export class DictData {

  @PrimaryGeneratedColumn()
  id: number;
  
  // 字典标签
  @Column({ nullable: false, length: 100 })
  dictlabel: string;

  // 字典值
  @Column({ nullable: false, length: 100 })
  dictvalue: string;

  // 字典类型主键
  // @Column({ nullable: false })
  // dictid: number;

  @Column({ nullable: true })
  dictsort: number;

  // 表格回显样式
  @Column({ nullable: true })
  listclass: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn()
  createTime: Date;

  @ManyToOne(() => SysDict, sysDict => sysDict.dictDatas)
  sysDict: SysDict;
}
