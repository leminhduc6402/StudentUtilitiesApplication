import UserModel from '../models/user.js';
import DetailUserModel from '../models/detailUser.js';
import ConflictError from '../response/errors/ConflictError.js';
import { httpStatusCodes } from '../response/httpStatusCodes/index.js';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserController = {
  signup: async (req, res) => {
    const {
      username,
      fullName,
      userCourse,
      classId,
      departmentId,
      majorId,
      ...dataUserDetail
    } = req.body;

    const user = await UserModel.findOne({ username });

    if (user) {
      throw new ConflictError('User already exists !!!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(username, salt);

    const newUser = await UserModel.create({
      username,
      password: hashed,
      fullName,
      userCourse,
    });

    await newUser.save();

    const detailNewUser = await DetailUserModel.create({
      userId: new mongoose.Types.ObjectId(newUser._id),
      classId: new mongoose.Types.ObjectId(classId),
      departmentId: new mongoose.Types.ObjectId(departmentId),
      majorId: new mongoose.Types.ObjectId(majorId),
      ...dataUserDetail,
    });

    return res
      .status(httpStatusCodes.CREATED)
      .json({ status: 'success', data: detailNewUser });
  },
  login: async (req, res) => {
    const { username, password, role } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new ConflictError('User not found !!!');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new ConflictError('Password is incorrect !!!');
    }

    if (role !== user.role) {
      throw new ConflictError('User not found !!!');
    }

    return res.status(httpStatusCodes.OK).json({
      status: 'success',
      data: {
        id: user._id,
        username: user.username,
        role: user.role,
        fullName: user.fullName,
        studentCode: user.studentCode,
        userCourse: user.userCourse,
      },
    });
  },
};

export default UserController;
