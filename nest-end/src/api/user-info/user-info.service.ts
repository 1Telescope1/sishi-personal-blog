import { Injectable } from '@nestjs/common';
import { UserInfo } from './entities/user-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {RoleMenuService} from "../role-menu/role-menu.service";
import {MenuService} from "../menu/menu.service";
import getMenuList from "../../utils/getMenuList";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserInfoService {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userRepository: Repository<UserInfo>,
    private readonly roleMenuService:RoleMenuService,
    private readonly menuService:MenuService
  ) {}

  async create(userInfo: UserInfo) {
    userInfo.password = bcrypt.hashSync(userInfo.password, 10);
    const data =await this.userRepository.save(userInfo);
    return data;
  }

  async update(userInfo: UserInfo) {
    const data =await this.userRepository.save(userInfo);
    return data;
  }



  async isExistUser(nickname:string) {
    const res=await this.userRepository.createQueryBuilder('userinfo')
      .select()
      .addSelect('userinfo.password')
      .leftJoin('userinfo.userRole','role')
      .addSelect(['role.id','role.roleName'])
      .where('userinfo.nickname=:nickname',{nickname})
      .getOne()
    return res
  }


  findAll() {
    const data=this.userRepository.find()
    return data;
  }


  async findAllByPage(pageNum:number,pageSize:number,nickname:string) {
    const queryBuilder=await this.userRepository.createQueryBuilder('userinfo')
      .leftJoin('userinfo.userRole','role')
      .addSelect(['role.id','role.roleName'])
      .where('userinfo.nickname LIKE :nickname',{
        nickname:`%${nickname}%`
      })

    const data=await queryBuilder
      .select()
      .orderBy('userinfo.id','DESC')
      .skip((pageNum - 1) * pageSize)
      .take(pageSize)
      .getMany();
    const total=await queryBuilder.getCount();
    return { records: data, total, pageSize, pageNum };
  }

  async findOne(id: number) {
    const data=await this.userRepository.createQueryBuilder('user')
      .leftJoin('user.userRole','role')
      .addSelect(['role.id','role.roleName'])
      .where('user.id=:id',{id})
      .getOne()

    const roleId=data.userRole.id
    const menuIds=await this.roleMenuService.findIdByRoleId(roleId)
    const menu=getMenuList(await this.menuService.getMenuByIds(menuIds))

    data.menus=menu

    return {userinfo:data};
  }


  remove(id: number,flag:number) {
    const data=this.userRepository.query('update t_user_info set is_disable=? where id =?',[flag,id])
    return data;
  }


}
