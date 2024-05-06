/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose'

type IUserRole = 'user' | 'admin'

export type IUser = {
  _id?: Types.ObjectId
  name?: string
  email: string
  password: string
  role: IUserRole
}
export type IUserFilters = {
  searchTerm?: string
}

export type UserModel = {
  isUserExist(
    email: string,
  ): Promise<Pick<IUser, '_id' | 'password' | 'role' | 'email' | 'name'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
} & Model<IUser>

// export type UserModel = Model<IUser, Record<string, unknown>>;
