import { z } from 'zod';

export const applicantSchema = z.object({
  type: z.enum(['INDIVIDUAL', 'BUSINESS']),
  fullName: z.string().min(2).max(200),
  email: z.email(),
  phone: z.string().min(8).max(30),
});
