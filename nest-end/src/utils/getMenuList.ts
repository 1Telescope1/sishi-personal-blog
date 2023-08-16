import {Menu} from "../api/menu/entities/menu.entity";

export default function getMenuList (list:Menu[]) {
  for (let i=0;i<list.length;i++) {
    list[i].children=[]
  }
  const data=list.filter(item=>item.parentId==null)
  const son=list.filter(item=>item.parentId!=null)

  const delIds=[]
  for(let i=0;i<data.length;i++) {
    for(let j=0;j<son.length;j++) {
      if(data[i].id==son[j].parentId) {
        data[i].children.push(son[j])
        delIds.push(son[j].id)
      }
    }
  }

  for(let i=0;i<son.length;i++) {
    if(!delIds.includes(son[i].id)) {
      data.push(son[i])
    }
  }
  return data
}