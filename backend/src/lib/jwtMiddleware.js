import jwt from "jsonwebtoken";
import User from "../models/user";

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get("access_token");
  if (!token) return next();
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // 토큰을 JWT 비밀키로 검증
    ctx.state.user = {
      // 로그인 유저의 token을 state에 저장한뒤 check API에서 사용할 것임.
      // 쿠키에 토큰을 담아 해당 회원이 서버로부터 인증받은 회원인지 확인한다.
      _id: decoded._id,
      username: decoded.username,
    };
    console.log(decoded);

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60 * 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      ctx.cookies.set("access_token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch (e) {
    return next();
  }
};

export default jwtMiddleware;
