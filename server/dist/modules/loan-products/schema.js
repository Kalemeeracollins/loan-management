import { z } from 'zod';
export const loanProductSchema = z.object({
    name: z.string().min(2).max(120),
    description: z.string().min(10).max(500),
    minAmount: z.number().positive(),
    maxAmount: z.number().positive(),
    currency: z.string().length(3),
    interestRate: z.number().min(0),
    interestMethod: z.enum(['FLAT', 'REDUCING_BALANCE']),
    minTermMonths: z.number().int().positive(),
    maxTermMonths: z.number().int().positive(),
    repaymentFrequency: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY']),
}).refine((values) => values.maxAmount >= values.minAmount, {
    message: 'Maximum amount must be greater than or equal to minimum amount',
    path: ['maxAmount'],
});
//# sourceMappingURL=schema.js.map