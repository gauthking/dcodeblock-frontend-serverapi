import express from 'express';
import { addAction, createUser, deleteUser, getUserById, updateUser } from '../controllers/adminController';



const router = express.Router();


router.get('/user/:id', getUserById);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.post('/delete/:id', deleteUser);
router.post('/action', addAction)

export default router;