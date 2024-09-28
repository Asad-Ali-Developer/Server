import express from 'express'
import authMiddleware from '../middlewares/authMiddleware';
import tenantController from '../controllers/tenantController';

const { AddNewTenant, AllTenants, GetTenant, DeleteTenant, UpdateTenant } = tenantController;


const router = express.Router();

router.get('/all-tenants/:_id', authMiddleware, AllTenants)

router.post('/add-tenant/:_id', authMiddleware, AddNewTenant)

router.get('/tenant/:_id', authMiddleware, GetTenant)

router.delete('/delete-tenant/:_id', authMiddleware, DeleteTenant)

router.patch('/update-tenant/:_id', authMiddleware, UpdateTenant)

export default router;
