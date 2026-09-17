import test from 'node:test';
import assert from 'node:assert/strict';
import { hydrostaticsQuestions } from '../content/questions-hydrostatics.js';

test('hydrostatics additions have the intended chapter coverage and difficulty balance', () => {
  assert.equal(hydrostaticsQuestions.length, 28);
  assert.equal(new Set(hydrostaticsQuestions.map(question => question.id)).size, 28);
  for (const topic of ['pressure', 'forces']) {
    const chapter = hydrostaticsQuestions.filter(question => question.topic === topic);
    assert.equal(chapter.length, 14, topic);
    assert.deepEqual(chapter.map(question => question.id),
      Array.from({ length: 14 }, (_, index) => `${topic}-${String(index + 7).padStart(2, '0')}`));
    assert.deepEqual(['Foundation', 'Apply', 'Connect'].map(difficulty =>
      chapter.filter(question => question.difficulty === difficulty).length), [4, 7, 3]);
    assert.ok(chapter.filter(question => question.kind === 'numeric').length >= 5);
  }
  for (const question of hydrostaticsQuestions) {
    const text = [question.title, question.prompt, question.given, question.hint,
      ...question.solution, question.takeaway, ...(question.choices ?? [])].filter(Boolean).join(' ');
    assert.ok(!text.includes(';'), `${question.id}: avoid semicolons in student-facing text`);
  }
});

test('new hydrostatics numeric answers agree with independent pressure and load balances', () => {
  const g = 9.8;
  const waterDensity = 1000;
  const expected = {
    // Convert the stated gauge reading to the water column it supports.
    'pressure-08': (34.3 * 1000) / (waterDensity * g),
    'pressure-11': (25 * 1000 + waterDensity * g * 1.5) / 1000,
    'pressure-12': (120 * 1000 - waterDensity * g * 2) / 1000,
    'pressure-13': (6.174 * 1000) / (g * 0.75),
    'pressure-15': waterDensity * g * 1.2 / (800 * g),
    'pressure-16': (13.72 * 1000 - 750 * g * 0.4) / (waterDensity * g),
    'pressure-18': (15 * 1000 + waterDensity * g * (1 - 3)) / 1000,
    'forces-08': waterDensity * g * 1.5 * 0.6 / 1000,
    // Integrate depth along the inclined plate rather than reusing its centroid answer.
    'forces-11': waterDensity * g * 1 * (0.5 * 2 + Math.sin(Math.PI / 6) * 2 ** 2 / 2) / 1000,
    'forces-12': 2 + (Math.PI * 0.5 ** 4 / 4) / (Math.PI * 0.5 ** 2 * 2),
    // Moment integral: integral from 0 to H of (rho*g*h)*(b dh)*h.
    'forces-13': waterDensity * g * 1.2 * 2 ** 3 / 3 / 1000,
    'forces-14': waterDensity * g * 1.5 * (3 ** 2 - 1 ** 2) / 2 / 1000,
    'forces-15': Math.hypot(3, -4),
    // Net pressure is constant over the lower 2 m and triangular over the upper 1 m.
    'forces-18': waterDensity * g * 1.5 * (2 * (3 - 2) + (3 - 2) ** 2 / 2) / 1000,
    // Piecewise trapezoidal areas under the continuous pressure-depth graph.
    'forces-20': (g * 800 * 0.5 * 0.5 / 2
      + ((g * 800 * 0.5) + (g * 800 * 0.5 + g * waterDensity * 1.5)) * 1.5 / 2) * 1 / 1000,
  };
  const numeric = hydrostaticsQuestions.filter(question => question.kind === 'numeric');
  assert.equal(numeric.length, 15);
  assert.deepEqual(new Set(numeric.map(question => question.id)), new Set(Object.keys(expected)),
    'Every new numeric question needs its own independent physical oracle');
  for (const question of numeric) {
    const oracle = expected[question.id];
    assert.ok(Number.isFinite(question.answer), question.id);
    assert.ok(Math.abs(question.answer - oracle) <= 1e-10 * Math.max(1, Math.abs(oracle)),
      `${question.id}: expected ${oracle}, got ${question.answer}`);
    assert.ok(question.tolerance > 0 && question.tolerance < Math.abs(oracle) * 0.02,
      `${question.id}: tolerance should accept normal rounding without hiding a physical mistake`);
    assert.equal(question.answerIndex, undefined, question.id);
  }
});
