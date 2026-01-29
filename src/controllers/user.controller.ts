import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { asyncHandler } from '../middlewares/asyncHandler';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAll = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const users = await this.userService.findAll();
    res.json({ success: true, data: users });
  });

  getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const user = await this.userService.findById(id);

    if (!user) {
      res.status(404).json({ success: false, error: { message: 'User not found' } });
      return;
    }

    res.json({ success: true, data: user });
  });

  create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const user = await this.userService.create(req.body);
    res.status(201).json({ success: true, data: user });
  });

  update = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const user = await this.userService.update(id, req.body);

    if (!user) {
      res.status(404).json({ success: false, error: { message: 'User not found' } });
      return;
    }

    res.json({ success: true, data: user });
  });

  delete = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    await this.userService.delete(id);
    res.status(204).send();
  });
}
