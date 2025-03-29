import bcrypt from 'bcrypt';

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10)); // salt

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password); // user.password { password: '' }