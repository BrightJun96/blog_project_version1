import Router from "koa-router";
import {
  list,
  write,
  read,
  remove,
  update,
  checkOwnPost,
  getPostById,
  postLikeUpdate,
} from "./posts.ctrl";
import checkLoggedIn from "../../lib/checkLoggedIn";
const posts = new Router();

posts.get("/", list);
posts.post("/", checkLoggedIn, write);

posts.get("/:id", getPostById, read);
posts.delete("/:id", getPostById, checkLoggedIn, checkOwnPost, remove);
posts.patch("/:id", getPostById, checkLoggedIn, checkOwnPost, update);
posts.patch("/:id/like", getPostById, postLikeUpdate);

export default posts;
