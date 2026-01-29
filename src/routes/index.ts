import { Router } from 'express';
import userRoutes from './user.routes';

const router = Router();

// Mount routes
router.use('/users', userRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
    },
  });
});

export default router;
