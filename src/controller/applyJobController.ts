import { Request, Response } from "express";
import User from "../models/User";
import Job from "../models/Job";
import ApplyJob from "../models/ApplyJob";

export const createApplyJob = async(req: Request, res: Response) => {
    const { job, fullname, resumeUrl, contactPhone} = req.body

    const jobAvailabled = await Job.findById(job).select('_id title')
    if(!jobAvailabled){
        res.status(404).json({ message: 'Job tidak ditemukan. Pastikan job yang ada masukkan sudah benar.'})
        return
    }

    const userAvailabled = await User.findOne({ name: fullname }).select('_id name')
    if(!userAvailabled){
        res.status(404).json({ message: 'User tidak ditemukan. Pastikan fullname yang ada masukkan sudah benar.'})
        return
    }
    
    const appliedJob = await ApplyJob.create({
        job,
        user: userAvailabled._id,
        fullname,
        resumeUrl,
        contactPhone
    })

    res.status(201).json({
        message : 'Berhasil buat apply job',
        applyJob: appliedJob
    })
    return
}