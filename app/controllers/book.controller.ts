import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { QueryOrder, wrap } from '@mikro-orm/mongodb';
import { DI } from '../server';
import { Book } from '../entities';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const books = await DI.books.findAll({
    populate: ['author'],
    orderBy: { title: QueryOrder.DESC },
    limit: 20,
  });
  res.json(books);
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await DI.books.findOne(req.params.id, {
      populate: ['author'],
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (!req.body.title || !req.body.author) {
    res.status(400);
    return res.json({ message: 'One of `title, author` is missing' });
  }

  try {
    const book = DI.em.create(Book, req.body);
    await DI.em.flush();

    res.json(book);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const book = await DI.books.findOne(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    wrap(book).assign(req.body);
    await DI.em.flush();

    res.json(book);
  } catch (e: any) {
    return res.status(400).json({ message: e.message });
  }
});

export const BookController = router;
