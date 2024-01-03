/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:29:16
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';
import { SYS_DICT_KEY } from '../constants/redis.contant';
import { SysDict } from '@/modules/sysdict/entities/sysdict.entity';


@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  constructor(
  ) {
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async del(key: string) {
    await this.redisClient.del(key);
    return true;
  }

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]);
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  /**
   * 清除字典缓存
   */
  async clearDictCache() {
    const keys: string[] = await this.redisClient.keys(SYS_DICT_KEY + "*");
    console.log('缓存查询到的key:' + JSON.stringify(keys))
    if (keys.length > 0) {
      console.log('缓存查询到的key不为空，进行删除操作！')
      await this.redisClient.del(keys);
    }

  }

  /**
   * 重新加载缓存数据
   * @returns 
   */
  async loadingDictCache(sysDictData: SysDict[]) {
    console.log('进行loadingDictCache方法:' + JSON.stringify(sysDictData))
    sysDictData.forEach(sysDict => {
      const key = sysDict.dictcode;
      const val = sysDict.dictDatas.sort((a, b) => a.dictsort - b.dictsort);
      this.redisClient.set(SYS_DICT_KEY + key, JSON.stringify(val));
      console.log('进行loadingDictCache方法赋值成功！')
    });
    return true;
  }

  /**
   * 刷新缓存字典
   */
  async resetDictCache(data: SysDict[]) {
    await this.clearDictCache();
    await this.loadingDictCache(data);
  }

  /**
   * 
   * @param key 字典编码
   * @returns 
   */
  async getSysDict(key: string) {
    const data = await this.redisClient.get(SYS_DICT_KEY + key);
    return JSON.parse(data);
  }
}
