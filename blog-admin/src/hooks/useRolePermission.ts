import {ref} from 'vue'
import {Resource} from "@/api/resource/type.ts";
import {Menu} from "@/api/menu/type.ts";
import {Role, RolePermission} from "@/api/role/type.ts";
import {reqChangeRoleMenu, reqChangeRoleResource} from "@/api/role";
import {notification} from "@/utils/elComponent.ts";
import {reqResourceByName} from "@/api/resource";
import {reqMenuByName} from "@/api/menu";

export function useRolePermission(getData: Function) {
  let dialogFormVisible = ref(false)
  let isMenu = ref(true)
  const data = ref<any>([])
  const roleId = ref()
  const defaultProps = ref({})
  const checkedKeys = ref<number[]>([])
  const resourceList = ref<Resource[]>([])
  const menuList = ref<Menu[]>([])
  const resourceProps = {
    children: 'children',
    label: 'resourceName',
  }
  const menuProps = {
    children: 'children',
    label: 'name',
  }
  const handleDialog = (flag: boolean, role: Role) => {
    isMenu.value = flag
    roleId.value = role.id
    data.value = isMenu.value ? menuList.value : resourceList.value
    defaultProps.value = isMenu.value ? menuProps : resourceProps
    checkedKeys.value = (isMenu.value ? role.menuId : role.resourceId ) as number[]
    dialogFormVisible.value = true
  }

  const handleClick = (data: any, obj: any) => {
    console.log(data)
    console.log(obj.checkedKeys)
    checkedKeys.value = obj.checkedKeys
  }

  const handlePermission = async () => {
    let res
    const data: RolePermission = {
      roleId: roleId.value, roleMenu: [], roleResource: []
    }
    if (isMenu.value) {
      for (let i = 0; i < checkedKeys.value.length; i++) {
        data.roleMenu?.push({roleId: roleId.value, menuId: checkedKeys.value[i]})
      }
      res = await reqChangeRoleMenu(data)
      location.reload();
    } else {
      for (let i = 0; i < checkedKeys.value.length; i++) {
        data.roleResource?.push({roleId: roleId.value, resourceId: checkedKeys.value[i]})
      }
      res = await reqChangeRoleResource(data)
    }
    if (res.data) {
      notification("修改成功")
      getData()
    }
    dialogFormVisible.value = false
  }

  const initPermission = async () => {
    const res1 = await reqResourceByName({resourceName: ""})
    const res2 = await reqMenuByName({name: ""})
    if (res1.status == 200 && res2.status == 200) {
      resourceList.value = res1.data
      menuList.value = res2.data
    }
  }

  return {
    dialogFormVisible, isMenu, data, roleId, defaultProps,
    checkedKeys, handleDialog, handleClick, handlePermission,
    initPermission
  }
}