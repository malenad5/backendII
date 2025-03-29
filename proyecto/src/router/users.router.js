import { Router } from 'express';
import { UserController } from '../controllers/users.controller.js';

const router = Router();
const userController = new UserController();

const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
} = userController;

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:uid', getUser);
router.put('/:uid', updateUser);
router.delete('/:uid', deleteUser);

export default router;
