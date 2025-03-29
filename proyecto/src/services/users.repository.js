import { UserDto } from "../datos/users.dto.js";

class UserRepository {
    // Inyección de dependencias
    constructor(dao) {
        this.dao = dao;
    }

    createUser = async (newUser) => {
        const userDto = new UserDto(newUser);
        return await this.dao.create(userDto);
    };

    getUsers = async () => await this.dao.get();

    getUser = async (filter) => {};

    updateUser = async (uid, userToUpdate) => {};

    deleteUser = async (uid) => {};
}

export { UserRepository };
