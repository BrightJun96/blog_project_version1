import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
  like: Number,
  /*

좋아요 기능 설계

클라이언트측에서 로그인된 유저의 name 값을 보내주면 like.user의 값인 배열에 추가하도록 해준다.

그리고 클라이언트측에서 해당 포스팅의 좋아요를 조회할 때는 like.user의 배열에서 로그인된 user의 name으로 필터링해줘 조회한다.

좋아요를 취소할 때는 해당 유저를 좋아요 목록에서 제거해준다.


like : {
user : [{name : "cjfwns96"},{name : "jev"}..... ],
count : this.like.user.length
}

*/
});

const Post = mongoose.model("Post", PostSchema);

export default Post;
