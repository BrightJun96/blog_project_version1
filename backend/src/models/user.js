import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});

UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};

UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result; //true or false
};

UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};
//응답할 데이터에서 hashedPassword 필드 제거(보안상)
UserSchema.methods.serialize = function () {
  const data = this.toJSON(); //json.stringfy와 같다.

  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    // 첫 번째 파라미터에는 집어넣고 싶은 데이터를 넣는다.
    {
      _id: this.id,
      username: this.username,
    },
    // 두 번째 파라미터에는 JWT 암호를 넣는다.
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // 7일동안 유효함.
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);

export default User;
