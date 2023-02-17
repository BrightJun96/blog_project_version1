import User from "../../models/user";
import Joi from "joi";
/*
회원가입
POST /api/auth/register
{
    username:"jev",
    password : "jev96"
}
*/
export const register = async (ctx) => {
  //Request body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);

  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    // username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({ username });
    await user.setPassword(password); // setPassword는 promise를 반환
    await user.save(); //save도 promise이기 때문에 register함수는 비동기함수

    ctx.body = user.serialize();

    //회원가입 토큰 발급하여 cookie에 등록
    const token = user.generateToken();
    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    throw (500, e);
  }
};

/*
POST /api/auth/login
{
  username: "jev123",
  password : "mypass"
}
*/
export const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  //username, password가 없으면 에러 처리

  if (!username || !password) {
    ctx.status = 401; // unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    // 계정이 없다면 에러 처리
    if (!user) {
      ctx.status = 400; // password error.status와 다르게 설정해주기위해
      return;
    }
    //  잘못된 비밀번호면 에러 처리
    const valid = await user.checkPassword(password);
    if (!valid) {
      // username과 password를 다르게 하기 위해 status code를 변경
      // 444는 내가 임의로 만든 status code
      ctx.status = 444;
      return;
    }

    ctx.body = user.serialize();

    const token = user.generateToken();

    ctx.cookies.set("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async (ctx) => {
  // 로그인 상태 확인

  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = user;
};

export const logout = async (ctx) => {
  // 로그아웃

  ctx.cookies.set("access_token"); // cookie에 이름만 짓고 token은 할당안함.
  ctx.status = 204;
};
