/**
 * File: src/types/index.ts
 * Description: TypeScript type definitions for all database models
 */

export interface Admin {
    id: string;
    name: string;
    type: 'Super Admin' | 'Admin' | 'Teacher' | 'Accountant';
    permissions: string[];
    email: string;
    username: string;
    password: string;
    recoveryEmail?: string;
    recoveryPhoneNumber?: string;
    status: 'Active' | 'Inactive';
    address?: string;
    profileImage?: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Module {
  id: string;
  slug: string;
  index: number;
  parentId: string | null;
  name: string;
  courseId: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface Student {
    id: string;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    guardianName?: string;
    guardianPhone?: string;
    guardianIdentity?: string;
    currentInstitute?: string;
    district?: string;
    profileImage?: string;
    status: 'Active' | 'Blocked';
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Account {
    id: string;
    transactionID: string;
    type: 'Earning' | 'Expense';
    reason: string[];
    method: 'Cash' | 'SSLCommerz' | 'Bank' | 'Bkash' | 'Nagad' | 'Rocket' | 'Stripe' | 'Payoneer' | 'Paypal';
    amount: number;
    branch: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Branch {
    id: string;
    slug: string;
    name: string;
    phone: string[];
    email?: string;
    address: string;
    mapURL?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Course {
    id: string;
    slug: string;
    index: number;
    isAvailableInWebsite: boolean;
    name: string;
    shortDescription: string;
    description: string;
    courseDetails: Array<{ icon: string; key: string; value: string }>;
    type: 'Online' | 'Offline';
    courseCategory: 'Free' | 'One Time Fee' | 'Subscription';
    courseStreamId: string;
    teachers: Array<{ name: string; id: string; image: string }>;
    price: number;
    publishDate: Date;
    offerPrice?: number;
    isOnOffer: boolean;
    offerExpiryDate?: Date;
    status: 'active' | 'inactive' | 'pending';
    trailer?: string;
    isAffiliated: boolean;
    expiryDate?: Date;
    reviewable: boolean;
    reviews: {
        numberOfReviews: number;
        reviewScore: number;
        review: number;
    };
    routineImageUrl?: string;
    thumbnailUrl?: string;
    isDeleted: boolean;
    createdBy: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CourseStream {
    id: string;
    index: number;
    icon?: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Affiliated {
    id: string;
    index: number;
    courseId: string;
    status: 'enable' | 'disable';
    createdAt: Date;
    updatedAt: Date;
    updatedBy?: string;
}

export interface Batch {
    id: string;
    index: number;
    name: string;
    description?: string;
    courseId: string;
    branchId: string;
    createdBy: string;
    updatedBy?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CourseContent {
    id: string;
    slug: string;
    index: number;
    courseId: string;
    moduleId: string;
    contentId: string;
    status: 'published' | 'unpublished';
    isFree: boolean;
    scheduledAt?: Date;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ContentBank {
    id: string;
    contentType: 'liveClass' | 'lecture' | 'notes' | 'exam';
    contentId: string;
    description?: string;
    tags: string[];
    status: 'usable' | 'unusable';
    createdBy: string;
    updatedBy?: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface LiveClass {
    id: string;
    title: string;
    urlType: 'yt' | 'zoom';
    joinUrl?: string;
    joinId?: string;
    passcode?: string;
    startTime: Date;
    endTime: Date;
}

export interface Lecture {
    id: string;
    title: string;
    type: string;
    videoId: string;
    duration: { hour: number; minute: number; second: number };
    shortNoteUrl?: string;
}

export interface Note {
    id: string;
    title: string;
    pdfUrl: string;
}

export interface Exam {
    id: string;
    title: string;
    type: 'multiplechoice' | 'written';
    totalQues: number;
    totalMarks: number;
    passMarks: number;
    positiveMarks: number;
    negativeMarks: number;
    duration: { hours: number; minutes: number; seconds: number };
    isResultPublished: boolean;
    validity: { days: number; hours: number; minutes: number };
    questions: string[];
}

export interface QuestionBank {
    id: string;
    question: string;
    explanations?: string;
    tags: string[];
    createdBy: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    type: 'MCQ' | 'CQ';
    answer: string;
    options?: string[];
}

export interface Tag {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface ExamAttempt {
    id: string;
    course: string;
    exam: string;
    student: string;
    type: 'MCQ' | 'CQ' | 'GAP';
    answers?: any[];
    right?: number;
    wrong?: number;
    submittedPDF?: string;
    totalMarks: number;
    obtainedMarks: number;
    isPassed: boolean;
    isLive: boolean;
    startTime: Date;
    endTime: Date;
    submitTime: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Coupon {
    id: string;
    name: string;
    discountType: 'Fixed' | 'Percentage';
    discountAmount: number;
    discountCurrency?: string;
    issuedAt: Date;
    expiredAt: Date;
    usageLimit: {
        globalLimit: number;
        userLimit: number;
    };
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Admission {
    id: string;
    studentId: string;
    courseId: string;
    batchId?: string;
    branchId: string;
    status: 'Active' | 'Pending' | 'Course Out';
    payStatus: 'Paid' | 'Unpaid' | 'Partial' | 'Refunded';
    price: number;
    discount: number;
    totalAmount: number;
    paidAmount: number;
    discountReason?: string;
    couponId?: string;
    affiliatedId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Installment {
    id: string;
    studentId: string;
    payAmount: number;
    paymentMethod: string;
    paidAt: Date;
    reason?: string;
}

export interface BlogCategory {
    id: string;
    index: number;
    icon?: string;
    name: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Blog {
    id: string;
    slug: string;
    title: string;
    description: string;
    categoryId: string;
    teacherId: string;
    thumbnail?: string;
    status: 'published' | 'draft';
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Notice {
    id: string;
    courseId?: string;
    batchId?: string;
    branchId?: string;
    title: string;
    description: string;
    attachment?: string;
    status: 'published' | 'draft';
    scheduledAt?: Date;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    studentId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    courseId: string;
}

export interface Comment {
    id: string;
    studentId: string;
    comment: string;
    contentId: string;
    createdAt: Date;
}