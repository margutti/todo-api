import { Request, Response } from "express";
import { Task } from "../models/Task";

export const all = async (req: Request, res: Response) => {
    const result = await Task.findAll();
    res.json({ result });
}

export const add = async (req: Request, res: Response) => {
    if(req.body.title) {
        const result = await Task.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });

        res.status(201).json({ result });
    } else {
        res.json({
            success: false,
            message: 'Unsent data!'
        });
    }

}

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;

    let result = await Task.findByPk(id);
    if(result) {

        if(req.body.title) {
            result.title = req.body.title
        }

        if(req.body.done) {
            switch(req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    result.done = true;
                    break;
                case 'false':
                case '0':
                    result.done = false;
                    break;
            }
        }

        await result.save();

        res.json({ result });

    } else {
        res.json({
            success: false,
            message: 'Item not found!'
        })
    }
}

export const remove = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    let result = await Task.findByPk(id);
    if(result) {
        await result.destroy();
    }
    res.status(204).json({});
}
