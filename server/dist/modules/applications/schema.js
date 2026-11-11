import { z } from 'zod';
export const createApplicationSchema = z.object({
    applicantId: z.string().min(1),
    productId: z.string().min(1),
    requestedAmount: z.number().positive(),
    termMonths: z.number().int().positive(),
    purpose: z.string().min(10).max(500),
});
export const updateApplicationStatusSchema = z.object({
    status: z.enum([
        'DRAFT',
        'SUBMITTED',
        'DOCUMENT_REVIEW',
        'ASSESSMENT_PENDING',
        'UNDER_REVIEW',
        'MORE_INFORMATION_REQUIRED',
        'APPROVED',
        'REJECTED',
        'AGREEMENT_PENDING',
        'READY_FOR_DISBURSEMENT',
        'DISBURSED',
        'WITHDRAWN',
    ]),
});
//# sourceMappingURL=schema.js.map