/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:28:33
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, length: 10 })
  nickName: string;

  @Column({ nullable: true })
  gender: number;

  @Column({
    default:
      'https://easyimage.lovelala.top:14443/i/2023/01/05/sdf82x-2.jpeg',
  })
  avatar: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  email: string;

  @OneToOne(() => User, (user) => user.profile, {
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column({ unique: true })
  userId: number;
}
