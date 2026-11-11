import test from 'node:test';
import assert from 'node:assert/strict';
import { createApplication, getApplication, listApplications } from '../src/modules/applications/service.js';

test('createApplication persists a new application and returns it by id', () => {
  const application = createApplication({
    applicantId: 'applicant-001',
    productId: 'product-001',
    requestedAmount: 1200000,
    termMonths: 12,
    purpose: 'School fees and business working capital',
  });

  assert.equal(application.status, 'SUBMITTED');
  assert.equal(listApplications().length > 0, true);

  const fetched = getApplication(application.id);
  assert.equal(fetched.id, application.id);
  assert.equal(fetched.requestedAmount, 1200000);
});
