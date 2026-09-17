import test from 'node:test';
import assert from 'node:assert/strict';
import {questions} from '../content/questions.js';

const topicIds = ['pressure', 'forces', 'flowlines', 'continuity', 'bernoulli', 'momentum'];
const byId = new Map(questions.map(question => [question.id, question]));

test('the review bank has twenty complete, individually addressable questions per topic', () => {
  assert.equal(questions.length, 126);
  assert.equal(byId.size, questions.length, 'Question IDs must be unique for saved attempts');
  for (const topic of [...topicIds, 'mixed']) {
    assert.equal(questions.filter(question => question.topic === topic).length, topic==='mixed'?6:20, topic);
  }
  for (const question of questions) {
    assert.match(question.id, /^[a-z]+-\d{2}$/);
    assert.ok(['Foundation', 'Apply', 'Connect'].includes(question.difficulty));
    assert.ok(['choice', 'numeric'].includes(question.kind));
    for (const key of ['prompt', 'hint', 'takeaway']) {
      assert.equal(typeof question[key], 'string');
      assert.ok(question[key].trim().length > 15, `${question.id}: ${key}`);
    }
    assert.ok(Array.isArray(question.solution) && question.solution.length >= 2);
    assert.ok(question.solution.every(step => typeof step === 'string' && step.trim().length > 10));
    assert.ok(Array.isArray(question.tags) && question.tags.length >= 2);
    assert.equal(new Set(question.tags).size, question.tags.length);
    if (question.topic === 'mixed') {
      assert.ok(question.relatedTopics.length >= 2);
      assert.equal(new Set(question.relatedTopics).size, question.relatedTopics.length);
      assert.ok(question.relatedTopics.every(topic => topicIds.includes(topic)));
    }
  }
});

test('choice submissions have one answer index and distinct visible options', () => {
  for (const question of questions.filter(question => question.kind === 'choice')) {
    assert.equal(question.choices.length, 4, question.id);
    assert.ok(question.choices.every(choice => typeof choice === 'string' && choice.trim()));
    assert.equal(new Set(question.choices.map(choice => choice.trim().toLowerCase())).size, 4, question.id);
    assert.ok(Number.isInteger(question.answerIndex));
    assert.ok(question.answerIndex >= 0 && question.answerIndex < question.choices.length);
    assert.equal(question.answer, undefined, 'Choice questions must not supply a conflicting numeric answer');
  }
  // A numerical choice can be checked independently from the authored key.
  const scaling = byId.get('continuity-04');
  const areaRatio = Math.PI * (1 / 2) ** 2 / Math.PI;
  const physicalAnswer = 1 / areaRatio;
  assert.equal(scaling.choices.filter(choice => Number(choice) === physicalAnswer).length, 1);
  assert.equal(Number(scaling.choices[scaling.answerIndex]), physicalAnswer);
});

test('legacy numeric answers retain their independently evaluated physical results', () => {
  const rho = 1000;
  const g = 9.8;
  const area = diameter => Math.PI * diameter ** 2 / 4;
  // Each oracle uses the physical quantities in its prompt rather than its
  // stored answer or worked-solution text; these check signs and unit conversion.
  const expected = {
    'pressure-02': rho * g * 2.5 / 1000,
    'pressure-03': 101.3 + rho * g * 2 / 1000,
    'pressure-05': g * (800 * 0.5 + rho * 1.2) / 1000,
    'forces-02': rho * g * 2 * (3 ** 2 / 2) / 1000,
    // Integrate h*p(h) over the gate and divide by the integrated pressure.
    'forces-03': ((3 ** 3 - 1 ** 3) / 3) / ((3 ** 2 - 1 ** 2) / 2),
    'forces-05': rho * 0.3 * g / 1000,
    'flowlines-06': 2 / 4,
    'continuity-02': area(0.1) * 1.5 / area(0.05),
    'continuity-03': 0.02 * 3,
    'continuity-05': (1.2 * 0.04 * 5) / (0.8 * 0.025),
    'bernoulli-02': (150000 + rho * 2 ** 2 / 2 - rho * 6 ** 2 / 2) / 1000,
    'bernoulli-03': Math.sqrt(2 * g * 1.8),
    'bernoulli-05': 4 ** 2 / (2 * g),
    'momentum-02': -(rho * 0.002 * 10) * (0 - 10),
    'momentum-03': (rho * 0.01) * (0 - 8),
    'momentum-05': Math.abs((rho * 0.02) * (-5 - 5)),
    'mixed-01': rho * g * (3 ** 2 - 1 ** 2) / 2 / 1000,
    'mixed-02': (100000 + rho / 2 * (1 - (area(0.1) / area(0.05)) ** 2)) / 1000,
    'mixed-03': rho * (0.001 * Math.sqrt(2 * g * 5)) * Math.sqrt(2 * g * 5),
  };
  // New chapter additions have exhaustive independent oracles in the three
  // questions-* test files. Keep these original answer checks intact.
  const numeric = questions.filter(question => question.kind === 'numeric' && Number(question.id.split('-')[1])<=6);
  assert.equal(numeric.length, 19);
  assert.deepEqual(new Set(numeric.map(question => question.id)), new Set(Object.keys(expected)));
  for (const question of numeric) {
    assert.ok(Number.isFinite(question.answer), question.id);
    assert.ok(typeof question.unit === 'string' && question.unit.length > 0);
    assert.ok(Number.isFinite(question.tolerance) && question.tolerance > 0);
    assert.ok(question.tolerance < Math.abs(expected[question.id]) * 0.02,
      `${question.id}: tolerance must not accept a materially different physical result`);
    assert.ok(Math.abs(question.answer - expected[question.id]) <= 1e-10 * Math.max(1, Math.abs(expected[question.id])),
      `${question.id}: expected ${expected[question.id]}, got ${question.answer}`);
    assert.equal(question.answerIndex, undefined);
  }
});

test('linked scenarios retain their physical relationships and signed force convention', () => {
  const absolute = byId.get('pressure-03').answer;
  const gaugeAtTwoMetres = byId.get('pressure-02').answer * 2 / 2.5;
  assert.ok(Math.abs(absolute - gaugeAtTwoMetres - 101.3) < 1e-10);

  const gateForce = byId.get('mixed-01').answer;
  const gateArea = 1 * (3 - 1);
  assert.ok(Math.abs(gateForce / gateArea - gaugeAtTwoMetres) < 1e-10,
    'Average gate pressure must equal pressure at its area centroid');

  assert.ok(byId.get('momentum-03').answer < 0,
    'Turning the jet away from +x requires a negative x force on the water');
  const tankJetSpeed = byId.get('bernoulli-03').answer * Math.sqrt(5 / 1.8);
  assert.ok(Math.abs(byId.get('mixed-03').answer - 1000 * 0.001 * tankJetSpeed ** 2) < 1e-8,
    'Tank-driven plate force must agree with the independently obtained exit speed');
});
