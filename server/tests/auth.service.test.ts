import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { db } from '../src/database/pool.js';
import { loginUser, refreshToken, registerUser } from '../src/modules/auth/service.js';

const uniqueEmail = `qa-${Date.now()}@example.com`;

after(async () => {
  await db.end();
});

test('registerUser creates a user and loginUser returns tokens', async () => {
  const user = await registerUser({
    name: 'QA User',
    email: uniqueEmail,
    phone: '+256700111222',
    password: 'StrongPass123',
    role: 'APPLICANT',
  });

  assert.equal(user.email, uniqueEmail);
  assert.equal(user.role, 'APPLICANT');

  const session = await loginUser({
    email: uniqueEmail,
    password: 'StrongPass123',
  });

  assert.ok(session.accessToken.length > 20);
  assert.ok(session.refreshToken.length > 20);
  assert.equal(session.user.email, uniqueEmail);
});

test('refreshToken rotates tokens correctly', async () => {
  const session = await loginUser({
    email: uniqueEmail,
    password: 'StrongPass123',
  });

  const refreshed = await refreshToken({ refreshToken: session.refreshToken });

  assert.ok(refreshed.accessToken.length > 20);
  assert.ok(refreshed.refreshToken.length > 20);
  assert.notEqual(refreshed.accessToken, session.accessToken);
});
