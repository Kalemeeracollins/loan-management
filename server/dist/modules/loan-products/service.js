import { randomUUID } from 'node:crypto';
import { AppError } from '../../common/errors.js';
const loanProducts = [
    {
        id: 'cced1b31-b2bc-4df8-bd5f-a4c2d55a88e9',
        name: 'Micro Personal Loan',
        description: 'Short term working capital and personal finance support.',
        minAmount: 200000,
        maxAmount: 5000000,
        currency: 'UGX',
        interestRate: 0.18,
        interestMethod: 'REDUCING_BALANCE',
        minTermMonths: 3,
        maxTermMonths: 24,
        repaymentFrequency: 'MONTHLY',
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];
export function listLoanProducts() {
    return loanProducts;
}
export function createLoanProduct(payload) {
    const product = {
        id: randomUUID(),
        name: payload.name,
        description: payload.description,
        minAmount: payload.minAmount,
        maxAmount: payload.maxAmount,
        currency: payload.currency,
        interestRate: payload.interestRate,
        interestMethod: payload.interestMethod,
        minTermMonths: payload.minTermMonths,
        maxTermMonths: payload.maxTermMonths,
        repaymentFrequency: payload.repaymentFrequency,
        status: 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    loanProducts.push(product);
    return product;
}
export function getLoanProductById(id) {
    return loanProducts.find((product) => product.id === id);
}
export function getLoanProduct(id) {
    const product = getLoanProductById(id);
    if (!product) {
        throw new AppError('Loan product not found', 404);
    }
    return product;
}
//# sourceMappingURL=service.js.map