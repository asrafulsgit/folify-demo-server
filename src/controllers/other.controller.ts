/**
 * File: src/controllers/other.controller.ts
 * Description: Controllers for courses, batches, branches, admissions, coupons, and blogs
 */

import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Module } from '../types';

const dataPath = path.join(__dirname, '../data/mockData.json');
const additionalDataPath = path.join(__dirname, '../data/additionalData.json');

const getData = () => {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const additionalRawData = fs.readFileSync(additionalDataPath, 'utf-8');
    const mainData = JSON.parse(rawData);
    const additionalData = JSON.parse(additionalRawData);
    return { ...mainData, ...additionalData };
};

// ============= COURSE CONTROLLERS =============
export const getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { isAvailableInWebsite, courseCategory, type, status, limit = '10', page = '1', search } = req.query;

        const data = getData();
        let courses = data.courses || [];

        if (isAvailableInWebsite !== undefined) {
            courses = courses.filter((c: any) => c.isAvailableInWebsite === (isAvailableInWebsite === 'true'));
        }

        if (courseCategory) {
            courses = courses.filter((c: any) => c.courseCategory === courseCategory);
        }

        if (type) {
            courses = courses.filter((c: any) => c.type === type);
        }

        if (status) {
            courses = courses.filter((c: any) => c.status === status);
        }

        if (search) {
            const searchLower = (search as string).toLowerCase();
            courses = courses.filter((c: any) =>
                c.name.toLowerCase().includes(searchLower) ||
                c.description.toLowerCase().includes(searchLower)
            );
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const startIndex = (pageNum - 1) * limitNum;
        const paginatedCourses = courses.slice(startIndex, startIndex + limitNum);

        res.status(200).json({
            success: true,
            data: paginatedCourses,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(courses.length / limitNum),
                totalItems: courses.length
            }
        });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createCourse = async (req: Request, res: Response): Promise<void> => {
    try {

        res.status(201).json({
            success: true,
            message: 'Course created successfully (mock)',
            data: { ...req.body, id: `CRS${Date.now()}`, createdAt: new Date() }
        });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getCourseById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = getData();
        const course = (data.courses || []).find((c: any) => c.id === id);

        if (!course) {
            res.status(404).json({ success: false, message: 'Course not found' });
            return;
        }

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateCourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        res.status(200).json({
            success: true,
            message: 'Course updated successfully (mock)',
            data: { id, ...req.body, updatedAt: new Date() }
        });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= BATCH CONTROLLERS =============
export const getBatches = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { branch, search } = req.query;

        const data = getData();
        let batches = (data.batches || []).filter((b: any) => b.courseId === id);

        if (branch) {
            batches = batches.filter((b: any) => b.branchId === branch);
        }

        if (search) {
            const searchLower = (search as string).toLowerCase();
            batches = batches.filter((b: any) => b.name.toLowerCase().includes(searchLower));
        }

        res.status(200).json({ success: true, data: batches });
    } catch (error) {
        console.error('Get batches error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getBatchById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId,batchId } = req.params;
        const data = getData();
        const batch = (data.batches || []).find((c: any) => c.id === batchId);

        if (!batch) {
            res.status(404).json({ success: false, message: 'batch not found' });
            return;
        }

        res.status(200).json({ success: true, data: batch });
    } catch (error) {
        console.error('Get batch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createBatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
   

        res.status(201).json({
            success: true,
            message: 'Batch created successfully (mock)',
            data: { ...req.body, id: `BATCH${Date.now()}`, courseId: id, createdAt: new Date() }
        });
    } catch (error) {
        console.error('Create batch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateBatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId, batchId } = req.params;
       

        res.status(200).json({
            success: true,
            message: 'Batch updated successfully (mock)',
            data: { id: batchId, courseId, ...req.body, updatedAt: new Date() }
        });
    } catch (error) {
        console.error('Update batch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteBatch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId, batchId } = req.params;
       

        res.status(200).json({ success: true, message: 'Batch deleted successfully (mock)' });
    } catch (error) {
        console.error('Delete batch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= COURSE STREAM CONTROLLERS =============
export const getCourseStreams = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search } = req.query;
        const data = getData();
        let streams = data.courseStreams || [];

        if (search) {
            const searchLower = (search as string).toLowerCase();
            streams = streams.filter((s: any) => s.name.toLowerCase().includes(searchLower));
        }

        res.status(200).json({ success: true, data: streams });
    } catch (error) {
        console.error('Get course streams error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getCourseStreamById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = getData();
        const course = (data.courseStreams || []).find((c: any) => c.id === id);

        if (!course) {
            res.status(404).json({ success: false, message: 'Course not found' });
            return;
        }

        res.status(200).json({ success: true, data: course });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createCourseStream = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Creating course stream with data:', req.body);
        res.status(201).json({
            success: true,
            message: 'Course stream created successfully (mock)',
            data: { ...req.body, id: `CS${Date.now()}`, createdAt: new Date() }
        });
    } catch (error) {
        console.error('Create course stream error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateCourseStream = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(`Updating course stream ${id} with data:`, req.body);

        res.status(200).json({
            success: true,
            message: 'Course stream updated successfully (mock)',
            data: { id, ...req.body, updatedAt: new Date() }
        });
    } catch (error) {
        console.error('Update course stream error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= BRANCH CONTROLLERS =============
export const getBranches = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, page = '1', limit = '10' } = req.query;
        const data = getData();
        let branches = data.branches || [];

        if (search) {
            const searchLower = (search as string).toLowerCase();
            branches = branches.filter((b: any) =>
                b.name.toLowerCase().includes(searchLower) ||
                b.address.toLowerCase().includes(searchLower)
            );
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const startIndex = (pageNum - 1) * limitNum;
        const paginatedBranches = branches.slice(startIndex, startIndex + limitNum);

        res.status(200).json({
            success: true,
            data: paginatedBranches,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(branches.length / limitNum),
                totalItems: branches.length
            }
        });
    } catch (error) {
        console.error('Get branches error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getBranchId = async (req: Request, res: Response): Promise<void> => {
    try {
    const { id } = req.params;
        const data = getData();
        const course = (data.branches || []).find((c: any) => c.id === id);[];

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Get branches error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createBranch = async (req: Request, res: Response): Promise<void> => {
    try {
    
        res.status(201).json({
            success: true,
            message: 'Branch created successfully (mock)',
            data: { ...req.body, id: `BRN${Date.now()}`, createdAt: new Date() }
        });
    } catch (error) {
        console.error('Create branch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
 

        res.status(200).json({
            success: true,
            message: 'Branch updated successfully (mock)',
            data: { id, ...req.body, updatedAt: new Date() }
        });
    } catch (error) {
        console.error('Update branch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteBranch = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;


        res.status(200).json({ success: true, message: 'Branch deleted successfully (mock)' });
    } catch (error) {
        console.error('Delete branch error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= ADMISSION CONTROLLERS =============
export const getAdmissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, status, course, branch, page = '1', limit = '10' } = req.query;
        const data = getData();
        let admissions = data.admissions || [];

        if (status) admissions = admissions.filter((a: any) => a.status === status);
        if (course) admissions = admissions.filter((a: any) => a.courseId === course);
        if (branch) admissions = admissions.filter((a: any) => a.branchId === branch);

        if (search) {
            const searchLower = (search as string).toLowerCase();
            admissions = admissions.filter((a: any) =>
                a.studentId.toLowerCase().includes(searchLower)
            );
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const startIndex = (pageNum - 1) * limitNum;
        const paginatedAdmissions = admissions.slice(startIndex, startIndex + limitNum);

        res.status(200).json({
            success: true,
            data: paginatedAdmissions,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(admissions.length / limitNum),
                totalItems: admissions.length
            }
        });
    } catch (error) {
        console.error('Get admissions error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createAdmission = async (req: Request, res: Response): Promise<void> => {
    try {
  
        res.status(201).json({
            success: true,
            message: 'Admission created successfully (mock)',
            data: { ...req.body, id: `ADM_ENR${Date.now()}`, createdAt: new Date() }
        });
    } catch (error) {
        console.error('Create admission error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getAdmissionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = getData();
        const admission = (data.admissions || []).find((a: any) => a.id === id);

        if (!admission) {
            res.status(404).json({ success: false, message: 'Admission not found' });
            return;
        }

        res.status(200).json({ success: true, data: admission });
    } catch (error) {
        console.error('Get admission error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateAdmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
       
        res.status(200).json({
            success: true,
            message: 'Admission updated successfully (mock)',
            data: { id, ...req.body, updatedAt: new Date() }
        });
    } catch (error) {
        console.error('Update admission error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteAdmission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
       

        res.status(200).json({ success: true, message: 'Admission deleted successfully (mock)' });
    } catch (error) {
        console.error('Delete admission error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= PAYMENT CONTROLLERS =============
export const getPayments = async (req: Request, res: Response): Promise<void> => {
     try {
        const { search, status, course, page = '1', limit = '10' } = req.query;
        const data = getData();
        let admissions = data.payments || [];

        if (status) admissions = admissions.filter((a: any) => a.status === status);
        if (course) admissions = admissions.filter((a: any) => a.courseId === course);

        if (search) {
            const searchLower = (search as string).toLowerCase();
            admissions = admissions.filter((a: any) =>
                a.name.toLowerCase().includes(searchLower)
            );
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const startIndex = (pageNum - 1) * limitNum;
        const paginatedAdmissions = admissions.slice(startIndex, startIndex + limitNum);

        res.status(200).json({
            success: true,
            data: paginatedAdmissions,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(admissions.length / limitNum),
                totalItems: admissions.length
            }
        });
    } catch (error) {
        console.error('Get payments error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= COUPON CONTROLLERS =============
export const getCoupons = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, discountType, page = '1', limit = '10' } = req.query;
        const data = getData();
        let coupons = data.coupons || [];

        if (discountType) coupons = coupons.filter((c: any) => c.discountType === discountType);

        if (search) {
            const searchLower = (search as string).toLowerCase();
            coupons = coupons.filter((c: any) => c.name.toLowerCase().includes(searchLower));
        }

        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const startIndex = (pageNum - 1) * limitNum;
        const paginatedCoupons = coupons.slice(startIndex, startIndex + limitNum);

        res.status(200).json({
            success: true,
            data: paginatedCoupons,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(coupons.length / limitNum),
                totalItems: coupons.length
            }
        });
    } catch (error) {
        console.error('Get coupons error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
export const getCouponById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = getData();
        const admission = (data.coupons || []).find((a: any) => a.id === id);

        if (!admission) {
            res.status(404).json({ success: false, message: 'Coupons not found' });
            return;
        }

        res.status(200).json({ success: true, data: admission });
    } catch (error) {
        console.error('Get Coupons error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createCoupon = async (req: Request, res: Response): Promise<void> => {
    try {

        res.status(201).json({
            success: true,
            message: 'Coupon created successfully (mock)',
            data: { ...req.body, id: `CPN${Date.now()}`, createdAt: new Date() }
        });
    } catch (error) {
        console.error('Create coupon error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;


        res.status(200).json({
            success: true,
            message: 'Coupon updated successfully (mock)',
            data: { id, ...req.body, updatedAt: new Date() }
        });
    } catch (error) {
        console.error('Update coupon error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
     

        res.status(200).json({ success: true, message: 'Coupon deleted successfully (mock)' });
    } catch (error) {
        console.error('Delete coupon error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= BLOG CONTROLLERS =============

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, status } = req.query;
        const data = getData();
        let blogs = data.blogs || [];

        if (status) blogs = blogs.filter((b: any) => b.status === status);

        if (search) {
            const searchLower = (search as string).toLowerCase();
            blogs = blogs.filter((b: any) =>
                b.title.toLowerCase().includes(searchLower) ||
                b.description.toLowerCase().includes(searchLower)
            );
        }

        res.status(200).json({ success: true, data: blogs });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = getData();
        const admission = (data.blogs || []).find((a: any) => a.id === id);

        if (!admission) {
            res.status(404).json({ success: false, message: 'blogs not found' });
            return;
        }

        res.status(200).json({ success: true, data: admission });
    } catch (error) {
        console.error('Get blogs error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
    try {
    
        res.status(201).json({
            success: true,
            message: 'Blog created successfully (mock)',
            data: { ...req.body, id: `BLOG${Date.now()}`, createdAt: new Date() }
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
      

        res.status(200).json({
            success: true,
            message: 'Blog updated successfully (mock)',
            data: { id, ...req.body, updatedAt: new Date() }
        });
    } catch (error) {
        console.error('Update blog error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
       

        res.status(200).json({ success: true, message: 'Blog deleted successfully (mock)' });
    } catch (error) {
        console.error('Delete blog error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// ============= Modules CONTROLLERS =============

export const getModulesByCourse = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { search, parentOnly } = req.query;

    const modules : Module[] = getData().modules;

    let filtered = modules.filter(m => 
      m.courseId === courseId && !m.isDeleted
    );

    if (parentOnly === 'true') {
      filtered = filtered.filter(m => m.parentId === null);
    }

    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter(m => 
        m.name.toLowerCase().includes(searchLower)
      );
    }

    // Build hierarchical structure
    const parentModules = filtered.filter(m => m.parentId === null);
    const result = parentModules.map(parent => ({
      ...parent,
      submodules: filtered.filter(m => m.parentId === parent.id)
    }));

    res.json({
      success: true,
      data: result,
      total: result.length
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const getModuleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const {courseId, moduleId } = req.params;
        const data = getData();
        const admission = (data.modules || []).find((a: any) => a.id === moduleId);

        if (!admission) {
            res.status(404).json({ success: false, message: 'modules not found' });
            return;
        }

        res.status(200).json({ success: true, data: admission });
    } catch (error) {
        console.error('Get modules error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const createModule = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const moduleData = { ...req.body, courseId };

  
    const modules : Module[] = getData().modules;
    const newModule: Module = {
      id: `MOD${Date.now()}`,
      slug: moduleData.slug,
      index: moduleData.index || modules.filter(m => m.courseId === courseId).length + 1,
      parentId: moduleData.parentId || null,
      name: moduleData.name,
      courseId,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    modules.push(newModule);

    res.status(201).json({
      success: true,
      message: 'Module created successfully',
      data: newModule
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateModule = async (req: Request, res: Response) => {
  try {
    const { courseId, moduleId } = req.params;
const modules : Module[] = getData().modules;


    const moduleIndex = modules.findIndex(
      m => m.id === moduleId && m.courseId === courseId && !m.isDeleted
    );

    if (moduleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    modules[moduleIndex] = {
      ...modules[moduleIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'Module updated successfully',
      data: modules[moduleIndex]
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteModule = async (req: Request, res: Response) => {
  try {
    const { courseId, moduleId } = req.params;


const modules : Module[] = getData().modules;
    const moduleIndex = modules.findIndex(
      m => m.id === moduleId && m.courseId === courseId
    );

    if (moduleIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Module not found'
      });
    }

    // Soft delete
    modules[moduleIndex].isDeleted = true;
    modules[moduleIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Module deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getCourseReviews = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { rating, page = 1, limit = 20 } = req.query;
    const reviews = getData().reviews;
    let filtered = reviews.filter((r : any) => r.courseId === courseId);

    if (rating) {
      filtered = filtered.filter((r : any) => r.rating === Number(rating));
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedData = filtered.slice(startIndex, startIndex + Number(limit));

    const avgRating = filtered.length > 0
      ? filtered.reduce((sum :any, r :any) => sum + r.rating, 0) / filtered.length
      : 0;

    res.json({
      success: true,
      data: paginatedData,
      stats: {
        averageRating: avgRating.toFixed(2),
        totalReviews: filtered.length
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// export const createReview = async (req: Request, res: Response) => {
//   try {
//     const { courseId } = req.params;
//     const studentId = 'current_student_id'; // Should come from auth
    
//     console.log('Creating review:', courseId, req.body);

//     const newReview: Review = {
//       id: `REV${Date.now()}`,
//       studentId,
//       courseId,
//       rating: req.body.rating,
//       comment: req.body.comment,
//       createdAt: new Date().toISOString()
//     };

//     reviews.push(newReview);

//     res.status(201).json({
//       success: true,
//       message: 'Review created successfully',
//       data: newReview
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const updateReview = async (req: Request, res: Response) => {
//   try {
//     const { courseId, reviewId } = req.params;
//     console.log('Updating review:', reviewId, req.body);

//     const reviewIndex = reviews.findIndex(r => 
//       r.id === reviewId && r.courseId === courseId
//     );

//     if (reviewIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: 'Review not found'
//       });
//     }

//     reviews[reviewIndex] = {
//       ...reviews[reviewIndex],
//       ...req.body
//     };

//     res.json({
//       success: true,
//       message: 'Review updated successfully',
//       data: reviews[reviewIndex]
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export const deleteReview = async (req: Request, res: Response) => {
//   try {
//     const { courseId, reviewId } = req.params;
//     console.log('Deleting review:', reviewId);

//     const reviewIndex = reviews.findIndex(r => 
//       r.id === reviewId && r.courseId === courseId
//     );

//     if (reviewIndex === -1) {
//       return res.status(404).json({
//         success: false,
//         message: 'Review not found'
//       });
//     }

//     reviews.splice(reviewIndex, 1);

//     res.json({
//       success: true,
//       message: 'Review deleted successfully'
//     });
//   } catch (error: any) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };