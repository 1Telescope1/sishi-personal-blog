import { ElNotification } from "element-plus/lib/components/notification/index";
import "element-plus/theme-chalk/el-notification.css";

export const notification=(title:any,message:any,type:string="success",duration:number=4000)=> {
  return ElNotification({
    title,
    message,
    type,
    duration
  });
}
