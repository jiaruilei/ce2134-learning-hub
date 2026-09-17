import test from 'node:test';
import assert from 'node:assert/strict';
import { flowMassQuestions } from '../content/questions-flow-mass.js';

// Physical inputs are written separately from the question bank. Every added
// numeric answer is checked against a mass balance or a kinematic calculation.
const numericalOracles = {
  'flowlines-08': () => {
    const initialY = 0, verticalSpeed = 0.5, elapsedSeconds = 4;
    return initialY + verticalSpeed * elapsedSeconds;
  },
  'flowlines-11': () => {
    const initialX = 1, finalX = 7, initialY = 4, u = 3, v = -2;
    const travelSeconds = (finalX - initialX) / u;
    return initialY + v * travelSeconds;
  },
  'flowlines-12': () => {
    const initialY = 1, initialVerticalSpeed = 0, acceleration = 2, seconds = 3;
    const finalVerticalSpeed = initialVerticalSpeed + acceleration * seconds;
    return initialY + (initialVerticalSpeed + finalVerticalSpeed) / 2 * seconds;
  },
  'flowlines-14': () => {
    const initialX = 2, initialY = 3, finalX = 6, rate = 1;
    // The pathline of this steady field is x = x0 exp(a t), y = y0 exp(a t).
    const travelSeconds = Math.log(finalX / initialX) / rate;
    return initialY * Math.exp(rate * travelSeconds);
  },
  'flowlines-17': () => {
    const pathLength = 20, u = 3, v = 4;
    return pathLength / Math.hypot(u, v);
  },
  'flowlines-19': () => {
    const releaseSeconds = 1, observationSeconds = 4, acceleration = 1;
    const velocityAtRelease = acceleration * releaseSeconds;
    const velocityAtObservation = acceleration * observationSeconds;
    return (velocityAtRelease + velocityAtObservation) / 2 * (observationSeconds - releaseSeconds);
  },
  'continuity-07': () => {
    const density = 800, cubicMetresPerSecond = 0.012;
    return density * cubicMetresPerSecond;
  },
  'continuity-10': () => {
    const litresPerMinute = 18, litresPerCubicMetre = 1000, secondsPerMinute = 60;
    return litresPerMinute / litresPerCubicMetre / secondsPerMinute;
  },
  'continuity-11': () => {
    const inletRates = [0.018, 0.012], outletArea = 0.005;
    return inletRates.reduce((sum, rate) => sum + rate, 0) / outletArea;
  },
  'continuity-12': () => {
    const upstream = { width: 2, depth: 0.4, meanSpeed: 0.75 };
    const downstream = { width: 1.5, depth: 0.25 };
    const discharge = upstream.width * upstream.depth * upstream.meanSpeed;
    return discharge / (downstream.width * downstream.depth);
  },
  'continuity-13': () => {
    const incomingVolume = 0.008 * 120, outgoingVolume = 0.003 * 120, tankArea = 2.5;
    return (incomingVolume - outgoingVolume) / tankArea;
  },
  'continuity-15': () => {
    const discharge = 0.02, limitingSpeed = 2.5, millimetresPerMetre = 1000;
    const radiusMetres = Math.sqrt(discharge / (Math.PI * limitingSpeed));
    return 2 * radiusMetres * millimetresPerMetre;
  },
  'continuity-16': () => {
    const inletDensity = 1.2, inletDischarge = 0.3, outletDischarge = 0.2;
    const massPerSecond = inletDensity * inletDischarge;
    return massPerSecond / outletDischarge;
  },
  'continuity-18': () => {
    const zones = [{ area: 0.01, normalSpeed: 4 }, { area: 0.03, normalSpeed: 2 }];
    return zones.reduce((discharge, zone) => discharge + zone.area * zone.normalSpeed, 0);
  },
  'continuity-20': () => {
    const volume = 0.5, initialDensity = 1.2, inletMassRate = 0.03, outletMassRate = 0.01, seconds = 40;
    const initialMass = volume * initialDensity;
    const enteringMass = inletMassRate * seconds, leavingMass = outletMassRate * seconds;
    return (initialMass + enteringMass - leavingMass) / volume;
  },
};

test('every new flowlines and continuity numeric answer has an independent oracle', () => {
  assert.deepEqual(
    flowMassQuestions.filter(question => question.kind === 'numeric').map(question => question.id).sort(),
    Object.keys(numericalOracles).sort(),
  );
  for (const [id, oracle] of Object.entries(numericalOracles)) {
    const question = flowMassQuestions.find(candidate => candidate.id === id);
    assert.ok(Math.abs(question.answer - oracle()) < 1e-10, `${id}: answer disagrees with its physical calculation`);
    assert.ok(question.tolerance > 0 && Number.isFinite(question.tolerance), `${id}: needs a finite positive tolerance`);
  }
});

test('added flowlines and continuity questions have the agreed topic and difficulty coverage', () => {
  const expectedCounts = {
    flowlines: { Foundation: 4, Apply: 7, Connect: 3 },
    continuity: { Foundation: 4, Apply: 8, Connect: 2 },
  };
  for (const [topic, expectedDifficulties] of Object.entries(expectedCounts)) {
    const chapter = flowMassQuestions.filter(question => question.topic === topic);
    assert.deepEqual(chapter.map(question => question.id), Array.from({ length: 14 }, (_, i) => `${topic}-${String(i + 7).padStart(2, '0')}`));
    for (const [difficulty, expectedCount] of Object.entries(expectedDifficulties)) {
      assert.equal(chapter.filter(question => question.difficulty === difficulty).length, expectedCount);
    }
  }
  for (const question of flowMassQuestions) {
    const studentText = [question.title, question.prompt, question.given || '', question.hint, ...question.solution, question.takeaway, ...(question.choices || [])];
    assert.ok(studentText.every(text => !text.includes(';')), `${question.id}: student text contains a semicolon`);
    assert.ok(question.solution.length >= 2, `${question.id}: needs a worked solution`);
    assert.ok(question.tags.length >= 2, `${question.id}: needs concept tags`);
    if (question.kind === 'choice') {
      assert.equal(question.choices.length, 4, `${question.id}: expected four options`);
      assert.ok(Number.isInteger(question.answerIndex) && question.answerIndex >= 0 && question.answerIndex < question.choices.length);
    }
  }
});
