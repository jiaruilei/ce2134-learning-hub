import test from 'node:test';
import assert from 'node:assert/strict';
import {energyMomentumQuestions} from '../content/questions-energy-momentum.js';

const byId = new Map(energyMomentumQuestions.map(question => [question.id, question]));
const rho = 1000;
const g = 9.80;
const circleArea = diameter => Math.PI * diameter ** 2 / 4;
const radians = degrees => degrees * Math.PI / 180;

test('the energy and momentum additions supply balanced, uniquely identified chapter pools', () => {
  assert.equal(energyMomentumQuestions.length, 28);
  assert.equal(byId.size, energyMomentumQuestions.length);
  for (const topic of ['bernoulli', 'momentum']) {
    const chapter = energyMomentumQuestions.filter(question => question.topic === topic);
    assert.deepEqual(chapter.map(question => question.id),
      Array.from({length: 14}, (_, index) => `${topic}-${String(index + 7).padStart(2, '0')}`));
    assert.equal(chapter.filter(question => question.difficulty === 'Foundation').length, 4);
    assert.equal(chapter.filter(question => question.difficulty === 'Apply').length, 7);
    assert.equal(chapter.filter(question => question.difficulty === 'Connect').length, 3);
    assert.ok(chapter.filter(question => question.kind === 'numeric').length >= 6);
  }
  for (const question of energyMomentumQuestions) {
    const authoredText = [question.title, question.prompt, question.given ?? '', question.hint,
      ...question.solution, question.takeaway, ...(question.choices ?? [])].join(' ');
    assert.ok(!authoredText.includes(';'), `${question.id}: use sentences rather than semicolons`);
    assert.ok(question.solution.length >= 2, question.id);
    assert.ok(new Set(question.tags).size >= 2, question.id);
  }
});

test('all new numeric answers agree with independent head and vector-momentum balances', () => {
  // These oracles use the values stated in the prompts, not stored answers or
  // worked-solution numbers. Pressure conversion and force direction are explicit.
  const expected = {
    'bernoulli-08': 2.50 + (29.40 * 1000) / (rho * g),
    'bernoulli-10': rho * g * (7.20 - 8.00) / 1000,
    'bernoulli-11': Math.sqrt(2 * g * (8.50 - 7.25)),
    'bernoulli-12': (98.0 * 1000 - rho * g * (4.00 - 1.00)) / 1000,
    'bernoulli-13': (40.0 * 1000 + rho / 2 *
      (6.00 ** 2 - (6.00 * circleArea(0.0800) / circleArea(0.160)) ** 2)) / 1000,
    'bernoulli-15': 1.50 + (78.40 * 1000) / (rho * g) +
      2.00 ** 2 / (2 * g) - 4.00 ** 2 / (2 * g),
    'bernoulli-16': 1.20 + (49.00 * 1000) / (rho * g) + 3.50 ** 2 / (2 * g),
    'bernoulli-18': (rho / 2 * (2.00 ** 2 - 4.00 ** 2) + rho * g * 2.00) / 1000,
    'bernoulli-20': Math.sqrt(2 * ((39.20 * 1000) / rho + g * 3.00)),
    'momentum-08': rho * circleArea(0.0200) * 6.00,
    'momentum-10': -10.0 * Math.sin(radians(30.0)),
    // Vane force reverses the fluid momentum change.
    'momentum-11': -(rho * 0.0120) * (5.00 * Math.cos(radians(60.0)) - 5.00),
    'momentum-12': -(rho * 0.00800) * (-10.0 * Math.sin(radians(30.0)) - 0),
    'momentum-13': Math.hypot((rho * 0.00400) * (0 - 12.0),
      (rho * 0.00400) * (-12.0 - 0)),
    // This one asks for force on the water, not the opposite vane reaction.
    'momentum-14': (rho * circleArea(0.0300) * 8.00) *
      (8.00 * Math.cos(radians(120.0)) - 8.00),
    'momentum-16': 27.0 * (5.00 / 3.00) ** 2,
    'momentum-17': 120 / (rho * (6.00 - 6.00 * Math.cos(radians(60.0)))),
    'momentum-19': Math.atan2(
      -(rho * 0.00600) * (-10.0 * Math.sin(radians(120.0))),
      -(rho * 0.00600) * (10.0 * Math.cos(radians(120.0)) - 10.0)
    ) * 180 / Math.PI,
  };
  const numeric = energyMomentumQuestions.filter(question => question.kind === 'numeric');
  assert.deepEqual(new Set(numeric.map(question => question.id)), new Set(Object.keys(expected)),
    'Every new numeric item must have an independently derived oracle');
  for (const question of numeric) {
    const oracle = expected[question.id];
    assert.ok(Number.isFinite(question.answer), question.id);
    assert.ok(Math.abs(question.answer - oracle) < 1e-10 * Math.max(1, Math.abs(oracle)),
      `${question.id}: expected ${oracle}, got ${question.answer}`);
    assert.ok(question.tolerance > 0 && question.tolerance < Math.abs(oracle) * 0.02,
      `${question.id}: tolerance must reject a materially different result`);
    assert.ok(typeof question.unit === 'string' && question.unit.length > 0, question.id);
    assert.equal(question.answerIndex, undefined, question.id);
  }
  assert.ok(byId.get('bernoulli-10').answer < 0, 'HGL below centreline means negative gauge pressure');
  assert.ok(byId.get('bernoulli-18').answer > 0, 'The descent outweighs acceleration in this scenario');
  assert.ok(byId.get('momentum-10').answer < 0, 'A downward outlet has negative y-velocity');
  assert.ok(byId.get('momentum-14').answer < 0, 'The vane reduces the water’s x-momentum');
});

test('new choice questions have distinct options and reviewed physical conclusions', () => {
  // Review keys express the physical conclusion separately from option position.
  const conclusions = {
    'bernoulli-07': 'Pressure energy per unit weight, expressed as a length',
    'bernoulli-09': 'EGL lies above HGL by the velocity head',
    'bernoulli-14': 'Both increase by 2.00 m and their separation is unchanged',
    'bernoulli-17': 'EGL stays level and HGL rises as their gap narrows',
    'bernoulli-19': 'Gauge pressure is negative, but an absolute-pressure and vapour-pressure comparison is needed to assess cavitation',
    'momentum-07': 'ρAV',
    'momentum-09': 'Zero because the inlet and outlet momentum fluxes are identical',
    'momentum-15': 'It becomes four times as large',
    'momentum-18': 'The horizontal component increases throughout, while the upward component peaks at 90° and returns to zero at 180°',
    'momentum-20': 'The velocity direction changes, giving a momentum reaction, while the vane velocity is zero so force does no work through vane motion',
  };
  const choices = energyMomentumQuestions.filter(question => question.kind === 'choice');
  assert.deepEqual(new Set(choices.map(question => question.id)), new Set(Object.keys(conclusions)));
  for (const question of choices) {
    assert.equal(question.choices.length, 4, question.id);
    assert.equal(new Set(question.choices).size, 4, question.id);
    assert.ok(Number.isInteger(question.answerIndex), question.id);
    assert.equal(question.choices[question.answerIndex], conclusions[question.id], question.id);
    assert.equal(question.answer, undefined, question.id);
  }
  // Check the diameter-scaling conclusion from the physical area ratio.
  assert.equal(circleArea(2) / circleArea(1), 4);
});
