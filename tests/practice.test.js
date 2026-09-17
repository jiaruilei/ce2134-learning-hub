import test from 'node:test';
import assert from 'node:assert/strict';
import {questions} from '../content/questions.js';
import {gradeQuestion, latestMissed, makeSet, topicStats, validSession} from '../lib/practice.js';
import {createStore} from '../lib/storage.js';

const topicIds = ['pressure', 'forces', 'flowlines', 'continuity', 'bernoulli', 'momentum'];
const byId = new Map(questions.map(question => [question.id, question]));
const choice = questions.find(question => question.kind === 'choice');
const numeric = questions.find(question => question.kind === 'numeric');
const ids = ['pressure-01', 'pressure-02', 'pressure-03'];
const answerFor = id => {
  const question = byId.get(id);
  return question.kind === 'choice' ? question.answerIndex : question.answer;
};
const session = overrides => ({
  id: 'local-session-1', ids: [...ids], index: 0, answers: {}, hints: {}, mode: 'mixed', finished: false,
  ...overrides,
});
const attempt = (questionId, correct, index = 0) => ({
  questionId, topic: byId.get(questionId)?.topic || 'pressure', correct,
  at: `2026-09-16T10:00:${String(index).padStart(2, '0')}Z`,
});
function memoryStorage(initial) {
  let serialized = initial;
  return {
    getItem() { return serialized ?? null; },
    setItem(_key, value) { serialized = value; },
    get serialized() { return serialized; },
  };
}

test('choice grading accepts explicit selections and rejects blanks, nonindices, and non-scalar values', () => {
  for (const input of [choice.answerIndex, String(choice.answerIndex), ` ${choice.answerIndex} `]) {
    assert.deepEqual(gradeQuestion(choice, input), {valid: true, correct: true, value: choice.answerIndex});
  }
  const wrong = (choice.answerIndex + 1) % choice.choices.length;
  assert.deepEqual(gradeQuestion(choice, wrong), {valid: true, correct: false, value: wrong});
  for (const input of [null, undefined, '', ' ', '\t\n', -1, choice.choices.length, 1.5, NaN, Infinity, 'not a choice', true, false, [], [0], {}]) {
    assert.equal(gradeQuestion(choice, input).valid, false, `Invalid choice input: ${JSON.stringify(input)}`);
  }
});

test('numeric grading rejects missing, nonfinite, unit-suffixed, and non-scalar inputs', () => {
  for (const input of [null, undefined, '', ' ', '\n', NaN, Infinity, -Infinity, 'Infinity', 'NaN', '24.5 kPa', false, true, [], [24.5], {}]) {
    assert.equal(gradeQuestion(numeric, input).valid, false, `Invalid numeric input: ${JSON.stringify(input)}`);
  }
  assert.deepEqual(gradeQuestion(numeric, ` ${numeric.answer} `), {valid: true, correct: true, value: numeric.answer});
  assert.equal(gradeQuestion(numeric, `${numeric.answer * 10}e-1`).correct, true);
});

test('numeric tolerance includes both boundaries and preserves zero and negative answer signs', () => {
  for (const question of [numeric, byId.get('momentum-03'), {kind: 'numeric', answer: 0, tolerance: 0.25}]) {
    assert.equal(gradeQuestion(question, question.answer).correct, true);
    for (const sign of [-1, 1]) {
      const boundary = question.answer + sign * question.tolerance;
      assert.equal(gradeQuestion(question, boundary).correct, true, 'An exact tolerance boundary is accepted');
      assert.equal(gradeQuestion(question, boundary + sign * question.tolerance * 0.001).correct, false,
        'A value genuinely beyond the boundary is rejected');
    }
  }
  assert.equal(gradeQuestion(byId.get('momentum-03'), 80).correct, false, 'Force direction is part of the answer');
});

test('six-question mixed practice covers each base topic exactly once without changing the bank', () => {
  const before = JSON.stringify(questions);
  for (const random of [() => 0, () => 0.25, () => 0.75, () => 0.999999]) {
    const selected = makeSet(questions, {mode: 'mixed', count: 6}, random);
    assert.equal(selected.length, 6);
    assert.equal(new Set(selected).size, 6);
    assert.deepEqual(new Set(selected.map(id => byId.get(id).topic)), new Set(topicIds));
  }
  assert.equal(JSON.stringify(questions), before);
});

test('twelve-question mixed practice stays unique and includes all six base topics', () => {
  let seed = 12345;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 2 ** 32);
  const selected = makeSet(questions, {mode: 'mixed', count: 12}, random);
  assert.equal(selected.length, 12);
  assert.equal(new Set(selected).size, 12);
  assert.ok(selected.every(id => byId.has(id)));
  for (const topic of topicIds) assert.ok(selected.some(id => byId.get(id).topic === topic), topic);
});

test('topic and connect sets contain only the requested material and respect available pool size', () => {
  for (const topic of topicIds) {
    const selected = makeSet(questions, {mode: 'topic', topic, count: 12}, () => 0.5);
    assert.equal(selected.length, 6);
    assert.equal(new Set(selected).size, 6);
    assert.ok(selected.every(id => byId.get(id).topic === topic));
  }
  const connected = makeSet(questions, {mode: 'connect', count: 12}, () => 0.5);
  assert.equal(connected.length, 6);
  assert.ok(connected.every(id => byId.get(id).topic === 'mixed'));
  assert.deepEqual(makeSet(questions, {mode: 'topic', topic: 'unknown'}, () => 0.5), []);
});

test('retry uses the latest answer: correcting a miss removes it and a later miss re-adds it', () => {
  const attempts = [
    attempt('pressure-01', false, 0),
    attempt('forces-01', false, 1),
    attempt('pressure-01', true, 2),
    attempt('continuity-01', true, 3),
    attempt('continuity-01', false, 4),
  ];
  assert.deepEqual(new Set(latestMissed(attempts)), new Set(['forces-01', 'continuity-01']));
  const retry = makeSet(questions, {mode: 'retry', attempts, count: 12}, () => 0.5);
  assert.deepEqual(new Set(retry), new Set(['forces-01', 'continuity-01']));
  attempts.push(attempt('forces-01', true, 5), attempt('continuity-01', true, 6));
  assert.deepEqual(makeSet(questions, {mode: 'retry', attempts}, () => 0.5), []);
  assert.deepEqual(makeSet(questions, {mode: 'retry', attempts: [attempt('removed-question', false)]}), []);
});

test('restored partial sessions cannot jump past an unanswered question or appear finished', () => {
  const restored = validSession(session({
    index: 2, finished: true,
    answers: {'pressure-01': {value: answerFor('pressure-01'), correct: false, hintUsed: true}},
  }), questions);
  assert.equal(restored.index, 1);
  assert.equal(restored.finished, false);
  assert.deepEqual(restored.answers['pressure-01'], {value: answerFor('pressure-01'), correct: true, hintUsed: true},
    'Restore must recompute correctness rather than trust the persisted flag');

  const noAnswers = validSession(session({index: 2, finished: true}), questions);
  assert.equal(noAnswers.index, 0);
  assert.equal(noAnswers.finished, false);
});

test('session restore discards corrupt answers and answers outside the active set', () => {
  const restored = validSession(session({
    index: 2, finished: true,
    answers: {
      'pressure-01': {value: false, correct: true},
      'pressure-02': {value: 'Infinity', correct: true},
      'forces-01': {value: answerFor('forces-01'), correct: true},
      removed: {value: 0, correct: true},
    },
  }), questions);
  assert.deepEqual(restored.answers, {});
  assert.equal(restored.index, 0);
  assert.equal(restored.finished, false);
});

test('valid completed sessions resume complete and malformed session identities recover to null', () => {
  const answers = Object.fromEntries(ids.map(id => [id, {value: answerFor(id), correct: false}]));
  const complete = validSession(session({index: 2, finished: true, answers}), questions);
  assert.equal(complete.finished, true);
  assert.equal(complete.index, 2);
  assert.ok(Object.values(complete.answers).every(answer => answer.correct));
  for (const corrupt of [null, {}, session({id: null}), session({ids: []}), session({ids: [ids[0], ids[0]]}), session({ids: ['missing']}), session({index: -1}), session({index: 3}), session({index: 0.5})]) {
    assert.equal(validSession(corrupt, questions), null);
  }
});

test('topic statistics count attempted answers and distinguish unattempted topics from zero accuracy', () => {
  const attempts = [attempt('pressure-01', false), attempt('pressure-02', true), attempt('pressure-03', true), attempt('forces-01', false)];
  assert.deepEqual(topicStats(attempts, 'pressure'), {count: 3, correct: 2, accuracy: 67});
  assert.deepEqual(topicStats(attempts, 'forces'), {count: 1, correct: 0, accuracy: 0});
  assert.deepEqual(topicStats(attempts, 'momentum'), {count: 0, correct: 0, accuracy: null});
});

test('browser storage round-trips review state, attempts, and a resumable session', () => {
  const storage = memoryStorage();
  const first = createStore(storage);
  assert.equal(first.available, true);
  first.data.reviewed.pressure = true;
  first.data.attempts.push(attempt('pressure-01', true));
  first.data.session = session({answers: {'pressure-01': {value: answerFor('pressure-01')}}});
  first.save();
  const reopened = createStore(storage);
  assert.deepEqual(reopened.data, first.data);
  assert.ok(validSession(reopened.data.session, questions));
  reopened.clear();
  assert.deepEqual(reopened.data, {version: 2, reviewed: {}, attempts: [], session: null, topicSessions: {}});
  assert.deepEqual(createStore(storage).data, reopened.data);
});

test('blocked storage keeps in-memory progress usable and can recover when writes become available', () => {
  let blocked = true;
  let saved = null;
  const storage = {
    getItem() { if (blocked) throw new Error('Storage denied'); return saved; },
    setItem(_key, value) { if (blocked) throw new Error('Storage denied'); saved = value; },
  };
  const store = createStore(storage);
  assert.equal(store.available, false);
  store.data.attempts.push(attempt('pressure-01', false));
  assert.doesNotThrow(() => store.save());
  assert.equal(store.data.attempts.length, 1);
  blocked = false;
  store.save();
  assert.equal(store.available, true);
  assert.equal(createStore(storage).data.attempts.length, 1);
  assert.doesNotThrow(() => createStore(undefined));
});

test('a write failure preserves previously saved data instead of replacing it with an empty store', () => {
  const previous = {version: 1, reviewed: {forces: true}, attempts: [attempt('forces-01', true)], session: null};
  const store = createStore({getItem: () => JSON.stringify(previous), setItem() { throw new Error('Quota exceeded'); }});
  assert.equal(store.available, false);
  assert.deepEqual(store.data, {...previous, version: 2, topicSessions: {}});
});

test('corrupt JSON and unsupported versions recover safely; malformed attempt records are discarded', () => {
  for (const initial of ['not JSON', '{broken', JSON.stringify({version: 999, attempts: [attempt('pressure-01', true)]})]) {
    const storage = memoryStorage(initial);
    const store = createStore(storage);
    assert.deepEqual(store.data, {version: 2, reviewed: {}, attempts: [], session: null, topicSessions: {}});
    assert.doesNotThrow(() => store.save());
    assert.equal(store.available, true);
    assert.deepEqual(JSON.parse(storage.serialized), store.data);
  }
  const good = attempt('pressure-01', true);
  const store = createStore(memoryStorage(JSON.stringify({
    version: 1, reviewed: [], attempts: [good, null, {}, {...good, correct: 'true'}, {...good, at: 123}, {...good, questionId: false}],
  })));
  assert.deepEqual(store.data.reviewed, {});
  assert.deepEqual(store.data.attempts, [good]);
});
