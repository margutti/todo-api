import { Sequelize } from 'sequelize';
import { Request, Response } from "express";

import { Phrase } from "../models/Phrase";

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const random = (req: Request, res: Response) => {
    let nRand: number = Math.floor(Math.random() * 10);
    res.json({
        number: nRand
    });
}

export const name = (req: Request, res: Response) => {
    let name: string = req.params.name;
    res.json({
        name
    });
}

export const createPhrase = async (req: Request, res: Response) => {
    const { author, phrase } = req.body;
    const result = await Phrase.create({
        author,
        phrase
    })

    res.status(201);
    res.json({
        id: result.id,
        author: result.author,
        phrase: result.phrase
    });
}

export const listPhrases = async (req: Request, res: Response) => {
    const result = await Phrase.findAll();

    res.json({ result });
}

export const getPhrase = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await Phrase.findByPk(id);

    if(result) {
        res.json({ result });
    } else {
        res.status(204);
        res.json({
            success: false,
            message: 'Phrase not found!'
        });
    }
}

export const updatePhrase = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { author, phrase } = req.body;

    const result = await Phrase.findByPk(id);
    if(result) {
        result.author = author;
        result.phrase = phrase;
        await result.save();
        res.json({ result });
    } else {
        res.status(204);
        res.json({
            success: false,
            message: 'Phrase not found!'
        });
    }
}

export const deletePhrase = async (req: Request, res: Response) => {
    const { id } = req.params;

    await Phrase.destroy({
        where: {
            id
        }
    });

    res.status(204);
}

export const randomPhrase = async (req: Request, res: Response) => {
    const result = await Phrase.findOne({
        order: [
            Sequelize.fn('RANDOM')
        ]
    })

    if(result) {
        res.json({ result });
    } else {
        res.status(204);
        res.json({
            success: false,
            message: 'Phrase not found!'
        });
    }
}