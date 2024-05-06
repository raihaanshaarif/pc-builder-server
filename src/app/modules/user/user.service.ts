/* eslint-disable @typescript-eslint/no-explicit-any */

import { IUser, IUserFilters } from './user.interface'
import { userSearchableFields } from './user.constant'
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import ApiError from '../../../errors/apiError'
import httpStatus from 'http-status'
import { User } from './user.model'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IGenericResponse } from '../../../interfaces/common'

const createUser = async (data: IUser): Promise<IUser> => {
  const isUserExist = await User.isUserExist(data.email)
  if (isUserExist) {
    throw new ApiError(httpStatus.IM_USED, 'Email Already Exists')
  }
  let { role } = data
  if (role === undefined) {
    role = 'user'
  }

  const newData: IUser = { ...data, role }
  const result = await User.create(newData)
  return result
}

const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const sortConditions: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await User.countDocuments()

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const updateUser = async (
  id: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  console.log(id, payload)
  const { ...userData } = payload
  const updatedUserData = { ...userData }

  // dynamically handling

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  })

  return result
}
const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
}
