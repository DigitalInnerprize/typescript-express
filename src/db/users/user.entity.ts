import { prop, getModelForClass, buildSchema } from '@typegoose/typegoose';

class User {
  @prop({ required: true })
  public firstName!: string;

  @prop({ required: true })
  public lastName!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, minlength: 7 })
  public encryptedPassword!: string;
}

const UserSchema = buildSchema(User);
const UserModel = getModelForClass(User);

export { UserSchema, UserModel };
