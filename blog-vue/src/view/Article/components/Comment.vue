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
    <div class="comment-list">
      <div v-for="comment in commentList" :key="comment.id">
        <div class="comment">
          <div class="rorate">
            <img class="img" v-lazy="comment.avatarUrl" alt="" />
          </div>
          <div class="comment-detail">
            <div class="content">
              {{ comment.content }}
            </div>
            <div class="meta">
              <div class="name">{{ comment.username }}</div>
              <div class="time">{{ comment.time }}</div>
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

        <div class="reply-content" v-if="comment.id == commentParams.pid">
          <div>
            <img class="img rorate" v-lazy="userInfo.user?.avatarUrl" alt="" />
          </div>
          <div class="reply-detail">
            <div class="cmtctt">
              <textarea
                v-model="replyContent"
                class="rpy"
                :placeholder="'@' + comment.username"
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
        <div class="reply-list" v-if="comment.children">
          <div v-for="reply in comment.children" :key="reply.id">
            <div class="comment">
              <div class="rorate">
                <img class="img" v-lazy="reply.avatarUrl" alt="" />
              </div>
              <div class="comment-detail">
                <div class="content">
                  <span style="color: #ff0099">@{{ reply.pusername}}</span>
                  {{reply.content }}
                </div>
                <div class="meta">
                  <div class="name">{{ reply.username }}</div>
                  <div class="time">{{ reply.time }}</div>
                  <div class="operate">
                    <div class="reply" @click="replyPid(reply.id)">回复</div>
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
            <div class="reply-content" v-if="reply.id == commentParams.pid">
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
                    :placeholder="'@' + reply.username"
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
import { ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { CommentList } from "@/api/comment/type";
import { reqCommentByArticle, reqSendComment } from "@/api/comment";
import { CommentParams } from "@/api/comment/type";
import { notification } from "../../../utils/elComponent";
import { validateUser } from "@/utils/user";
import { reqDelComment } from "../../../api/comment/index";
import { useUserStore } from "@/store/user";

const userInfo = useUserStore();

const route = useRoute();
const { articleId } = route.params as { articleId: string };

const commentList = ref<CommentList[]>([]);
const init = async () => {
  const res = await reqCommentByArticle(articleId);
  if (res.code == "200") {
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
  content: "",
  pid: null,
});

const initCommentParams = () => {
  content.value = "";
  commentParams.content = "";
  commentParams.pid = null;
};

const send = async () => {
  if (!validateUser()) return;
  let msg;
  if (commentParams.pid) {
    if(replyContent.value.trim()=="") {
      notification('error',"评论不得为空","error")
      return
    }
    commentParams.content = replyContent.value;
    msg = "回复成功";
  } else {
    if(content.value.trim()=="") {
      notification('error',"评论不得为空","error")
      return
    }
    commentParams.content = content.value;
    msg = "发送成功";
  }
  const res = await reqSendComment(commentParams);
  if (res.code == "200") {
    notification("success", msg);
    init();
    initCommentParams();
    cancel();
  }
};

const deleteComment = async (id: number) => {
  if (!validateUser()) return;
  const res = await reqDelComment(id);
  if (res.code == 200) {
    notification("success", "删除成功");
    init();
  }
};

const replyContent = ref("");
const replyPid = (id: number) => {
  commentParams.pid = id;
};

const cancel = () => {
  commentParams.pid = null;
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
          color: #9ca3af;
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
