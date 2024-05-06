import { ObjectId } from 'mongodb'
export type IUser = {
  email: string
  password: string
}

// export type ILoginUserResponse = {
//   accessToken: string;
//   refreshToken: string;
//   user: Pick<IUser, '_id' | 'email' | 'password' | 'role'>;
// };

export type IRefreshTokenResponse = {
  accessToken: string
  user: {
    role?: string
    _id: ObjectId | undefined
    email?: string
  }
}
