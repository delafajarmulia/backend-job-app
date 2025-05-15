import { Request, Response } from "express"
import Job from "../models/Job"
import Category from "../models/Category"

export const createJob = async(req: Request, res: Response) => {
    const newJob = req.body

    const categoryAvailabled = await Category.findById(newJob.category)
    if(!categoryAvailabled){
        res.status(404).json({ message: 'Category tidak ditemukan.'})
        return
    }

    const jobAdded = await Job.create(newJob)

    res.status(201).json({job: jobAdded})
    return
}

export const updateJob = async(req: Request, res: Response) => {
    const newJob = req.body
    const jobId = req.params.jobId

    const jobAvailabled = await Job.findById(jobId)
    if(!jobAvailabled){
        res.status(404).json({ message: 'Job tidak ditemukan.'})
        return
    }

    const categoryAvailabled = await Category.findById(newJob.category)
    if(!categoryAvailabled){
        res.status(404).json({ message: 'Category tidak ditemukan.'})
        return
    }

    const jobUpdated = await Job.findByIdAndUpdate(jobId, newJob, { new: true })

    res.status(201).json({job: jobUpdated})
    return
}

export const getAllJobs = async(req: Request, res: Response) => {
    const jobs = await Job.find().populate({
        path: 'category',
        select: '_id name'
    })

    if(jobs.length < 1){
        res.status(404).json({ message: 'Job belum tersedia.' })
        return
    }

    res.status(200).json({
        message: 'Tampil semua list pekerjaan.',
        jobs
    })
    return
}

export const getDetailJobs = async(req: Request, res: Response) => {
    const jobId = req.params.jobId
    const job = await Job.findById(jobId).populate({
        path: 'category',
        select: '_id name'
    })

    if(!job){
        res.status(404).json({ message: 'Job tidak ditemukan.' })
        return
    }

    res.status(200).json({
        message: 'Detail pekerjaan.',
        job
    })
    return
}

export const deleteJob = async(req: Request, res: Response) => {
    const jobId = req.params.jobId
    const job = await Job.findById(jobId)

    if(!job){
        res.status(404).json({ message: 'Job tidak ditemukan.' })
        return
    }

    const jobDeleted = await Job.findByIdAndDelete(jobId)
    
    res.status(200).json({ message: 'Berhasil hapus pekerjaan.'})
}