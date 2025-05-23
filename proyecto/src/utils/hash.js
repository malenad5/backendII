import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, userPasswordDb) => bcrypt.compareSync(password, userPasswordDb);