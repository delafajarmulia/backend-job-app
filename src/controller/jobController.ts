import { Request, Response } from "express"
import Job from "../models/Job"
import Category from "../models/Category"
import { AuthRequest } from "../utils/types"
import User, { userDocument } from "../models/User"
import { model, Types } from "mongoose"

interface JobSummary {
    _id: string;
    title: string;
    description: string;
    category: string;
    salary: string;
    jobType: string;
    benefits: string;
    requirements: string;
    city: string;
    address: string;
    phone: string;
    remote: boolean;
}

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

export const getAllJobsByOwner = async(req: AuthRequest<any, any, any, any>, res: Response) => {
    const user = await User.findById(req.user.id)
                    .populate({
                        path: 'applyJobs',
                        populate: {
                            path: 'job',
                            model: 'Job'
                        }
                    }) as userDocument || null;

    if(!user){
        res.status(404).json({ message: 'User tidak ditemukan' })
    }

    const appliedJobs = user.applyJobs ?? [];

    const result: JobSummary[] = appliedJobs
        .filter(app => app.job && typeof app.job !== 'string' && 'title' in app.job)
        .map(app => {
            const job = app.job as {
                _id: Types.ObjectId;
                title: string;
                description: string;
                category: string;
                salary: string;
                jobType: string;
                benefits: string;
                requirements: string;
                city: string;
                address: string;
                phone: string;
                remote: boolean;
                owner: Types.ObjectId;
                createdAt: Date;
                updatedAt: Date;
            };

            return {
                _id: job._id.toString(),
                title: job.title,
                description: job.description,
                category: job.category,
                salary: job.salary,
                jobType: job.jobType,
                benefits: job.benefits,
                requirements: job.requirements,
                city: job.city,
                address: job.address,
                phone: job.phone,
                remote: job.remote,
                owner: req.user.id,
                createdAt: job.createdAt,
                updatedAt: job.updatedAt
            };
        });

    res.status(200).json({
        message: 'List job owner',
        jobs: result
    })
    return
}

export const getDetailJobByOwner = async(req: AuthRequest<any, any, any, any>, res: Response) => {
    const jobId = req.params.jobId
    const job = await Job.findById(jobId).populate({
        path: 'applyJobs',
        select: '_id job fullname resumeUrl contactPhone',
        populate: {
            path: 'user',
            select: '_id name email'
        }
    })
    
    res.status(200).json({
        message: 'Detail Job Owner',
        job
    })
}