SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_about
-- ----------------------------
DROP TABLE IF EXISTS `t_about`;
CREATE TABLE `t_about`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_about
-- ----------------------------
INSERT INTO `t_about` VALUES (1, '{\"content\":\"this is about123\"}', '2022-07-24 17:22:13', '2023-07-19 15:53:17');

-- ----------------------------
-- Table structure for t_article
-- ----------------------------
DROP TABLE IF EXISTS `t_article`;
CREATE TABLE `t_article`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) UNSIGNED NOT NULL DEFAULT 1 COMMENT '作者',
  `category_id` int(0) NULL DEFAULT NULL COMMENT '文章分类',
  `article_cover` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文章缩略图',
  `article_title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标题',
  `article_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `is_top` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否置顶 0否 1是',
  `is_featured` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否推荐 0否 1是',
  `is_delete` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否删除  0否 1是',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态值 1公开 2私密 3草稿',
  `type` tinyint(1) NOT NULL DEFAULT 1 COMMENT '文章类型 1原创 2转载 3翻译',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '访问密码',
  `original_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '原文链接',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '发表时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `views` int(0) NOT NULL DEFAULT 0 COMMENT '浏览量',
  `tag_id` int(0) NOT NULL COMMENT '文章标签',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `article_tagId`(`tag_id`) USING BTREE,
  CONSTRAINT `article_tagId` FOREIGN KEY (`tag_id`) REFERENCES `t_tag` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 48123229 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_article
-- ----------------------------

-- ----------------------------
-- Table structure for t_back
-- ----------------------------
DROP TABLE IF EXISTS `t_back`;
CREATE TABLE `t_back`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '内容',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '网址',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_back
-- ----------------------------

-- ----------------------------
-- Table structure for t_category
-- ----------------------------
DROP TABLE IF EXISTS `t_category`;
CREATE TABLE `t_category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '分类名',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_category
-- ----------------------------

-- ----------------------------
-- Table structure for t_chat
-- ----------------------------
DROP TABLE IF EXISTS `t_chat`;
CREATE TABLE `t_chat`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `ip` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ip',
  `userId` int(0) NULL DEFAULT NULL COMMENT '用户id',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '发布于时间',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 109 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_chat
-- ----------------------------

-- ----------------------------
-- Table structure for t_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_comment`;
CREATE TABLE `t_comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(0) NOT NULL COMMENT '评论用户Id',
  `comment_content` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `reply_comment_id` int(0) NULL DEFAULT NULL COMMENT '回复评论的id',
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '父评论id',
  `is_delete` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除  0否 1是',
  `is_review` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否审核',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '评论时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `article_id` int(0) NOT NULL COMMENT '文章id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_comment_user`(`user_id`) USING BTREE,
  INDEX `fk_comment_parent`(`parent_id`) USING BTREE,
  INDEX `comment_articleId`(`article_id`) USING BTREE,
  CONSTRAINT `com_userId` FOREIGN KEY (`user_id`) REFERENCES `t_user_info` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `comment_articleId` FOREIGN KEY (`article_id`) REFERENCES `t_article` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1054 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_comment
-- ----------------------------

-- ----------------------------
-- Table structure for t_exception_log
-- ----------------------------
DROP TABLE IF EXISTS `t_exception_log`;
CREATE TABLE `t_exception_log`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `opt_uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求接口',
  `opt_method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求方式',
  `request_param` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求参数',
  `opt_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作描述',
  `exception_info` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '异常信息',
  `ip_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip',
  `ip_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'ip来源',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '操作时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1634 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_exception_log
-- ----------------------------

-- ----------------------------
-- Table structure for t_file
-- ----------------------------
DROP TABLE IF EXISTS `t_file`;
CREATE TABLE `t_file`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件路径',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '文件名字',
  `type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文件类型',
  `size` double(20, 0) NOT NULL COMMENT '文件大小（kb）',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '上传时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 38 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_file
-- ----------------------------

-- ----------------------------
-- Table structure for t_friend_link
-- ----------------------------
DROP TABLE IF EXISTS `t_friend_link`;
CREATE TABLE `t_friend_link`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `link_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '链接名',
  `link_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '链接头像',
  `link_address` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '链接地址',
  `link_intro` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '链接介绍',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `is_status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '审核是否通过',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_friend_link_user`(`link_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 64 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_friend_link
-- ----------------------------

-- ----------------------------
-- Table structure for t_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_menu`;
CREATE TABLE `t_menu`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名',
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单路径',
  `component` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '组件',
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单icon',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `order_num` tinyint(1) NOT NULL COMMENT '排序',
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '父id',
  `is_hidden` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否隐藏  0否1是',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 245 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_menu
-- ----------------------------
INSERT INTO `t_menu` VALUES (1, '首页', '/', '/index.vue', 'HomeFilled', '2021-01-26 17:06:51', '2023-08-17 15:06:07', 1, NULL, 0);
INSERT INTO `t_menu` VALUES (2, '文章管理', '', 'Layout', 'Reading', '2021-01-25 20:43:07', '2023-08-17 15:07:54', 2, NULL, 0);
INSERT INTO `t_menu` VALUES (3, '消息管理', '', 'Layout', 'Bell', '2021-01-25 20:44:17', '2023-08-17 15:12:59', 3, NULL, 0);
INSERT INTO `t_menu` VALUES (4, '系统管理', '', 'Layout', 'Tools', '2021-01-25 20:45:57', '2023-08-18 16:44:48', 3, NULL, 0);
INSERT INTO `t_menu` VALUES (6, '发布文章', '/article/publish', '/Article/article.vue', 'EditPen', '2021-01-26 14:30:48', '2023-08-17 15:06:37', 1, 2, 0);
INSERT INTO `t_menu` VALUES (7, '修改文章', '/article/publish/:articleId', '/Article/article.vue', 'Edit', '2021-01-26 14:31:32', '2023-08-17 15:06:49', 2, 2, 1);
INSERT INTO `t_menu` VALUES (8, '文章列表', '/article/list', '/Article/articleList.vue', 'List', '2021-01-26 14:32:13', '2023-08-17 15:07:50', 3, 2, 0);
INSERT INTO `t_menu` VALUES (10, '标签管理', '/article/tag', '/Tag/index.vue', 'Star', '2021-01-26 14:34:33', '2023-08-17 15:08:44', 5, 2, 0);
INSERT INTO `t_menu` VALUES (11, '文章评论', '/news/comment', '/News/comment.vue', 'ChatDotRound', '2021-01-26 14:35:31', '2023-08-17 15:14:41', 1, 3, 0);
INSERT INTO `t_menu` VALUES (13, '用户列表', '/user/userList', '/User/index.vue', 'UserFilled', '2021-01-26 14:38:09', '2023-08-17 15:15:19', 1, 202, 0);
INSERT INTO `t_menu` VALUES (14, '角色管理', '/permission/role', '/role/Role.vue', 'Avatar', '2021-01-26 14:39:01', '2023-08-17 15:17:08', 2, 213, 0);
INSERT INTO `t_menu` VALUES (15, '接口管理', '/permission/resource', '/resource/Resource.vue', 'Money', '2021-01-26 14:40:14', '2023-08-17 15:17:51', 2, 213, 0);
INSERT INTO `t_menu` VALUES (16, '菜单管理', '/permission/menu', '/menu/Menu.vue', 'Menu', '2021-01-26 14:40:54', '2023-08-17 15:17:58', 2, 213, 0);
INSERT INTO `t_menu` VALUES (17, '友链管理', '/system/friend', '/System/friendLink.vue', 'Link', '2021-01-26 14:41:35', '2023-08-17 15:13:35', 3, 4, 0);
INSERT INTO `t_menu` VALUES (202, '用户管理', '', 'Layout', 'User', '2021-02-06 23:44:59', '2023-08-17 15:15:07', 4, NULL, 0);
INSERT INTO `t_menu` VALUES (213, '权限管理', '', 'Layout', 'Monitor', '2021-08-07 19:56:55', '2023-08-18 16:45:03', 2, NULL, 0);
INSERT INTO `t_menu` VALUES (221, '说说管理', '', 'Layout', 'Reading', '2022-08-15 17:27:10', '2023-08-17 15:20:12', 3, NULL, 0);
INSERT INTO `t_menu` VALUES (222, '说说列表', '/talk/list', '/Talk/talkList.vue', 'List', '2022-08-15 17:29:05', '2023-08-17 15:21:03', 1, 221, 0);
INSERT INTO `t_menu` VALUES (223, '发布说说', '/talk/publish', '/Talk/talk.vue', 'EditPen', '2022-08-15 17:34:26', '2023-08-17 15:21:37', 2, 221, 0);
INSERT INTO `t_menu` VALUES (224, '修改说说', '/talk/publish/:talkId', '/Talk/talk.vue', 'Edit', '2022-08-16 16:06:59', '2023-08-17 15:21:30', 3, 221, 1);
INSERT INTO `t_menu` VALUES (234, '说说评论', '/news/talkComment', '/News/talkComment.vue', 'ChatDotSquare', '2023-08-16 20:25:10', '2023-08-17 15:14:09', 1, 3, 0);
INSERT INTO `t_menu` VALUES (235, '留言列表', '/news/message', '/News/message.vue', 'Message', '2023-08-16 20:25:48', '2023-09-14 20:43:17', 1, 3, 0);
INSERT INTO `t_menu` VALUES (237, '背景管理', '', 'Layout', 'Camera', '2023-08-21 14:30:23', '2023-08-21 14:30:43', 5, NULL, 0);
INSERT INTO `t_menu` VALUES (238, '图片管理', '/background/img', '/Background/index.vue', 'Picture', '2023-08-21 14:33:02', '2023-08-21 14:33:02', 1, 237, 0);
INSERT INTO `t_menu` VALUES (239, '日志管理', '', 'Layout', 'Memo', '2023-09-01 20:39:43', '2023-09-01 20:39:43', 10, NULL, 0);
INSERT INTO `t_menu` VALUES (240, '操作日志', '/log/operation', '/Log/operation.vue', 'FolderChecked', '2023-09-01 20:40:14', '2023-09-01 20:40:14', 1, 239, 0);
INSERT INTO `t_menu` VALUES (241, '异常日志', '/log/exception', '/Log/exception.vue', 'DocumentDelete', '2023-09-01 20:40:29', '2023-09-03 10:46:29', 1, 239, 0);
INSERT INTO `t_menu` VALUES (242, '聊天评论', '/news/chat', 'News/chat.vue', 'ChatLineRound', '2023-09-14 20:42:15', '2023-09-14 20:43:21', 1, 3, 0);
INSERT INTO `t_menu` VALUES (244, '浏览管理', '/system/views', '/System/views.vue', 'View', '2023-09-16 11:11:03', '2023-09-16 11:11:36', 1, 4, 0);

-- ----------------------------
-- Table structure for t_message
-- ----------------------------
DROP TABLE IF EXISTS `t_message`;
CREATE TABLE `t_message`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(0) NOT NULL COMMENT '评论用户Id',
  `comment_content` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `is_delete` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除  0否 1是',
  `is_review` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否审核',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '评论时间',
  `update_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_comment_user`(`user_id`) USING BTREE,
  CONSTRAINT `msg_userId` FOREIGN KEY (`user_id`) REFERENCES `t_user_info` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1162 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_message
-- ----------------------------

-- ----------------------------
-- Table structure for t_operation_log
-- ----------------------------
DROP TABLE IF EXISTS `t_operation_log`;
CREATE TABLE `t_operation_log`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `opt_module` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作模块',
  `opt_type` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作类型',
  `opt_uri` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '操作url',
  `opt_method` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作方法',
  `opt_desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作描述',
  `request_param` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求参数',
  `request_method` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '请求方式',
  `response_data` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '返回数据',
  `user_id` int(0) NOT NULL COMMENT '用户id',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户昵称',
  `ip_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作ip',
  `ip_source` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '操作地址',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5882 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_operation_log
-- ----------------------------

-- ----------------------------
-- Table structure for t_resource
-- ----------------------------
DROP TABLE IF EXISTS `t_resource`;
CREATE TABLE `t_resource`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `resource_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '资源名',
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '权限路径',
  `request_method` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '请求方式',
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '父模块id',
  `is_anonymous` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否匿名访问 0否 1是',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1250 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_resource
-- ----------------------------
INSERT INTO `t_resource` VALUES (1052, '友链模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1057, '文章模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1058, '标签模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1060, '用户信息模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1063, '菜单模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1064, '角色模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1065, '文章评论模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', '2023-08-16 13:47:19');
INSERT INTO `t_resource` VALUES (1066, '说说模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1067, '资源模块', NULL, NULL, NULL, 0, '2022-08-19 22:26:21', NULL);
INSERT INTO `t_resource` VALUES (1072, '分页模糊查询文章', '/article/page', 'GET', 1057, 0, '2022-08-19 22:26:22', '2023-08-16 12:25:52');
INSERT INTO `t_resource` VALUES (1073, '发布或更新文章', '/article', 'POST', 1057, 0, '2022-08-19 22:26:22', '2023-08-16 12:28:26');
INSERT INTO `t_resource` VALUES (1074, '逻辑删除文章', '/article/:id', 'DELETE', 1057, 0, '2022-08-19 22:26:22', '2023-08-16 16:05:59');
INSERT INTO `t_resource` VALUES (1080, '根据文章id查询文章', '/article/:id', 'GET', 1057, 0, '2022-08-19 22:26:22', '2023-08-16 16:06:09');
INSERT INTO `t_resource` VALUES (1085, '分页查询评论', '/comment/page', 'GET', 1065, 0, '2022-08-19 22:26:22', '2023-08-16 13:50:34');
INSERT INTO `t_resource` VALUES (1086, '逻辑删除评论', '/comment/:id', 'DELETE', 1065, 0, '2022-08-19 22:26:22', '2023-08-16 16:11:30');
INSERT INTO `t_resource` VALUES (1087, '根据id获取单个评论', '/comment/:id', 'GET', 1065, 0, '2022-08-19 22:26:22', '2023-08-16 16:11:37');
INSERT INTO `t_resource` VALUES (1101, '后台获取全部友链', '/friendlink', 'GET', 1052, 0, '2022-08-19 22:26:22', '2023-08-16 13:35:21');
INSERT INTO `t_resource` VALUES (1102, '新增或修改友链', '/friendlink', 'POST', 1052, 0, '2022-08-19 22:26:22', '2023-08-16 13:36:05');
INSERT INTO `t_resource` VALUES (1103, '删除友链', '/friendlink/:id', 'DELETE', 1052, 0, '2022-08-19 22:26:22', '2023-08-16 16:05:42');
INSERT INTO `t_resource` VALUES (1104, '通过菜单名获取菜单', '/menu', 'GET', 1063, 0, '2022-08-19 22:26:22', '2023-08-16 13:40:43');
INSERT INTO `t_resource` VALUES (1105, '新增或修改菜单', '/menu', 'POST', 1063, 0, '2022-08-19 22:26:22', '2023-08-16 13:40:28');
INSERT INTO `t_resource` VALUES (1106, '设置菜单是否隐藏', '/menu/:id/:isHidden', 'GET', 1063, 0, '2022-08-19 22:26:22', '2023-08-16 16:10:24');
INSERT INTO `t_resource` VALUES (1107, '删除菜单', '/menu/:id', 'DELETE', 1063, 0, '2022-08-19 22:26:22', '2023-08-16 16:10:32');
INSERT INTO `t_resource` VALUES (1122, '按资源名获取列表', '/resource', 'GET', 1067, 0, '2022-08-19 22:26:22', '2023-08-16 13:43:57');
INSERT INTO `t_resource` VALUES (1123, '新增或修改资源', '/resource', 'POST', 1067, 0, '2022-08-19 22:26:22', '2023-08-16 13:43:47');
INSERT INTO `t_resource` VALUES (1124, '删除资源', '/resource/:id', 'DELETE', 1067, 0, '2022-08-19 22:26:22', '2023-08-16 16:12:55');
INSERT INTO `t_resource` VALUES (1125, '新建或更新角色', '/role', 'POST', 1064, 0, '2022-08-19 22:26:22', '2023-08-16 13:42:09');
INSERT INTO `t_resource` VALUES (1126, '根据菜单ids查询菜单', '/menu/ids', 'POST', 1063, 0, '2022-08-19 22:26:22', '2023-08-16 13:41:39');
INSERT INTO `t_resource` VALUES (1127, '根据资源ids查询资源', '/resource/ids', 'POST', 1067, 0, '2022-08-19 22:26:22', '2023-08-16 13:44:23');
INSERT INTO `t_resource` VALUES (1128, '删除角色', '/role/:id', 'DELETE', 1064, 0, '2022-08-19 22:26:22', '2023-08-16 16:10:44');
INSERT INTO `t_resource` VALUES (1129, '按角色名获取角色', '/role', 'GET', 1064, 0, '2022-08-19 22:26:22', '2023-08-16 13:42:36');
INSERT INTO `t_resource` VALUES (1130, '根据id新增或更新标签', '/tag', 'POST', 1058, 0, '2022-08-19 22:26:22', '2023-08-16 12:35:26');
INSERT INTO `t_resource` VALUES (1131, '获取所有标签', '/tag', 'GET', 1058, 0, '2022-08-19 22:26:22', '2023-08-16 12:35:41');
INSERT INTO `t_resource` VALUES (1132, '删除标签', '/tag/:id', 'DELETE', 1058, 0, '2022-08-19 22:26:22', '2023-08-16 16:06:18');
INSERT INTO `t_resource` VALUES (1133, '查询单个标签', '/tag/:id', 'GET', 1058, 0, '2022-08-19 22:26:22', '2023-08-16 16:06:23');
INSERT INTO `t_resource` VALUES (1134, '添加或修改说说', '/talk', 'POST', 1066, 0, '2022-08-19 22:26:22', '2023-08-16 13:45:10');
INSERT INTO `t_resource` VALUES (1135, '获取全部公布说说', '/talk', 'GET', 1066, 0, '2022-08-19 22:26:22', '2023-08-16 13:45:22');
INSERT INTO `t_resource` VALUES (1136, '删除说说', '/talk/:id', 'DELETE', 1066, 0, '2022-08-19 22:26:22', '2023-08-16 16:12:41');
INSERT INTO `t_resource` VALUES (1137, '获取单个说说', '/talk/:id', 'GET', 1066, 0, '2022-08-19 22:26:22', '2023-08-16 16:12:46');
INSERT INTO `t_resource` VALUES (1138, '获取全部说说', '/talk/all', 'GET', 1066, 1, '2022-08-19 22:26:22', '2023-08-16 13:45:59');
INSERT INTO `t_resource` VALUES (1142, '新增', '/userinfo', 'POST', 1060, 0, '2022-08-19 22:26:22', '2023-09-02 15:25:06');
INSERT INTO `t_resource` VALUES (1143, '获取单个用户信息', '/userinfo/:id', 'GET', 1060, 0, '2022-08-19 22:26:22', '2023-08-16 16:06:31');
INSERT INTO `t_resource` VALUES (1145, '修改角色禁用状态', '/role/:id/:isDisable', 'GET', 1064, 0, '2022-08-19 22:26:22', '2023-08-16 16:11:17');
INSERT INTO `t_resource` VALUES (1146, '获取所有用户', '/userinfo', 'GET', 1060, 0, '2022-08-19 22:26:22', '2023-08-16 13:30:36');
INSERT INTO `t_resource` VALUES (1151, '获取全部文章（不包含逻辑删除）', '/article', 'GET', 1057, 1, '2022-08-19 22:26:22', '2023-08-16 12:34:12');
INSERT INTO `t_resource` VALUES (1166, '根据文章获取评论', '/comment/article/:articleId', 'GET', 1065, 1, '2022-08-19 22:26:22', '2023-08-16 16:12:00');
INSERT INTO `t_resource` VALUES (1167, '添加评论', '/comment', 'POST', 1065, 0, '2022-08-19 22:26:22', '2023-08-16 13:52:15');
INSERT INTO `t_resource` VALUES (1169, '获取审核通过的友链', '/friendlink/status', 'GET', 1052, 1, '2022-08-19 22:26:22', '2023-08-16 13:37:32');
INSERT INTO `t_resource` VALUES (1176, '分页获取用户', '/userinfo/page', 'POST', 1060, 1, '2022-08-19 22:26:22', '2023-08-16 13:31:36');
INSERT INTO `t_resource` VALUES (1178, '是否禁用用户', '/userinfo/:id', 'POST', 1060, 1, '2022-08-19 22:26:22', '2023-08-16 16:06:37');
INSERT INTO `t_resource` VALUES (1192, '分页获取友链', '/friendlink/page', 'GET', 1052, 0, '2023-08-16 13:37:53', '2023-08-16 13:37:53');
INSERT INTO `t_resource` VALUES (1193, '获取单个友链', '/friendlink/:id', 'GET', 1052, 0, '2023-08-16 13:38:07', '2023-08-16 16:05:48');
INSERT INTO `t_resource` VALUES (1194, '为角色分配菜单', '/role/menu', 'POST', 1064, 0, '2023-08-16 13:43:01', '2023-08-16 13:43:01');
INSERT INTO `t_resource` VALUES (1195, '为角色分配资源', '/role/resource', 'POST', 1064, 0, '2023-08-16 13:43:09', '2023-08-16 13:43:09');
INSERT INTO `t_resource` VALUES (1196, '留言模块', '', '', NULL, 0, '2023-08-16 13:54:28', '2023-08-16 14:10:25');
INSERT INTO `t_resource` VALUES (1197, '发送留言', '/message', 'POST', 1196, 0, '2023-08-16 14:07:48', '2023-08-16 14:07:48');
INSERT INTO `t_resource` VALUES (1198, '获取所有留言', '/message', 'GET', 1196, 0, '2023-08-16 14:08:02', '2023-08-16 14:08:02');
INSERT INTO `t_resource` VALUES (1199, '查询单个留言', '/message/:id', 'GET', 1196, 0, '2023-08-16 14:08:14', '2023-08-16 16:13:10');
INSERT INTO `t_resource` VALUES (1200, '逻辑删除留言', '/message/:id', 'DELETE', 1196, 0, '2023-08-16 14:08:29', '2023-08-16 16:13:19');
INSERT INTO `t_resource` VALUES (1201, '获取最近5条留言', '/message/recent', 'GET', 1196, 0, '2023-08-16 14:08:41', '2023-08-16 14:08:41');
INSERT INTO `t_resource` VALUES (1202, '分页获取留言', '/message/page', 'GET', 1196, 0, '2023-08-16 14:08:48', '2023-08-16 14:08:48');
INSERT INTO `t_resource` VALUES (1203, '说说留言模块', '', '', NULL, 0, '2023-08-16 14:10:45', '2023-08-16 14:21:45');
INSERT INTO `t_resource` VALUES (1204, '发送说说评论', '/talkcomment', 'POST', 1203, 0, '2023-08-16 14:12:17', '2023-08-16 14:12:23');
INSERT INTO `t_resource` VALUES (1207, '查询单个说说评论', '/talkcomment/:id', 'GET', 1203, 0, '2023-08-16 14:16:16', '2023-08-16 16:13:42');
INSERT INTO `t_resource` VALUES (1208, '根据说说获取评论区', '/talkcomment/talk/:talkId', 'GET', 1203, 0, '2023-08-16 14:16:31', '2023-08-16 16:14:22');
INSERT INTO `t_resource` VALUES (1209, '获取所有说说评论', '/talkcomment/', 'GET', 1203, 0, '2023-08-16 14:16:48', '2023-08-16 14:16:48');
INSERT INTO `t_resource` VALUES (1210, '说说评论逻辑删除', '/talkcomment/:id', 'DELETE', 1203, 0, '2023-08-16 14:16:59', '2023-08-16 16:14:00');
INSERT INTO `t_resource` VALUES (1211, '分页获取说说评论', '/talkcomment/page', 'GET', 1203, 0, '2023-08-16 14:17:14', '2023-08-16 14:17:14');
INSERT INTO `t_resource` VALUES (1212, '背景模块', '', '', NULL, 0, '2023-08-16 14:17:39', '2023-08-16 14:17:39');
INSERT INTO `t_resource` VALUES (1213, '创建背景图片', '/back', 'POST', 1212, 0, '2023-08-16 14:17:49', '2023-08-16 14:17:49');
INSERT INTO `t_resource` VALUES (1214, '获取所有背景图片', '/back', 'GET', 1212, 0, '2023-08-16 14:17:57', '2023-08-16 14:17:57');
INSERT INTO `t_resource` VALUES (1215, '删除背景图片', '/back/:id', 'DELETE', 1212, 0, '2023-08-16 14:18:07', '2023-08-16 16:14:53');
INSERT INTO `t_resource` VALUES (1216, '登录模块', '', '', NULL, 0, '2023-08-16 14:18:47', '2023-08-16 14:18:47');
INSERT INTO `t_resource` VALUES (1217, '登录', '/auth/signin', 'POST', 1216, 0, '2023-08-16 14:19:14', '2023-08-16 14:19:14');
INSERT INTO `t_resource` VALUES (1218, '注册', '/auth/signup', 'POST', 1216, 0, '2023-08-16 14:19:22', '2023-08-16 14:19:22');
INSERT INTO `t_resource` VALUES (1219, '文件模块', '', '', NULL, 0, '2023-08-16 14:19:41', '2023-08-16 14:19:41');
INSERT INTO `t_resource` VALUES (1220, '上传文件到数据库', '/file', 'POST', 1219, 0, '2023-08-16 14:19:47', '2023-08-16 14:19:47');
INSERT INTO `t_resource` VALUES (1221, '检验数据库是否有这个图片', '/file/isExit/url', 'GET', 1219, 0, '2023-08-16 14:19:56', '2023-08-16 14:19:56');
INSERT INTO `t_resource` VALUES (1222, '上传图片到minio并存入数据库', '/minio/upload', 'POST', 1219, 0, '2023-08-16 14:21:03', '2023-08-16 14:21:03');
INSERT INTO `t_resource` VALUES (1223, '根据token获取数据', '/userinfo/self', 'GET', 1060, 0, '2023-08-17 10:36:09', '2023-08-17 10:36:09');
INSERT INTO `t_resource` VALUES (1224, '日志模块', '', '', NULL, 0, '2023-09-01 20:41:12', '2023-09-01 20:41:12');
INSERT INTO `t_resource` VALUES (1225, '获取所有异常日志', '/exception-log', 'GET', 1224, 0, '2023-09-01 20:41:38', '2023-09-01 20:41:38');
INSERT INTO `t_resource` VALUES (1226, '批量删除异常日志', '/exception-log/ids', 'POST', 1224, 0, '2023-09-01 20:41:51', '2023-09-01 20:41:51');
INSERT INTO `t_resource` VALUES (1227, '删除异常日志', '/exception-log/:id', 'DELETE', 1224, 0, '2023-09-01 20:42:12', '2023-09-01 20:42:12');
INSERT INTO `t_resource` VALUES (1228, '获取所有操作日志', '/operation-log', 'GET', 1224, 0, '2023-09-01 20:42:32', '2023-09-01 20:42:32');
INSERT INTO `t_resource` VALUES (1229, '批量删除操作日志', '/operation-log/ids', 'POST', 1224, 0, '2023-09-01 20:42:46', '2023-09-01 20:42:46');
INSERT INTO `t_resource` VALUES (1230, '删除操作日志', '/operation-log/:id', 'DELETE', 1224, 0, '2023-09-01 20:43:03', '2023-09-01 20:43:03');
INSERT INTO `t_resource` VALUES (1231, '修改用户', '/userinfo/update', 'POST', 1060, 0, '2023-09-02 15:25:25', '2023-09-02 15:25:25');
INSERT INTO `t_resource` VALUES (1232, '分页查询操作日志', '/operation-log/page', 'GET', 1224, 0, '2023-09-03 11:45:38', '2023-09-03 11:45:38');
INSERT INTO `t_resource` VALUES (1233, '分页查询异常日志', '/exception-log/page', 'GET', 1224, 0, '2023-09-03 11:45:50', '2023-09-03 11:45:50');
INSERT INTO `t_resource` VALUES (1237, '浏览模块', '', '', NULL, 0, '2023-09-07 22:10:46', '2023-09-07 22:10:46');
INSERT INTO `t_resource` VALUES (1238, '获取网站浏览量', '/views/cnt', 'GET', 1237, 0, '2023-09-07 22:11:19', '2023-09-07 22:11:19');
INSERT INTO `t_resource` VALUES (1239, '新增浏览量', '/views', 'POST', 1237, 0, '2023-09-07 22:11:28', '2023-09-07 22:11:28');
INSERT INTO `t_resource` VALUES (1240, '批量删除浏览记录', '/views/ids', 'POST', 1237, 0, '2023-09-07 22:11:37', '2023-09-07 22:11:37');
INSERT INTO `t_resource` VALUES (1241, '删除浏览记录', '/views/:id', 'DELETE', 1237, 0, '2023-09-07 22:11:51', '2023-09-07 22:11:51');
INSERT INTO `t_resource` VALUES (1242, '聊天模块', '', '', NULL, 0, '2023-09-07 22:12:04', '2023-09-07 22:12:04');
INSERT INTO `t_resource` VALUES (1243, '获取全部聊天', '/chat', 'GET', 1242, 0, '2023-09-07 22:12:16', '2023-09-07 22:12:16');
INSERT INTO `t_resource` VALUES (1244, '发送聊天', '/chat', 'POST', 1242, 0, '2023-09-07 22:12:25', '2023-09-07 22:12:25');
INSERT INTO `t_resource` VALUES (1245, '删除聊天', '/chat/:id', 'DELETE', 1242, 0, '2023-09-07 22:12:40', '2023-09-07 22:12:40');
INSERT INTO `t_resource` VALUES (1246, '批量删除聊天', '/chat/ids', 'POST', 1242, 0, '2023-09-07 22:12:49', '2023-09-07 22:12:49');
INSERT INTO `t_resource` VALUES (1247, '分页获取聊天', '/chat/page', 'GET', 1242, 0, '2023-09-14 21:13:01', '2023-09-14 21:13:01');
INSERT INTO `t_resource` VALUES (1249, '', '', 'PATCH', 1060, 0, '2023-09-20 09:52:09', '2023-09-20 09:52:09');

-- ----------------------------
-- Table structure for t_role
-- ----------------------------
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE `t_role`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `role_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名',
  `is_disable` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否禁用  0否 1是',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 103 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role
-- ----------------------------
INSERT INTO `t_role` VALUES (1, 'admin', 0, '2022-07-20 13:25:19', '2023-09-21 09:46:30');
INSERT INTO `t_role` VALUES (2, 'user', 0, '2022-07-20 13:25:40', '2023-09-20 10:11:41');
INSERT INTO `t_role` VALUES (14, 'test', 0, '2022-08-19 21:48:14', '2023-09-21 09:45:18');
INSERT INTO `t_role` VALUES (102, 'abc', 0, '2023-08-14 14:16:02', '2023-08-14 14:16:02');

-- ----------------------------
-- Table structure for t_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `t_role_menu`;
CREATE TABLE `t_role_menu`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role_id` int(0) NULL DEFAULT NULL COMMENT '角色id',
  `menu_id` int(0) NULL DEFAULT NULL COMMENT '菜单id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `roleId_menu`(`role_id`) USING BTREE,
  INDEX `menuId`(`menu_id`) USING BTREE,
  CONSTRAINT `menuId` FOREIGN KEY (`menu_id`) REFERENCES `t_menu` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `roleId_menu` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3806 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role_menu
-- ----------------------------
INSERT INTO `t_role_menu` VALUES (3468, 102, 1);
INSERT INTO `t_role_menu` VALUES (3469, 102, 2);
INSERT INTO `t_role_menu` VALUES (3470, 102, 6);
INSERT INTO `t_role_menu` VALUES (3471, 102, 7);
INSERT INTO `t_role_menu` VALUES (3472, 102, 8);
INSERT INTO `t_role_menu` VALUES (3473, 102, 10);
INSERT INTO `t_role_menu` VALUES (3582, 14, 1);
INSERT INTO `t_role_menu` VALUES (3583, 14, 2);
INSERT INTO `t_role_menu` VALUES (3584, 14, 6);
INSERT INTO `t_role_menu` VALUES (3585, 14, 7);
INSERT INTO `t_role_menu` VALUES (3586, 14, 8);
INSERT INTO `t_role_menu` VALUES (3587, 14, 10);
INSERT INTO `t_role_menu` VALUES (3588, 14, 213);
INSERT INTO `t_role_menu` VALUES (3589, 14, 14);
INSERT INTO `t_role_menu` VALUES (3590, 14, 15);
INSERT INTO `t_role_menu` VALUES (3591, 14, 16);
INSERT INTO `t_role_menu` VALUES (3592, 14, 3);
INSERT INTO `t_role_menu` VALUES (3593, 14, 11);
INSERT INTO `t_role_menu` VALUES (3594, 14, 234);
INSERT INTO `t_role_menu` VALUES (3595, 14, 235);
INSERT INTO `t_role_menu` VALUES (3596, 14, 242);
INSERT INTO `t_role_menu` VALUES (3597, 14, 4);
INSERT INTO `t_role_menu` VALUES (3598, 14, 17);
INSERT INTO `t_role_menu` VALUES (3599, 14, 221);
INSERT INTO `t_role_menu` VALUES (3600, 14, 222);
INSERT INTO `t_role_menu` VALUES (3601, 14, 223);
INSERT INTO `t_role_menu` VALUES (3602, 14, 224);
INSERT INTO `t_role_menu` VALUES (3603, 14, 202);
INSERT INTO `t_role_menu` VALUES (3604, 14, 13);
INSERT INTO `t_role_menu` VALUES (3605, 14, 237);
INSERT INTO `t_role_menu` VALUES (3606, 14, 238);
INSERT INTO `t_role_menu` VALUES (3607, 14, 239);
INSERT INTO `t_role_menu` VALUES (3608, 14, 240);
INSERT INTO `t_role_menu` VALUES (3609, 14, 241);
INSERT INTO `t_role_menu` VALUES (3693, 2, 1);
INSERT INTO `t_role_menu` VALUES (3694, 2, 2);
INSERT INTO `t_role_menu` VALUES (3695, 2, 6);
INSERT INTO `t_role_menu` VALUES (3696, 2, 7);
INSERT INTO `t_role_menu` VALUES (3697, 2, 8);
INSERT INTO `t_role_menu` VALUES (3698, 2, 10);
INSERT INTO `t_role_menu` VALUES (3699, 2, 213);
INSERT INTO `t_role_menu` VALUES (3700, 2, 14);
INSERT INTO `t_role_menu` VALUES (3701, 2, 15);
INSERT INTO `t_role_menu` VALUES (3702, 2, 16);
INSERT INTO `t_role_menu` VALUES (3703, 2, 3);
INSERT INTO `t_role_menu` VALUES (3704, 2, 11);
INSERT INTO `t_role_menu` VALUES (3705, 2, 234);
INSERT INTO `t_role_menu` VALUES (3706, 2, 235);
INSERT INTO `t_role_menu` VALUES (3707, 2, 242);
INSERT INTO `t_role_menu` VALUES (3708, 2, 4);
INSERT INTO `t_role_menu` VALUES (3709, 2, 244);
INSERT INTO `t_role_menu` VALUES (3710, 2, 17);
INSERT INTO `t_role_menu` VALUES (3711, 2, 221);
INSERT INTO `t_role_menu` VALUES (3712, 2, 222);
INSERT INTO `t_role_menu` VALUES (3713, 2, 223);
INSERT INTO `t_role_menu` VALUES (3714, 2, 224);
INSERT INTO `t_role_menu` VALUES (3715, 2, 202);
INSERT INTO `t_role_menu` VALUES (3716, 2, 13);
INSERT INTO `t_role_menu` VALUES (3717, 2, 237);
INSERT INTO `t_role_menu` VALUES (3718, 2, 238);
INSERT INTO `t_role_menu` VALUES (3719, 2, 239);
INSERT INTO `t_role_menu` VALUES (3720, 2, 240);
INSERT INTO `t_role_menu` VALUES (3721, 2, 241);
INSERT INTO `t_role_menu` VALUES (3777, 1, 1);
INSERT INTO `t_role_menu` VALUES (3778, 1, 2);
INSERT INTO `t_role_menu` VALUES (3779, 1, 6);
INSERT INTO `t_role_menu` VALUES (3780, 1, 7);
INSERT INTO `t_role_menu` VALUES (3781, 1, 8);
INSERT INTO `t_role_menu` VALUES (3782, 1, 10);
INSERT INTO `t_role_menu` VALUES (3783, 1, 213);
INSERT INTO `t_role_menu` VALUES (3784, 1, 14);
INSERT INTO `t_role_menu` VALUES (3785, 1, 15);
INSERT INTO `t_role_menu` VALUES (3786, 1, 16);
INSERT INTO `t_role_menu` VALUES (3787, 1, 3);
INSERT INTO `t_role_menu` VALUES (3788, 1, 11);
INSERT INTO `t_role_menu` VALUES (3789, 1, 234);
INSERT INTO `t_role_menu` VALUES (3790, 1, 235);
INSERT INTO `t_role_menu` VALUES (3791, 1, 242);
INSERT INTO `t_role_menu` VALUES (3792, 1, 4);
INSERT INTO `t_role_menu` VALUES (3793, 1, 244);
INSERT INTO `t_role_menu` VALUES (3794, 1, 17);
INSERT INTO `t_role_menu` VALUES (3795, 1, 221);
INSERT INTO `t_role_menu` VALUES (3796, 1, 222);
INSERT INTO `t_role_menu` VALUES (3797, 1, 223);
INSERT INTO `t_role_menu` VALUES (3798, 1, 224);
INSERT INTO `t_role_menu` VALUES (3799, 1, 202);
INSERT INTO `t_role_menu` VALUES (3800, 1, 13);
INSERT INTO `t_role_menu` VALUES (3801, 1, 237);
INSERT INTO `t_role_menu` VALUES (3802, 1, 238);
INSERT INTO `t_role_menu` VALUES (3803, 1, 239);
INSERT INTO `t_role_menu` VALUES (3804, 1, 240);
INSERT INTO `t_role_menu` VALUES (3805, 1, 241);

-- ----------------------------
-- Table structure for t_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `t_role_resource`;
CREATE TABLE `t_role_resource`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `role_id` int(0) NULL DEFAULT NULL COMMENT '角色id',
  `resource_id` int(0) NULL DEFAULT NULL COMMENT '权限id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `roleId`(`role_id`) USING BTREE,
  INDEX `resourceId`(`resource_id`) USING BTREE,
  CONSTRAINT `resourceId` FOREIGN KEY (`resource_id`) REFERENCES `t_resource` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `roleId` FOREIGN KEY (`role_id`) REFERENCES `t_role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10875 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_role_resource
-- ----------------------------
INSERT INTO `t_role_resource` VALUES (10775, 1, 1052);
INSERT INTO `t_role_resource` VALUES (10776, 1, 1101);
INSERT INTO `t_role_resource` VALUES (10777, 1, 1102);
INSERT INTO `t_role_resource` VALUES (10778, 1, 1103);
INSERT INTO `t_role_resource` VALUES (10779, 1, 1169);
INSERT INTO `t_role_resource` VALUES (10780, 1, 1192);
INSERT INTO `t_role_resource` VALUES (10781, 1, 1193);
INSERT INTO `t_role_resource` VALUES (10782, 1, 1057);
INSERT INTO `t_role_resource` VALUES (10783, 1, 1072);
INSERT INTO `t_role_resource` VALUES (10784, 1, 1073);
INSERT INTO `t_role_resource` VALUES (10785, 1, 1074);
INSERT INTO `t_role_resource` VALUES (10786, 1, 1080);
INSERT INTO `t_role_resource` VALUES (10787, 1, 1151);
INSERT INTO `t_role_resource` VALUES (10788, 1, 1058);
INSERT INTO `t_role_resource` VALUES (10789, 1, 1130);
INSERT INTO `t_role_resource` VALUES (10790, 1, 1131);
INSERT INTO `t_role_resource` VALUES (10791, 1, 1132);
INSERT INTO `t_role_resource` VALUES (10792, 1, 1133);
INSERT INTO `t_role_resource` VALUES (10793, 1, 1060);
INSERT INTO `t_role_resource` VALUES (10794, 1, 1142);
INSERT INTO `t_role_resource` VALUES (10795, 1, 1143);
INSERT INTO `t_role_resource` VALUES (10796, 1, 1146);
INSERT INTO `t_role_resource` VALUES (10797, 1, 1176);
INSERT INTO `t_role_resource` VALUES (10798, 1, 1178);
INSERT INTO `t_role_resource` VALUES (10799, 1, 1223);
INSERT INTO `t_role_resource` VALUES (10800, 1, 1231);
INSERT INTO `t_role_resource` VALUES (10801, 1, 1063);
INSERT INTO `t_role_resource` VALUES (10802, 1, 1104);
INSERT INTO `t_role_resource` VALUES (10803, 1, 1105);
INSERT INTO `t_role_resource` VALUES (10804, 1, 1106);
INSERT INTO `t_role_resource` VALUES (10805, 1, 1107);
INSERT INTO `t_role_resource` VALUES (10806, 1, 1126);
INSERT INTO `t_role_resource` VALUES (10807, 1, 1064);
INSERT INTO `t_role_resource` VALUES (10808, 1, 1125);
INSERT INTO `t_role_resource` VALUES (10809, 1, 1128);
INSERT INTO `t_role_resource` VALUES (10810, 1, 1129);
INSERT INTO `t_role_resource` VALUES (10811, 1, 1145);
INSERT INTO `t_role_resource` VALUES (10812, 1, 1194);
INSERT INTO `t_role_resource` VALUES (10813, 1, 1195);
INSERT INTO `t_role_resource` VALUES (10814, 1, 1065);
INSERT INTO `t_role_resource` VALUES (10815, 1, 1085);
INSERT INTO `t_role_resource` VALUES (10816, 1, 1086);
INSERT INTO `t_role_resource` VALUES (10817, 1, 1087);
INSERT INTO `t_role_resource` VALUES (10818, 1, 1166);
INSERT INTO `t_role_resource` VALUES (10819, 1, 1167);
INSERT INTO `t_role_resource` VALUES (10820, 1, 1066);
INSERT INTO `t_role_resource` VALUES (10821, 1, 1134);
INSERT INTO `t_role_resource` VALUES (10822, 1, 1135);
INSERT INTO `t_role_resource` VALUES (10823, 1, 1136);
INSERT INTO `t_role_resource` VALUES (10824, 1, 1137);
INSERT INTO `t_role_resource` VALUES (10825, 1, 1138);
INSERT INTO `t_role_resource` VALUES (10826, 1, 1067);
INSERT INTO `t_role_resource` VALUES (10827, 1, 1122);
INSERT INTO `t_role_resource` VALUES (10828, 1, 1123);
INSERT INTO `t_role_resource` VALUES (10829, 1, 1124);
INSERT INTO `t_role_resource` VALUES (10830, 1, 1127);
INSERT INTO `t_role_resource` VALUES (10831, 1, 1196);
INSERT INTO `t_role_resource` VALUES (10832, 1, 1197);
INSERT INTO `t_role_resource` VALUES (10833, 1, 1198);
INSERT INTO `t_role_resource` VALUES (10834, 1, 1199);
INSERT INTO `t_role_resource` VALUES (10835, 1, 1200);
INSERT INTO `t_role_resource` VALUES (10836, 1, 1201);
INSERT INTO `t_role_resource` VALUES (10837, 1, 1202);
INSERT INTO `t_role_resource` VALUES (10838, 1, 1203);
INSERT INTO `t_role_resource` VALUES (10839, 1, 1204);
INSERT INTO `t_role_resource` VALUES (10840, 1, 1207);
INSERT INTO `t_role_resource` VALUES (10841, 1, 1208);
INSERT INTO `t_role_resource` VALUES (10842, 1, 1209);
INSERT INTO `t_role_resource` VALUES (10843, 1, 1210);
INSERT INTO `t_role_resource` VALUES (10844, 1, 1211);
INSERT INTO `t_role_resource` VALUES (10845, 1, 1212);
INSERT INTO `t_role_resource` VALUES (10846, 1, 1213);
INSERT INTO `t_role_resource` VALUES (10847, 1, 1214);
INSERT INTO `t_role_resource` VALUES (10848, 1, 1215);
INSERT INTO `t_role_resource` VALUES (10849, 1, 1216);
INSERT INTO `t_role_resource` VALUES (10850, 1, 1217);
INSERT INTO `t_role_resource` VALUES (10851, 1, 1218);
INSERT INTO `t_role_resource` VALUES (10852, 1, 1219);
INSERT INTO `t_role_resource` VALUES (10853, 1, 1220);
INSERT INTO `t_role_resource` VALUES (10854, 1, 1221);
INSERT INTO `t_role_resource` VALUES (10855, 1, 1222);
INSERT INTO `t_role_resource` VALUES (10856, 1, 1224);
INSERT INTO `t_role_resource` VALUES (10857, 1, 1225);
INSERT INTO `t_role_resource` VALUES (10858, 1, 1226);
INSERT INTO `t_role_resource` VALUES (10859, 1, 1227);
INSERT INTO `t_role_resource` VALUES (10860, 1, 1228);
INSERT INTO `t_role_resource` VALUES (10861, 1, 1229);
INSERT INTO `t_role_resource` VALUES (10862, 1, 1230);
INSERT INTO `t_role_resource` VALUES (10863, 1, 1232);
INSERT INTO `t_role_resource` VALUES (10864, 1, 1233);
INSERT INTO `t_role_resource` VALUES (10865, 1, 1237);
INSERT INTO `t_role_resource` VALUES (10866, 1, 1238);
INSERT INTO `t_role_resource` VALUES (10867, 1, 1239);
INSERT INTO `t_role_resource` VALUES (10868, 1, 1240);
INSERT INTO `t_role_resource` VALUES (10869, 1, 1241);
INSERT INTO `t_role_resource` VALUES (10870, 1, 1243);
INSERT INTO `t_role_resource` VALUES (10871, 1, 1244);
INSERT INTO `t_role_resource` VALUES (10872, 1, 1245);
INSERT INTO `t_role_resource` VALUES (10873, 1, 1246);
INSERT INTO `t_role_resource` VALUES (10874, 1, 1247);

-- ----------------------------
-- Table structure for t_tag
-- ----------------------------
DROP TABLE IF EXISTS `t_tag`;
CREATE TABLE `t_tag`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '标签名',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_tag
-- ----------------------------
INSERT INTO `t_tag` VALUES (41, 'Java', '2023-07-19 15:46:52', '2023-07-29 10:31:34');
INSERT INTO `t_tag` VALUES (42, 'Javascript', '2023-07-19 15:51:12', '2023-07-19 16:02:21');
INSERT INTO `t_tag` VALUES (43, 'Vue', '2023-07-19 16:02:28', '2023-07-19 16:02:28');
INSERT INTO `t_tag` VALUES (44, 'Spingboot', '2023-07-19 16:02:35', '2023-07-19 16:02:35');
INSERT INTO `t_tag` VALUES (45, 'CSS', '2023-07-19 16:02:40', '2023-07-19 16:02:40');
INSERT INTO `t_tag` VALUES (46, '算法', '2023-07-19 16:02:50', '2023-07-19 16:02:50');
INSERT INTO `t_tag` VALUES (47, '小程序', '2023-07-19 16:02:58', '2023-07-19 16:02:58');
INSERT INTO `t_tag` VALUES (51, 'nest', '2023-09-17 11:05:23', '2023-09-17 11:05:23');

-- ----------------------------
-- Table structure for t_talk
-- ----------------------------
DROP TABLE IF EXISTS `t_talk`;
CREATE TABLE `t_talk`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '说说id',
  `user_id` int(0) NOT NULL DEFAULT 1 COMMENT '用户id',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '说说内容',
  `images` varchar(2500) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片',
  `is_top` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否置顶',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态 1.公开 2.私密',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `views` int(0) NOT NULL DEFAULT 0 COMMENT '浏览量',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `talk_userId`(`user_id`) USING BTREE,
  CONSTRAINT `talk_userId` FOREIGN KEY (`user_id`) REFERENCES `t_user_info` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 71 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_talk
-- ----------------------------

-- ----------------------------
-- Table structure for t_talk_comment
-- ----------------------------
DROP TABLE IF EXISTS `t_talk_comment`;
CREATE TABLE `t_talk_comment`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` int(0) NOT NULL COMMENT '评论用户Id',
  `comment_content` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `reply_comment_id` int(0) NULL DEFAULT NULL COMMENT '回复评论的id',
  `parent_id` int(0) NULL DEFAULT NULL COMMENT '父评论id',
  `is_delete` tinyint(0) NOT NULL DEFAULT 0 COMMENT '是否删除  0否 1是',
  `is_review` tinyint(1) NOT NULL DEFAULT 1 COMMENT '是否审核',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '评论时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `talk_id` int(0) NOT NULL COMMENT '说说id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_comment_user`(`user_id`) USING BTREE,
  INDEX `fk_comment_parent`(`parent_id`) USING BTREE,
  INDEX `comment_articleId`(`talk_id`) USING BTREE,
  CONSTRAINT `tacomment_talkId` FOREIGN KEY (`talk_id`) REFERENCES `t_talk` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `tacomment_userId` FOREIGN KEY (`user_id`) REFERENCES `t_user_info` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1042 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_talk_comment
-- ----------------------------

-- ----------------------------
-- Table structure for t_user_info
-- ----------------------------
DROP TABLE IF EXISTS `t_user_info`;
CREATE TABLE `t_user_info`  (
  `id` int(0) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱号',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户昵称',
  `avatar` varchar(1024) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '用户简介',
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '个人网站',
  `is_subscribe` tinyint(1) NULL DEFAULT NULL COMMENT '是否订阅',
  `is_disable` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否禁用',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  `update_time` datetime(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '更新时间',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `user_roleId` int(0) NULL DEFAULT 2 COMMENT '所属角色',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_roleId`(`user_roleId`) USING BTREE,
  CONSTRAINT `user_roleId` FOREIGN KEY (`user_roleId`) REFERENCES `t_role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1129 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_user_info
-- ----------------------------
INSERT INTO `t_user_info` VALUES (0, NULL, '游客', 'http://43.138.109.120:9000/avatar/2785e109706e4376a7fa06a1c5c65a59_1666582417286.png', NULL, NULL, NULL, 0, '2023-07-19 16:18:02', '2023-10-04 20:31:22', '123', 2);
INSERT INTO `t_user_info` VALUES (69, '', 'qwe', 'http://43.138.109.120:9000/avatar/2785e109706e4376a7fa06a1c5c65a59_1666582417286.png', NULL, NULL, NULL, 0, '2023-07-19 16:13:04', '2023-09-02 17:57:00', '$10$2uTW7kPNPIW7LXdhVkKdXOSrin1sq5rMooHh5G5B3GmgTYn.lVO82', 2);
INSERT INTO `t_user_info` VALUES (101, NULL, 'leo', '', NULL, NULL, NULL, 0, '2023-07-21 10:21:33', '2023-07-21 10:21:33', '', 2);
INSERT INTO `t_user_info` VALUES (103, NULL, 'qkl', '', NULL, NULL, NULL, 0, '2023-07-21 16:03:35', '2023-08-09 17:29:46', '123', 2);
INSERT INTO `t_user_info` VALUES (104, NULL, 'test', '', NULL, NULL, NULL, 0, '2023-07-21 10:22:03', '2023-08-09 17:29:48', '123', 2);
INSERT INTO `t_user_info` VALUES (105, NULL, '123123', '', NULL, NULL, NULL, 0, '2023-07-21 16:01:07', '2023-07-21 16:01:07', '', 2);
INSERT INTO `t_user_info` VALUES (106, NULL, 'yueze', '', NULL, NULL, NULL, 0, '2023-07-21 10:22:14', '2023-07-21 10:22:14', '', 2);
INSERT INTO `t_user_info` VALUES (107, NULL, 'yueze', '', NULL, NULL, NULL, 0, '2023-07-21 16:05:43', '2023-07-21 16:05:43', '', 2);
INSERT INTO `t_user_info` VALUES (109, NULL, 'ikun', '', NULL, NULL, NULL, 0, '2023-07-19 16:19:11', '2023-07-19 16:19:11', '', 2);
INSERT INTO `t_user_info` VALUES (115, NULL, 'hhcgv126', '', NULL, NULL, NULL, 0, '2023-07-21 16:03:01', '2023-07-21 16:03:01', '', 2);
INSERT INTO `t_user_info` VALUES (116, NULL, 'lemon', '', NULL, NULL, NULL, 0, '2023-07-19 16:19:23', '2023-07-19 16:19:23', '', 2);
INSERT INTO `t_user_info` VALUES (806, NULL, '016016', '', NULL, NULL, NULL, 0, '2023-07-21 10:23:57', '2023-07-21 10:24:36', '', 2);
INSERT INTO `t_user_info` VALUES (841, NULL, '对方正在输入中……', '', NULL, NULL, NULL, 0, '2023-07-21 10:31:16', '2023-07-21 10:31:16', '', 2);
INSERT INTO `t_user_info` VALUES (842, NULL, '睡个好觉', '', NULL, NULL, NULL, 0, '2023-07-21 10:31:27', '2023-07-21 10:31:27', '', 2);
INSERT INTO `t_user_info` VALUES (1025, '', 'abc', '', '', '', NULL, 1, '2023-07-22 13:48:50', '2023-08-07 17:56:19', 'test', 2);
INSERT INTO `t_user_info` VALUES (1026, '', 'abc', '', '', '', NULL, 1, '2023-07-30 16:01:21', '2023-08-08 09:55:00', 'test', 2);
INSERT INTO `t_user_info` VALUES (1043, NULL, 'test1', '', NULL, NULL, NULL, 0, '2023-08-09 17:04:28', '2023-08-09 17:04:28', '$2b$10$RfYK3LdPzlnaSfKZF7Kch.6buDrM/ZwyM8FT57OWlt6VRy8ZnRWuO', 2);
INSERT INTO `t_user_info` VALUES (1044, NULL, 'test123', '', NULL, NULL, NULL, 0, '2023-08-09 17:43:44', '2023-08-09 17:43:44', '$2b$10$lZLyeUM8bEuu173o.RYjn.UXQ2sQqmxhR2/ETgzyr/eJQzhJwElXe', 2);
INSERT INTO `t_user_info` VALUES (1045, NULL, 'abcd', '', NULL, NULL, NULL, 0, '2023-08-10 10:28:20', '2023-08-10 10:28:20', '$2b$10$wUX/V9DiXqRKZA6Q/glcVOnAgzgTDJ1Q.ryhyBifCTBAMEztz2m8G', 2);
INSERT INTO `t_user_info` VALUES (1046, NULL, 'abcd1', '', NULL, NULL, NULL, 0, '2023-08-10 10:29:32', '2023-08-10 10:29:32', '$2b$10$6d2Frma1gjxZBJT1nqnNZukptI4evxkmm7YvLOjaowIo5bG.IkGYe', 2);
INSERT INTO `t_user_info` VALUES (1047, NULL, 'abcd123', '', NULL, NULL, NULL, 0, '2023-08-15 11:15:28', '2023-09-11 22:03:42', '$2b$10$LpElxJdBMP0677KXweTmie.FLRL04TqcyVAamzFNaQ0kHPHgsNAWG', 2);
INSERT INTO `t_user_info` VALUES (1090, NULL, '演示账号123', '', NULL, NULL, NULL, 0, '2023-09-02 17:56:28', '2023-09-02 17:56:28', '$2b$10$2uTW7kPNPIW7LXdhVkKdXOSrin1sq5rMooHh5G5B3GmgTYn.lVO82', 2);
INSERT INTO `t_user_info` VALUES (1109, NULL, 'qweasd', '', NULL, NULL, NULL, 0, '2023-09-02 20:59:34', '2023-09-02 20:59:34', '$2b$10$ZAG2GGcDPLzNbprbwGNpruRjb7hBi/LTychCNoki2pjWoetN2.DSG', 2);
INSERT INTO `t_user_info` VALUES (1110, NULL, 'kkkk', '', NULL, NULL, NULL, 0, '2023-09-02 21:06:31', '2023-09-02 21:06:31', '$2b$10$x85m2MzGTxfNviL2lhgKJeG4W6OZ7qx9xbhlxKLmszyJEI4Ked.5G', 2);
INSERT INTO `t_user_info` VALUES (1117, NULL, 'test@123', 'http://43.138.109.120:9000/avatar/67813ea8edd4fc69a3f1a6b4611d656f.png', '大帅哥', NULL, NULL, 0, '2023-09-02 21:20:54', '2023-09-20 15:25:05', '$2b$10$6qh6DY6G0CDL7WKMAIbrf.UusNjUT0Yn/ChCAwDJQlX9KU.xHqIIO', 2);
INSERT INTO `t_user_info` VALUES (1119, NULL, 'abctest', '', NULL, NULL, NULL, 0, '2023-09-16 21:43:28', '2023-09-16 21:43:28', '$2b$10$ifLZfcm00ezG.ykQW/6ToOIfjv4yikVW3dS4I61LsW7qo.dHRyvku', 2);
INSERT INTO `t_user_info` VALUES (1120, NULL, 'kbc', '', NULL, NULL, NULL, 0, '2023-09-16 21:56:48', '2023-09-16 21:56:48', '$2b$10$IgZuHvnrNjRAE5Rb7JkaDuucR7QfTH.0Ks41iqPt/joc5RloIl2.K', 2);
INSERT INTO `t_user_info` VALUES (1121, NULL, 'testaaa', '', NULL, NULL, NULL, 0, '2023-09-20 20:47:47', '2023-09-20 20:47:47', '$2b$10$QNwWWFQo5eLCqfNtQRkhLeJz.M.2Qfi3tLwCEhH0/e.zyLHakfqHm', 2);
INSERT INTO `t_user_info` VALUES (1122, NULL, 'youke1', '', NULL, NULL, NULL, 0, '2023-09-23 17:25:37', '2023-09-23 17:25:37', '$2b$10$3FUpaHmvs8RwrB8CPsCeu.NsjqBsDaBEGgOlwiPmfx2P43yZ3IuIe', 2);
INSERT INTO `t_user_info` VALUES (1123, NULL, 'chandler', '', NULL, NULL, NULL, 0, '2023-09-25 10:56:50', '2023-09-25 10:56:50', '$2b$10$ZPWeTWLNwPq88bOoS1LbseoMF6PleetdcxRYb4OrcqUm4GkjMTQiy', 2);
INSERT INTO `t_user_info` VALUES (1124, NULL, '111', '', NULL, NULL, NULL, 0, '2023-09-25 16:23:03', '2023-09-25 16:23:03', '$2b$10$Fg1maeet5ThxR9RiZq1L6ujYONX2ZYvl1VsN9n88n26AnpDlKHNB6', 2);
INSERT INTO `t_user_info` VALUES (1125, NULL, 'testabc', '', NULL, NULL, NULL, 0, '2023-09-28 21:28:40', '2023-09-28 21:28:40', '$2b$10$WBgNvYWWFvGcX4x3P01vl.jCIDHcTTVl4Kr9e2Mq1dsFVHCPfFaRi', 2);
INSERT INTO `t_user_info` VALUES (1126, NULL, 't123', '', NULL, NULL, NULL, 0, '2023-10-01 17:43:36', '2023-10-01 17:43:36', '$2b$10$x5wOoJqgjtBKZ7axQRFv/uNXg7J0wlxnHs.PE2AkT22JYfX6GqnDC', 2);
INSERT INTO `t_user_info` VALUES (1127, NULL, 'aliali', '', NULL, NULL, NULL, 0, '2023-10-04 16:13:21', '2023-10-04 16:13:21', '$2b$10$P.Gb4cMnL0dNsOtc.9y3NO2AyKN9NmBvsBIogGGQkrJqET.m0Az2K', 2);

-- ----------------------------
-- Table structure for t_views
-- ----------------------------
DROP TABLE IF EXISTS `t_views`;
CREATE TABLE `t_views`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `ip` varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'ip地址',
  `address` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '物理地址',
  `create_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0) COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3165 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_views
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
