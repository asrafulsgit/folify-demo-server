/**
 * File: src/controllers/admin.controller.ts
 * Description: Admin CRUD operations controller
 */

import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const dataPath = path.join(__dirname, '../data/mockData.json');

const getData = () => {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(rawData);
};

export const getAdmins = async (req: Request, res: Response): Promise<void> => {
    try {
        const { search, status, type, page = '1', limit = '10', sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
        console.log(req.query)
        const data = getData();
        let admins = data.admins;

        // Apply filters
        if (status) {
            admins = admins.filter((a: any) => a.status === status);
        }

        if (type) {
            admins = admins.filter((a: any) => a.type === type);
        }

        if (search) {
            const searchLower = (search as string).toLowerCase();
            admins = admins.filter((a: any) =>
                a.name.toLowerCase().includes(searchLower) ||
                a.email.toLowerCase().includes(searchLower) ||
                a.username.toLowerCase().includes(searchLower)
            );
        }

        // Sorting
        admins.sort((a: any, b: any) => {
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
        const paginatedAdmins = admins.slice(startIndex, endIndex);
             console.log(paginatedAdmins)
        res.status(200).json({
            success: true,
            data: paginatedAdmins,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(admins.length / limitNum),
                totalItems: admins.length,
                itemsPerPage: limitNum
            }
        });
    } catch (error) {
        console.error('Get admins error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('Creating admin with data:', req.body);

        res.status(201).json({
            success: true,
            message: 'Admin created successfully (mock)',
            data: {
                ...req.body,
                id: `ADM${Date.now()}`,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
    } catch (error) {
        console.error('Create admin error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const getAdminById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const data = getData();
        const admin = data.admins.find((a: any) => a.id === id);

        if (!admin) {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            data: admin
        });
    } catch (error) {
        console.error('Get admin by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const updateAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(`Updating admin ${id} with data:`, req.body);

        const data = getData();
        const admin = data.admins.find((a: any) => a.id === id);

        if (!admin) {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Admin updated successfully (mock)',
            data: {
                ...admin,
                ...req.body,
                updatedAt: new Date()
            }
        });
    } catch (error) {
        console.error('Update admin error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        console.log(`Deleting admin with ID: ${id}`);

        const data = getData();
        const admin = data.admins.find((a: any) => a.id === id);

        if (!admin) {
            res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Admin deleted successfully (mock)'
        });
    } catch (error) {
        console.error('Delete admin error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};