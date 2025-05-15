import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async(req: Request, res: Response) => {
    const categoryCreated = await Category.create(req.body)
    res.status(201).json(categoryCreated)
    return
}

export const getAllCategory = async(req: Request, res: Response) => {
    const categories = await Category.find()

    if(categories.length < 1){
        res.status(404).json({
            message: 'Kategori masih kosong'
        })
        return
    }

    res.status(200).json({
        message: 'Tampil semua category',
        categories
    })
    return
}

export const getDetailCategory = async(req: Request, res: Response) => {
    const detailCategory = await Category.findById(req.params.id)

    if(!detailCategory){
        res.status(404).json({ message: 'Category tidak ditemukan'})
        return
    }

    res.status(200).json({
        message: 'Detail data Category',
        category: detailCategory
    })
    return
}

export const updateDetailCategory = async(req: Request, res: Response) => {
    const detailCategory = await Category.findById(req.params.id)

    if(!detailCategory){
        res.status(404).json({ message: 'Category tidak ditemukan'})
        return
    }

    const categoryUpdated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(201).json(categoryUpdated)
    return
}

export const deleteDetailCategory = async(req: Request, res: Response) => {
    const detailCategory = await Category.findById(req.params.id)

    if(!detailCategory){
        res.status(404).json({ message: 'Category tidak ditemukan'})
        return
    }

    const categoryUpdated = await Category.findByIdAndDelete(req.params.id)

    res.status(200).json({
        message: 'Berhasil Hapus'
    })
    return
}