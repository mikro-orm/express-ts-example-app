import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/core';

import { DI } from '../server';
import { Author } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const authors = await DI.authorRepository.findAll(['books'], { name: QueryOrder.DESC }, 20);
  res.json(authors);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const author = await DI.authorRepository.findOne(+req.params.id, ['books']);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.name || !req.body.email) {
    res.status(400);
    return res.json({ message: 'One of `name, email` is missing' });
  }

  try {
    const author = new Author(req.body.name, req.body.email);
    wrap(author).assign(req.body);
    await DI.authorRepository.persist(author).flush();

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const author = await DI.authorRepository.findOne(+req.params.id);

    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }

    wrap(author).assign(req.body);
    await DI.authorRepository.flush();

    res.json(author);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

export const AuthorController = router;
