import { Router } from 'express';

import * as TaskController from '../controllers/task.controller';

const router = Router();

router.get('/tasks', TaskController.all);
router.post('/tasks', TaskController.add);
router.put('/tasks/:id', TaskController.update);
router.delete('/tasks/:id', TaskController.remove);

export default router;