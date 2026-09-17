// Chapter schematics are conceptual, with no question-specific values.
// Keep feedback references explicit so an illustration never suggests a
// different geometry (for example, a plane gate for a curved-gate question).
export const diagrams = {
  pressure: {
    height: 300,
    title: 'Pressure and depth',
    alt: 'An open tank of still liquid with density rho. The vertical depth h is measured from the atmospheric free surface to point P. Pressure forces on the wall increase with depth.',
  },
  forces: {
    height: 330,
    title: 'Forces on an inclined gate',
    alt: 'An inclined submerged gate of area A. The centroid C is at vertical depth h c. The centre of pressure CP is deeper, at h cp. The resultant force F acts normal to the gate through CP. Theta is measured from the horizontal.',
  },
  flowlines: {
    height: 360,
    title: 'Three ways to trace a flow',
    alt: 'Three separate schematic constructions. A streamline follows the velocity directions at one instant. A pathline joins successive positions of one particle. A streakline joins the current positions of particles released from one fixed source at different times.',
  },
  continuity: {
    height: 340,
    title: 'Flow through a control volume',
    alt: 'A pipe contracts from inlet 1 to outlet 2. Each section is labelled with its area A, velocity V and density rho. A dashed boundary marks the fixed control volume. Fluid crosses the inlet and outlet, but not the pipe wall.',
  },
  bernoulli: {
    height: 360,
    title: 'Reading the grade lines',
    alt: 'An ideal horizontal pipe contraction with a level energy grade line, EGL, and a hydraulic grade line, HGL, that drops as the pipe narrows. Elevation z is measured from the datum to the pipe centreline. Pressure head spans the centreline to the HGL. Velocity head spans the HGL to the EGL.',
  },
  momentum: {
    height: 360,
    title: 'Jet deflection and vane forces',
    alt: 'A stationary vane deflects a jet from rightward flow to downward and rightward flow through an angle theta. Positive x is right and positive y is up. The force of the jet on the vane has a rightward component F x and an upward component F y.',
  },
};

const feedbackQuestions = new Set([
  'pressure-01', 'pressure-02', 'pressure-03', 'pressure-08', 'pressure-19',
  'forces-01', 'forces-07', 'forces-10', 'forces-16', 'forces-19',
  'flowlines-01', 'flowlines-02', 'flowlines-03', 'flowlines-07',
  'flowlines-10', 'flowlines-13', 'flowlines-15', 'flowlines-16', 'flowlines-19',
  'continuity-02', 'continuity-04', 'continuity-05',
  'continuity-08', 'continuity-09', 'continuity-16',
  'bernoulli-01', 'bernoulli-02', 'bernoulli-05', 'bernoulli-07',
  'bernoulli-08', 'bernoulli-09', 'bernoulli-11', 'bernoulli-14',
  'bernoulli-15', 'bernoulli-16',
  'momentum-10', 'momentum-11', 'momentum-12',
  'momentum-13', 'momentum-15', 'momentum-16', 'momentum-18',
  'momentum-19', 'momentum-20',
]);

export function diagramForQuestion(question) {
  return feedbackQuestions.has(question.id) && Object.hasOwn(diagrams, question.topic)
    ? question.topic : null;
}

export const diagramPath = topic => `./assets/diagrams/${topic}.svg`;
