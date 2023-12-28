import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { DictData } from './dictdata.entity';
@Entity()
export class SysDict {

    @PrimaryGeneratedColumn()
    id: number;

    // 字典名称
    @Column({ length: 60 })
    dictname: string;

    // 字典编码
    @Column({ unique: true, length: 50 })
    dictcode: string;

    //状态（1正常 0停用）
    @Column({ default: true })
    status: boolean;

    @Column({ nullable: true})
    remark: string;

    @CreateDateColumn()
    createTime: Date;

    @UpdateDateColumn()
    updateTime: Date;

    @OneToMany(() => DictData, (dictData) => dictData.sysDict, {
        createForeignKeyConstraints: false,
    })
    @JoinTable()
    dictDatas: DictData[];

}
