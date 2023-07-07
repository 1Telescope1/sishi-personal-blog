import { useBlogStore } from '@/store/blog';
export const useSocket = () => {
  const url="ws://43.143.107.88:7070/websocket"
  // 在线人数
  let onlineNumber:number=0
  let heartBeat=null
  // 实例化socket
  const socket:WebSocket=new WebSocket(url);

  const blogStore=useBlogStore()

  const init = () => {
    if (typeof WebSocket === "undefined") {
      console.error("您的浏览器不支持socket");
    } else {
      // 监听socket连接
      socket.onopen = function () {
        heartBeat = setInterval(function () {
          send("ping");
        }, 30 * 1000);
      };
      // 监听socket错误信息
      socket.onerror = function () {
        console.log("连接错误");
      };
      // 监听socket消息
      socket.onmessage = function (event) {
        onlineNumber = event.data;
        blogStore.setOnlineNumber(onlineNumber)
      };
    }
  };

  const send=(message:string) =>{
    socket.send(message);
  }


  return {init,socket}
};
