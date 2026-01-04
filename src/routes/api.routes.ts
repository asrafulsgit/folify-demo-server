/**
 * File: src/routes/api.routes.ts
 * Description: Main API routes for courses, batches, branches, admissions, coupons, and blogs
 */

import { Router } from 'express';
import {
    getCourses,
    createCourse,
    getCourseById,
    updateCourse,
    getBatches,
    createBatch,
    updateBatch,
    deleteBatch,
    getCourseStreams,
    createCourseStream,
    updateCourseStream,
    getBranches,
    createBranch,
    updateBranch,
    deleteBranch,
    getAdmissions,
    createAdmission,
    getAdmissionById,
    updateAdmission,
    deleteAdmission,
    getPayments,
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getCourseStreamById,
    getBranchId,
    getCouponById,
    getBlogById,
    getModulesByCourse,
    createModule,
    updateModule,
    deleteModule,
    getBatchById,
    getModuleById
} from '../controllers/other.controller';
import { validate } from '../middleware/validation.middleware';
import {
    createCourseSchema,
    updateCourseSchema,
    createBatchSchema,
    updateBatchSchema,
    createCourseStreamSchema,
    updateCourseStreamSchema,
    createBranchSchema,
    updateBranchSchema,
    createAdmissionSchema,
    updateAdmissionSchema,
    createCouponSchema,
    updateCouponSchema,
    createBlogSchema,
    updateBlogSchema,
    createModuleSchema,
    updateModuleSchema
} from '../validators';
import { authMiddleware } from '../middleware/auth.middleware';

const router : Router = Router();

// All routes require authentication
// router.use(authMiddleware);

// ============= COURSE ROUTES =============
/**
 * @swagger
 * /course:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     parameters:
 *       - in: query
 *         name: isAvailableInWebsite
 *         schema:
 *           type: boolean
 *         description: Filter by website availability
 *       - in: query
 *         name: courseCategory
 *         schema:
 *           type: string
 *         description: Filter by course category
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filter by course type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in name, description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 */
router.get('/course', getCourses);

/**
 * @swagger
 * /course/create:
 *   post:
 *     summary: Create a new course
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Course created successfully
 */
router.post('/course/create', validate(createCourseSchema), createCourse);

/**
 * @swagger
 * /course/{id}:
 *   get:
 *     summary: Get course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 */
router.get('/course/:id', getCourseById);

/**
 * @swagger
 * /course/{id}/update:
 *   put:
 *     summary: Update course by ID
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Course updated successfully
 */
router.put('/course/:id/update', validate(updateCourseSchema), updateCourse);

// Batch routes under course
/**
 * @swagger
 * /course/{id}/batches:
 *   get:
 *     summary: Get all batches for a course
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Course ID
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         description: Filter by branch ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in batch name
 *     responses:
 *       200:
 *         description: List of batches retrieved successfully
 */
router.get('/course/:id/batches', getBatches);
router.get('/course/:courseId/batches/:batchId', getBatchById);

/**
 * @swagger
 * /course/{id}/batches/create:
 *   post:
 *     summary: Create a new batch for a course
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Batch created successfully
 */
router.post('/course/:id/batches/create', validate(createBatchSchema), createBatch);

/**
 * @swagger
 * /course/{courseId}/batches/{batchId}/update:
 *   put:
 *     summary: Update a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: batchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Batch updated successfully
 */
router.put('/course/:courseId/batches/:batchId/update', validate(updateBatchSchema), updateBatch);

/**
 * @swagger
 * /course/{courseId}/batches/{batchId}/delete:
 *   delete:
 *     summary: Delete a batch
 *     tags: [Batch]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: batchId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Batch deleted successfully
 */
router.delete('/course/:courseId/batches/:batchId/delete', deleteBatch);

// ============= COURSE STREAM ROUTES =============
/**
 * @swagger
 * /course-stream:
 *   get:
 *     summary: Get all course streams
 *     tags: [Course Stream]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in stream name
 *     responses:
 *       200:
 *         description: List of course streams retrieved successfully
 */
router.get('/course-stream', getCourseStreams);
router.get('/course-stream/:id', getCourseStreamById);

/**
 * @swagger
 * /course-stream/create:
 *   post:
 *     summary: Create a new course stream
 *     tags: [Course Stream]
 *     responses:
 *       201:
 *         description: Course stream created successfully
 */
router.post('/course-stream/create', validate(createCourseStreamSchema), createCourseStream);

/**
 * @swagger
 * /course-stream/{id}/update:
 *   put:
 *     summary: Update a course stream
 *     tags: [Course Stream]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course stream updated successfully
 */
router.put('/course-stream/:id/update', validate(updateCourseStreamSchema), updateCourseStream);

// ============= BRANCH ROUTES =============
/**
 * @swagger
 * /branch:
 *   get:
 *     summary: Get all branches
 *     tags: [Branch]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in name, address
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of branches retrieved successfully
 */
router.get('/branch', getBranches);
router.get('/branch/:id', getBranchId);

/**
 * @swagger
 * /branch/create:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     responses:
 *       201:
 *         description: Branch created successfully
 */
router.post('/branch/create', validate(createBranchSchema), createBranch);

/**
 * @swagger
 * /branch/{id}/update:
 *   put:
 *     summary: Update a branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch updated successfully
 */
router.put('/branch/:id/update', validate(updateBranchSchema), updateBranch);

/**
 * @swagger
 * /branch/{id}/delete:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Branch deleted successfully
 */
router.delete('/branch/:id/delete', deleteBranch);

// ============= ADMISSION ROUTES =============
/**
 * @swagger
 * /admission:
 *   get:
 *     summary: Get all admissions
 *     tags: [Admission]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by student ID
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: course
 *         schema:
 *           type: string
 *         description: Filter by course ID
 *       - in: query
 *         name: branch
 *         schema:
 *           type: string
 *         description: Filter by branch ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of admissions retrieved successfully
 */
router.get('/admission', getAdmissions);

/**
 * @swagger
 * /admission/create:
 *   post:
 *     summary: Create a new admission
 *     tags: [Admission]
 *     responses:
 *       201:
 *         description: Admission created successfully
 */
router.post('/admission/create', validate(createAdmissionSchema), createAdmission);

/**
 * @swagger
 * /admission/{id}:
 *   get:
 *     summary: Get admission by ID
 *     tags: [Admission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admission retrieved successfully
 */
router.get('/admission/:id', getAdmissionById);

/**
 * @swagger
 * /admission/{id}/update:
 *   put:
 *     summary: Update an admission
 *     tags: [Admission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admission updated successfully
 */
router.put('/admission/:id/update', validate(updateAdmissionSchema), updateAdmission);

/**
 * @swagger
 * /admission/{id}/delete:
 *   delete:
 *     summary: Delete an admission
 *     tags: [Admission]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Admission deleted successfully
 */
router.delete('/admission/:id/delete', deleteAdmission);

// ============= PAYMENT ROUTES =============
/**
 * @swagger
 * /payment:
 *   get:
 *     summary: Get all payments
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search payments
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: course
 *         schema:
 *           type: string
 *         description: Filter by course ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of payments retrieved successfully
 */
router.get('/payment', getPayments);

// ============= COUPON ROUTES =============
/**
 * @swagger
 * /coupon:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupon]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in coupon name
 *       - in: query
 *         name: discountType
 *         schema:
 *           type: string
 *         description: Filter by discount type
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of coupons retrieved successfully
 */
router.get('/coupon', getCoupons);
router.get('/coupon/:id', getCouponById);

/**
 * @swagger
 * /coupon/create:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupon]
 *     responses:
 *       201:
 *         description: Coupon created successfully
 */
router.post('/coupon/create', validate(createCouponSchema), createCoupon);

/**
 * @swagger
 * /coupon/{id}/update:
 *   put:
 *     summary: Update a coupon
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 */
router.put('/coupon/:id/update', validate(updateCouponSchema), updateCoupon);

/**
 * @swagger
 * /coupon/{id}/delete:
 *   delete:
 *     summary: Delete a coupon
 *     tags: [Coupon]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 */
router.delete('/coupon/:id/delete', deleteCoupon);

// ============= BLOG ROUTES =============

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blog]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search in title, description
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *     responses:
 *       200:
 *         description: List of blogs retrieved successfully
 */
router.get('/blog', getBlogs);
router.get('/blog/:id', getBlogById);

/**
 * @swagger
 * /blog/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blog]
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
router.post('/blog/create', validate(createBlogSchema), createBlog);

/**
 * @swagger
 * /blog/{id}/update:
 *   put:
 *     summary: Update a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
router.put('/blog/:id/update', validate(updateBlogSchema), updateBlog);

/**
 * @swagger
 * /blog/{id}/delete:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blog]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
router.delete('/blog/:id/delete', deleteBlog);

// ============= Modules ROUTES =============
router.get('/course/:courseId/module', getModulesByCourse);
router.get('/course/:courseId/module/:moduleId', getModuleById);
router.post('/course/:courseId/module/create',createModule);
router.put('/course/:courseId/module/:moduleId/update', updateModule);
router.delete('/course/:courseId/module/:moduleId/delete', deleteModule);


export default router;