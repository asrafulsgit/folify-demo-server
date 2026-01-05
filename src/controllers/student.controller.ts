/**
 * File: src/controllers/student.controller.ts
 * Description: Student CRUD operations controller
 */

import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, '../data/mockData.json');

const getData = () => {
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  return JSON.parse(rawData);
};

export const getStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { institute, district, status, search, page = '1', limit = '10', 
      sortBy = 'createdAt', sortOrder = 'desc' } = req.query;

    const data = getData();
    let students = data.students;

    // Apply filters
    if (institute) {
      students = students.filter((s: any) => 
        s.currentInstitute?.toLowerCase().includes((institute as string).toLowerCase())
      );
    }

    if (district) {
      students = students.filter((s: any) => 
        s.district?.toLowerCase() === (district as string).toLowerCase()
      );
    }

    if (status) {
      students = students.filter((s: any) => s.status === status);
    }

    if (search) {
      const searchLower = (search as string).toLowerCase();
      students = students.filter((s: any) => 
        s.name.toLowerCase().includes(searchLower) ||
        s.email.toLowerCase().includes(searchLower) ||
        s.phone?.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    students.sort((a: any, b: any) => {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (a[sortBy as string] < b[sortBy as string]) return -1 * order;
      if (a[sortBy as string] > b[sortBy as string]) return 1 * order;
      return 0;
    });

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedStudents = students.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: paginatedStudents,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(students.length / limitNum),
        totalItems: students.length,
        itemsPerPage: limitNum
      }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {


    res.status(201).json({
      success: true,
      message: 'Student created successfully (mock)',
      data: {
        ...req.body,
        id: `STU${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = getData();
    const student = data.students.find((s: any) => s.id === id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    console.error('Get student by ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
   

    const data = getData();
    const student = data.students.find((s: any) => s.id === id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully (mock)',
      data: {
        ...student,
        ...req.body,
        updatedAt: new Date()
      }
    });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;


    const data = getData();
    const student = data.students.find((s: any) => s.id === id);

    if (!student) {
      res.status(404).json({
        success: false,
        message: 'Student not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully (mock)'
    });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};