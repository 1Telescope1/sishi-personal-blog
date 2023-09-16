export const asyncRoutes = [
  {
    path: "/",
    name: "首页",
    component: () => import("@/views/index.vue"),
    meta: {
      keepAlive: true,
      title: "首页",
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home/index.vue"),
    meta: {
      keepAlive: true,
      title: "home",
    },
  },
  {
    path: "/article/publish",
    name: "publishArticle",
    component: () => import("@/views/Article/article.vue"),
    meta: {
      keepAlive: false,
      title: "发布文章",
    },
  },
  {
    path: "/article/publish/:articleId",
    name: "editArticle",
    component: () => import("@/views/Article/article.vue"),
    meta: {
      keepAlive: false,
      title: "修改文章",
    },
  },
  {
    path: "/article/list",
    name: "articleList",
    component: () => import("@/views/Article/articleList.vue"),
    meta: {
      keepAlive: true,
      title: "文章列表",
    },
  },
  {
    path: "/article/tag",
    name: "articleTag",
    component: () => import("@/views/Tag/index.vue"),
    meta: {
      keepAlive: true,
      title: "标签管理",
    },
  },
  {
    path: "/news/comment",
    name: "newsComment",
    component: () => import("@/views/News/comment.vue"),
    meta: {
      keepAlive: true,
      title: "文章留言",
    },
  },
  {
    path: "/news/talkComment",
    name: "talkComment",
    component: () => import("@/views/News/talkComment.vue"),
    meta: {
      keepAlive: true,
      title: "说说评论",
    },
  },
  {
    path: "/news/message",
    name: "message",
    component: () => import("@/views/News/Message.vue"),
    meta: {
      keepAlive: true,
      title: "留言列表",
    },
  },
  {
    path: "/news/chat",
    name: "chat",
    component: () => import("@/views/News/chat.vue"),
    meta: {
      keepAlive: true,
      title: "聊天评论",
    },
  },
  {
    path: "/user/userList",
    name: "userinfo",
    component: () => import("@/views/User/index.vue"),
    meta: {
      keepAlive: true,
      title: "用户列表",
    },
  },
  {
    path: "/system/friend",
    name: "friendLink",
    component: () => import("@/views/System/friendLink.vue"),
    meta: {
      keepAlive: true,
      title: "友链管理",
    },
  },
  {
    path: "/system/views",
    name: "views",
    component: () => import("@/views/System/views.vue"),
    meta: {
      keepAlive: true,
      title: "浏览管理",
    },
  },
  {
    path: "/talk/publish",
    name: "publishTalk",
    component: () => import("@/views/Talk/talk.vue"),
    meta: {
      keepAlive: false,
      title: "发布说说",
    },
  },
  {
    path: "/talk/publish/:talkId",
    name: "editTalk",
    component: () => import("@/views/Talk/talk.vue"),
    meta: {
      keepAlive: false,
      title: "修改说说",
    },
  },
  {
    path: "/talk/list",
    name: "talkList",
    component: () => import("@/views/Talk/talkList.vue"),
    meta: {
      keepAlive: false,
      title: "说说列表",
    },
  },
  {
    path: "/permission/role",
    name: "role",
    component: () => import("@/views/Permission/role.vue"),
    meta: {
      keepAlive: false,
      title: "角色管理",
    },
  },
  {
    path: "/permission/menu",
    name: "menu",
    component: () => import("@/views/Permission/menu.vue"),
    meta: {
      keepAlive: false,
      title: "菜单管理",
    },
  },
  {
    path: "/permission/resource",
    name: "resource",
    component: () => import("@/views/Permission/resource.vue"),
    meta: {
      keepAlive: false,
      title: "资源管理",
    },
  },
  {
    path: "/background/img",
    name: "image",
    component: () => import("@/views/Background/index.vue"),
    meta: {
      keepAlive: true,
      title: "图片管理",
    },
  },
  {
    path: "/log/exception",
    name: "exception",
    component: () => import("@/views/Log/exception.vue"),
    meta: {
      keepAlive: false,
      title: "异常日志",
    },
  },
  {
    path: "/log/operation",
    name: "operation",
    component: () => import("@/views/Log/operation.vue"),
    meta: {
      keepAlive: false,
      title: "操作日志",
    },
  },


]
