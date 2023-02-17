import Post from "../../models/post";
import mongoose from "mongoose";
import Joi from "joi";
import sanitizeHtml from "sanitize-html";

const { ObjectId } = mongoose.Types;

const sanitizeOption = {
  allowedTags: [
    "h1",
    "h2",
    "b",
    "i",
    "u",
    "s",
    "p",
    "ul",
    "li",
    "ol",
    "blockquote",
    "a",
    "img",
  ],
  allowedAttributes: {
    a: ["href", "name", "target"],
    img: ["src"],
    li: ["class"],
  },
  allowedSchemes: ["data", "http"],
};

const removeHtmlAndShorten = (body) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < 200 ? filtered : `${filtered.slice(0, 200)}...`;
};

// Posting Id로 해당 포스팅 찾게 해주는 미들웨어
export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  console.log(id);
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; //Bad Request
    return;
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*
POST /api/posts
{
    title : '제목',
    body : '내용',
    tags : ['태그1','태그2']
}
로그인하지 않으면 write할 수 없음.
로그인 하지 않으면 401(unauthorized)
*/

export const write = async (ctx) => {
  const schema = Joi.object().keys({
    title: Joi.string().required().min(2), //최소 2글자이상 입력해야함.
    body: Joi.string().required().min(2), //최소 2글자이상 입력해야함.
    tags: Joi.array().items(Joi.string().min(2)).required(), //최소 2글자이상 입력해야함.
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body: sanitizeHtml(body, sanitizeOption),
    tags,
    user: ctx.state.user,
    like: 0,
  }); // 인스턴스
  try {
    await post.save();
    // 인스턴스 데이터베이스에 저장
    // 해당 함수의 반환값은 Promise여서 async / await사용
    // 그리하여 데이터베이스에 저장할 때까지 기다릴 수 있게 await사용
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/posts
FrontEnd <PostListPage/> path='/'
*/
export const list = async (ctx) => {
  try {
    const posts = await Post.find()
      .sort({ _id: -1 }) // 최신 포스팅부터 불러오게 하기 위해
      .lean()
      .exec();

    ctx.body = posts.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
GET /api/posts/:id
FrontEnd <PostPage/> path='/@:username/:postId' 
*/

export const read = async (ctx) => {
  ctx.body = ctx.state.post;
};

/*
DELETE /api/posts/:id
*/

export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
PATCH /api/posts/:id
*/
export const update = async (ctx) => {
  const { id } = ctx.params;

  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const nextData = { ...ctx.request.body };
  if (nextData.body) {
    nextData.body = sanitizeHtml(nextData.body, sanitizeOption);
  }
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const postLikeUpdate = async (ctx) => {
  const { id } = ctx.params;
  const { likeCount } = ctx.request.body;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { like: likeCount },
      { new: true }
    ).exec();
    ctx.body = post;
  } catch (e) {
    console.log(e);
  }
};
