import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.email(),
  phone: z.string().min(8).max(30),
  password: z.string().min(8).max(128),
  role: z.enum([
    'SUPER_ADMIN',
    'LOAN_OFFICER',
    'CREDIT_ANALYST',
    'LOAN_APPROVER',
    'FINANCE_OFFICER',
    'AUDITOR',
    'APPLICANT',
  ]).optional().default('APPLICANT'),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(128),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});
