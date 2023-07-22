<template>
  <div class="comment-container">
    <div class="first">
      <svg-icon
        icon-class="comment"
        size="1.6rem"
        style="margin-right: 5px"
      ></svg-icon>
      评论区
    </div>
    <div class="text">
      <div>
        <img class="img rorate" src="@/assets/images/default.png" alt="" />
      </div>
      <input
        :value="content"
        @input="bindSend"
        type="text"
        placeholder="发一条友善的评论吧"
        class="comment input-lg"
      />
    </div>
    <div class="btn-flex">
      <button class="btn btn-info btn-md send" @click="send">发送</button>
    </div>
    <hr class="hr" />

    <!-- 所有的评论列表 -->
    <div class="comment-list">
      <div v-for="comment in commentList" :key="comment.id">

        <!-- 一级评论 -->
        <div class="comment">
          <div class="rorate">
            <img class="img" v-lazy="comment.userinfo.nickname" alt="" />
          </div>
          <div class="comment-detail">
            <div class="content">
              {{ comment.commentContent }}
            </div>
            <div class="meta">
              <div class="name">{{ comment.userinfo.nickname }}</div>
              <div class="time">{{ formatDateTime(comment.createTime) }}</div>
              <div class="operate">
                <div class="reply" @click="replyPid(comment.id)">回复</div>
                <el-popconfirm
                  v-if="comment.userId == userInfo.user?.id"
                  title="你确定要删除评论吗?"
                  @confirm="deleteComment(comment.id)"
                >
                  <template #reference>
                    <div class="delete">删除</div>
                  </template>
                </el-popconfirm>
              </div>
            </div>
          </div>
        </div>

        <!-- 回复一级评论的出现的评论框 -->
        <div class="reply-content" v-if="comment.id == commentParams.parentId&&commentParams.replyCommentId==null">
          <div>
            <img class="img rorate" v-lazy="userInfo.user?.avatarUrl" alt="" />
          </div>
          <div class="reply-detail">
            <div class="cmtctt">
              <textarea
                v-model="replyContent"
                class="rpy"
                :placeholder="'@' + comment.userinfo.nickname"
              ></textarea>
              <span
              class="spanText"
                @click="send"
                >发布
              </span>
              <span
              class="spanText"
                @click="cancel"
                >取消
              </span>
            </div>
          </div>
        </div>

        <!-- 二级评论列表(包含有回复人和没回复人) -->
        <div class="reply-list" v-if="comment.children">
          <div v-for="reply in comment.children" :key="reply.id">
            <div class="comment">
              <div class="rorate">
                <img class="img" v-lazy="reply.userinfo.avatar" alt="" />
              </div>
              <div class="comment-detail">
                <div class="content">
                  <span style="color: #ff0099">{{ reply.replyInfo.nickname? `@${reply.replyInfo.nickname}` : ""}}</span>
                  {{reply.commentContent }}
                </div>
                <div class="meta">
                  <div class="name">{{ reply.userinfo.nickname }}</div>
                  <div class="time">{{ formatDateTime(reply.createTime)  }}</div>
                  <!-- 触发二级评论回复别人的评论框 -->
                  <div class="operate">
                    <div class="reply" @click="replyCid(comment.id,reply.id)">回复</div>
                    <el-popconfirm
                      v-if="reply.userId == userInfo.user?.id"
                      title="你确定要删除评论吗?"
                      @confirm="deleteComment(reply.id)"
                    >
                      <template #reference>
                        <div class="delete">删除</div>
                      </template>
                    </el-popconfirm>
                  </div>
                </div>
              </div>
            </div>

            <!-- 回复二级评论出现的评论框 -->
            <div class="reply-content" v-if="reply.id == commentParams.replyCommentId">
              <div>
                <img
                  class="img rorate"
                  v-lazy="userInfo.user?.avatarUrl"
                  alt=""
                />
              </div>
              <div class="reply-detail">
                <div class="cmtctt">
                  <textarea
                    v-model="replyContent"
                    class="rpy"
                    :placeholder="'@' + reply.userinfo.nickname"
                  ></textarea>
                  <span
                    class="spanText"
                    @click="send"
                    >发布
                  </span>
                  <span
                  class="spanText"
                    @click="cancel"
                    >取消
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDateTime } from "@/utils/date";
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { Comment } from "@/api/comment/type";
import { reqCommentByArticle, reqSendComment } from "@/api/comment";
import { CommentParams } from "@/api/comment/type";
import { notification } from "../../../utils/elComponent";
import { validateUser } from "@/utils/user";
import { reqDelComment } from "../../../api/comment/index";
import { useUserStore } from "@/store/user";

const userInfo = useUserStore();

const route = useRoute();
const { articleId } = route.params as unknown as { articleId: number };

const commentList = ref<Comment[]>([]);
const init = async () => {
  const res = await reqCommentByArticle(articleId);
  if (res.status == 200) {
    commentList.value = res.data;
  }
};
init();

const content = ref("");
const bindSend = (e: any) => {
  content.value = e.target.value;
};

const commentParams = reactive<CommentParams>({
  articleId: articleId,
  commentContent: "",
  replyCommentId: null,
  userId:userInfo.user?.id,
  parentId:null
});

const initCommentParams = () => {
  content.value = "";
  commentParams.commentContent = "";
  commentParams.replyCommentId = null;
};

const send = async () => {
  if (!validateUser()) return;
  commentParams.userId=userInfo.user?.id
  let msg;
  if (commentParams.parentId) {
    if(replyContent.value.trim()=="") {
      notification('error',"回复不得为空","error")
      return
    }
    commentParams.commentContent = replyContent.value;
    msg = "回复成功";
  } else {
    if(content.value.trim()=="") {
      notification('error',"评论不得为空","error")
      return
    }
    commentParams.commentContent = content.value;
    msg = "发送成功";
  }
  const res = await reqSendComment(commentParams);
  if (res.status == 200) {
    notification("success", msg);
    init();
    initCommentParams();
    cancel();
  }
};

const deleteComment = async (id: number) => {
  if (!validateUser()) return;
  const res = await reqDelComment(id);
  if (res.status == 200) {
    notification("success", "删除成功");
    init();
  }
};

const replyContent = ref("");
const replyPid = (id: number) => {
  commentParams.replyCommentId=null
  commentParams.parentId = id;
};
const replyCid=(commentId:number,id:number)=>{
  replyPid(commentId)
  commentParams.replyCommentId=id
  
}

const cancel = () => {
  commentParams.replyCommentId = null;
  commentParams.parentId=null
  replyContent.value = "";
};
</script>

<style lang="scss" scoped>
.comment-container {
  padding: 32px 40px;
  .first {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 20px;
  }
  .text {
    display: flex;

    .img {
      height: 60px;
      width: 60px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .comment {
      flex: 1;
      border-radius: 10px;
    }
  }
  .btn-flex {
    display: flex;
    flex-direction: column-reverse;
  }
  .send {
    margin-top: 10px;
    margin-left: auto;
    border-radius: 5px;
  }
  .hr {
    position: relative;
    margin: 20px auto;
    border: 2px dashed #d2ebfd;
    width: 100%;
  }
  .comment-list {
    .comment {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .img {
        height: 55px;
        width: 55px;
        border-radius: 50%;
      }
      .comment-detail {
        display: flex;
        flex-direction: column;
        line-height: 25px;
        margin-left: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        padding: 10px;
        width: 320px;
        .meta {
          display: flex;
          color: #9ca3af;
          .name {
            margin-right: 10px;
          }
          .time {
            margin-right: 10px;
          }
          .operate {
            display: flex;
            margin-left: auto;
            color: rgb(255, 0, 153);
            cursor: pointer;
          }
          .reply {
            margin-right: 5px;
          }
        }
      }
    }
    .reply-list {
      margin-left: 55px;
    }
    .reply-content {
      margin-left: 55px;
      display: flex;
      margin-bottom: 20px;
      .img {
        height: 55px;
        width: 55px;
        border-radius: 50%;
        margin-right: 10px;
      }
      .reply-detail {
        padding: 10px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
        word-wrap: break-word;
        .cmtctt {
          /* color: #9ca3af; */
          font-size: 13px;
        }
        .rpyimg {
          text-align: left;
        }
        .rpy {
          font-size: 16px;
          width: 100%;
          padding: 10px;
          border: none;
          resize: none;
          cursor: pointer;
          outline: none;
        }
      }
    }
  }
}
.spanText {
  color: #ff0099;
                      float: right;
                      margin-left: 5px;
                      cursor: pointer;
}
</style>
