/**
 * File: src/validators/index.ts
 * Description: Zod validation schemas for all API endpoints
 */

import { z } from 'zod';

// Auth Schemas
export const loginSchema = z.object({
    body: z.object({
        password: z.string().min(1, 'Password is required')
    })
});

// Student Schemas
export const createStudentSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email'),
        phone: z.string().optional(),
        address: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
        guardianIdentity: z.string().optional(),
        currentInstitute: z.string().optional(),
        district: z.string().optional(),
        profileImage: z.string().optional(),
        status: z.enum(['Active', 'Blocked']).optional()
    })
});

export const updateStudentSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        guardianName: z.string().optional(),
        guardianPhone: z.string().optional(),
        guardianIdentity: z.string().optional(),
        currentInstitute: z.string().optional(),
        district: z.string().optional(),
        profileImage: z.string().optional(),
        status: z.enum(['Active', 'Blocked']).optional()
    })
});

// Admin Schemas
export const createAdminSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        type: z.enum(['Super Admin', 'Admin', 'Teacher', 'Accountant']),
        permissions: z.array(z.string()).optional(),
        email: z.string().email('Invalid email'),
        username: z.string().min(3, 'Username must be at least 3 characters'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        recoveryEmail: z.string().email().optional(),
        recoveryPhoneNumber: z.string().optional(),
        status: z.enum(['Active', 'Inactive']).optional(),
        address: z.string().optional(),
        profileImage: z.string().optional()
    })
});

export const updateAdminSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        type: z.enum(['Super Admin', 'Admin', 'Teacher', 'Accountant']).optional(),
        permissions: z.array(z.string()).optional(),
        email: z.string().email().optional(),
        username: z.string().min(3).optional(),
        password: z.string().min(6).optional(),
        recoveryEmail: z.string().email().optional(),
        recoveryPhoneNumber: z.string().optional(),
        status: z.enum(['Active', 'Inactive']).optional(),
        address: z.string().optional(),
        profileImage: z.string().optional()
    })
});

// Course Schemas
export const createCourseSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Course name is required'),
        slug: z.string().min(1, 'Slug is required').optional(),
        index: z.number().optional(),
        isAvailableInWebsite: z.boolean().optional(),
        shortDescription: z.string().max(200, 'Short description must be less than 200 characters'),
        description: z.string(),
        courseDetails: z.array(z.object({
            icon: z.string(),
            key: z.string(),
            value: z.string()
        })).optional(),
        type: z.enum(['Online', 'Offline']),
        courseCategory: z.enum(['Free', 'One Time Fee', 'Subscription']),
        courseStreamId: z.string(),
        teachers: z.array(z.object({
            name: z.string(),
            id: z.string(),
            image: z.string().optional()
        })).optional(),
        price: z.number().min(0),
        publishDate: z.string().optional(),
        offerPrice: z.number().optional(),
        isOnOffer: z.boolean().optional(),
        offerExpiryDate: z.string().optional(),
        status: z.enum(['active', 'inactive', 'pending']).optional(),
        trailer: z.string().optional(),
        isAffiliated: z.boolean().optional(),
        expiryDate: z.string().optional(),
        reviewable: z.boolean().optional(),
        routineImageUrl: z.string().optional(),
        thumbnailUrl: z.string().optional()
    })
});

export const updateCourseSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        slug: z.string().optional(),
        index: z.number().optional(),
        isAvailableInWebsite: z.boolean().optional(),
        shortDescription: z.string().max(200).optional(),
        description: z.string().optional(),
        courseDetails: z.array(z.object({
            icon: z.string(),
            key: z.string(),
            value: z.string()
        })).optional(),
        type: z.enum(['Online', 'Offline']).optional(),
        courseCategory: z.enum(['Free', 'One Time Fee', 'Subscription']).optional(),
        courseStreamId: z.string().optional(),
        teachers: z.array(z.object({
            name: z.string(),
            id: z.string(),
            image: z.string().optional()
        })).optional(),
        price: z.number().min(0).optional(),
        publishDate: z.string().optional(),
        offerPrice: z.number().optional(),
        isOnOffer: z.boolean().optional(),
        offerExpiryDate: z.string().optional(),
        status: z.enum(['active', 'inactive', 'pending']).optional(),
        trailer: z.string().optional(),
        isAffiliated: z.boolean().optional(),
        expiryDate: z.string().optional(),
        reviewable: z.boolean().optional(),
        routineImageUrl: z.string().optional(),
        thumbnailUrl: z.string().optional()
    })
});

// Batch Schemas
export const createBatchSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Batch name is required'),
        description: z.string().optional(),
        branchId: z.string().min(1, 'Branch ID is required')
    })
});

export const updateBatchSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        branchId: z.string().optional()
    })
});

// Course Stream Schemas
export const createCourseStreamSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Stream name is required'),
        index: z.number().optional(),
        icon: z.string().optional()
    })
});

export const updateCourseStreamSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        index: z.number().optional(),
        icon: z.string().optional()
    })
});

// Branch Schemas
export const createBranchSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Branch name is required'),
        slug: z.string().min(1, 'Slug is required').optional(),
        phone: z.array(z.string()).min(1, 'At least one phone number is required'),
        email: z.string().email().optional(),
        address: z.string().min(1, 'Address is required'),
        mapURL: z.string().optional()
    })
});

export const updateBranchSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        slug: z.string().optional(),
        phone: z.array(z.string()).optional(),
        email: z.string().email().optional(),
        address: z.string().optional(),
        mapURL: z.string().optional()
    })
});

// Admission Schemas
export const createAdmissionSchema = z.object({
    body: z.object({
        studentId: z.string().min(1, 'Student ID is required'),
        courseId: z.string().min(1, 'Course ID is required'),
        batchId: z.string().optional(),
        branchId: z.string().min(1, 'Branch ID is required'),
        status: z.enum(['Active', 'Pending', 'Course Out']).optional(),
        payStatus: z.enum(['Paid', 'Unpaid', 'Partial', 'Refunded']).optional(),
        price: z.number().min(0),
        discount: z.number().min(0).optional(),
        totalAmount: z.number().min(0),
        paidAmount: z.number().min(0).optional(),
        discountReason: z.string().optional(),
        couponId: z.string().optional(),
        affiliatedId: z.string().optional()
    })
});

export const updateAdmissionSchema = z.object({
    body: z.object({
        studentId: z.string().optional(),
        courseId: z.string().optional(),
        batchId: z.string().optional(),
        branchId: z.string().optional(),
        status: z.enum(['Active', 'Pending', 'Course Out']).optional(),
        payStatus: z.enum(['Paid', 'Unpaid', 'Partial', 'Refunded']).optional(),
        price: z.number().min(0).optional(),
        discount: z.number().min(0).optional(),
        totalAmount: z.number().min(0).optional(),
        paidAmount: z.number().min(0).optional(),
        discountReason: z.string().optional(),
        couponId: z.string().optional(),
        affiliatedId: z.string().optional()
    })
});

// Coupon Schemas
export const createCouponSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Coupon name is required'),
        discountType: z.enum(['Fixed', 'Percentage']),
        discountAmount: z.number().min(0),
        discountCurrency: z.string().optional(),
        issuedAt: z.string(),
        expiredAt: z.string(),
        usageLimit: z.object({
            globalLimit: z.number().min(0),
            userLimit: z.number().min(0)
        })
    })
});

export const updateCouponSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        discountType: z.enum(['Fixed', 'Percentage']).optional(),
        discountAmount: z.number().min(0).optional(),
        discountCurrency: z.string().optional(),
        issuedAt: z.string().optional(),
        expiredAt: z.string().optional(),
        usageLimit: z.object({
            globalLimit: z.number().min(0),
            userLimit: z.number().min(0)
        }).optional()
    })
});

// Blog Schemas
export const createBlogSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required'),
        slug: z.string().min(1, 'Slug is required').optional(),
        description: z.string().min(1, 'Description is required'),
        categoryId: z.string().min(1, 'Category ID is required'),
        teacherId: z.string().min(1, 'Teacher ID is required').optional(),
        thumbnail: z.string().optional(),
        status: z.enum(['published', 'draft']).optional()
    })
});

export const updateBlogSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        slug: z.string().optional(),
        description: z.string().optional(),
        categoryId: z.string().optional(),
        teacherId: z.string().optional(),
        thumbnail: z.string().optional(),
        status: z.enum(['published', 'draft']).optional()
    })
});