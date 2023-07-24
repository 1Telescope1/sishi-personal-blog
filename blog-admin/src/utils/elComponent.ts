// import { ElNotification } from "element-plus/lib/components/notification/index";
import { ElNotification,ElMessageBox } from 'element-plus'
import "element-plus/theme-chalk/el-notification.css";

export const notification=(message:any,type:string="success",duration:number=4000)=> {
  return ElNotification({
    message,
    type,
    duration,
  });
}
