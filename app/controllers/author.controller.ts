import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';

import { DI } from '../server';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const authors = await DI.authorRepository.findAll({
    populate: ['books'],
    orderBy: { name: QueryOrder.DESC },
    limit: 20,
  });
  res.json(authors);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const author = await DI.authorRepository.findOneOrFail(req.params.id, {
      populate: ['books'],
    });

    res.json(author);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email) {
    res.status(400);
    return res.json({ message: 'One of `name, email` is missing' });
  }

  try {
    const author = DI.authorRepository.create(req.body);
    await DI.authorRepository.persist(author).flush();

    res.json(author);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const author = await DI.authorRepository.findOneOrFail(req.params.id);
    wrap(author).assign(req.body);
    await DI.authorRepository.flush();

    res.json(author);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const AuthorController = router;
