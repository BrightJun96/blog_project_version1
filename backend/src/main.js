require("dotenv").config();
import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import mongoose from "mongoose";
import api from "./api/index";
import jwtMiddleware from "./lib/jwtMiddleware";
import serve from "koa-static";
import path from "path";
import send from "koa-send";
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MonogoDB");
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use("/api", api.routes());

// 라우터 적용 전에 bodyparser 적용
app.use(bodyParser());
app.use(jwtMiddleware);
app.use(router.routes()).use(router.allowedMethods());

const buildDirectory = path.resolve(__dirname, "../../frontend/build"); // path.resolve("../../blog-frontend/build")
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  // ctx.path.indexOf() => 인자안의 경로가 일치하면 0을 반환하고 경로가 다르다면 -1을 반환한다.
  // ctx.path.indexOf("/api") !== 0 => ctx.path !== "/api"
  if (ctx.status === 404 && ctx.path.indexOf("/api") !== 0) {
    await send(ctx, "index.html", { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
