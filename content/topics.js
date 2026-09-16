export const topics = [
  {
    id: 'pressure',
    number: '01',
    title: 'Hydrostatic pressure',
    eyebrow: 'Fluids at rest',
    description: 'Read pressure from depth, distinguish gauge from absolute pressure, and follow pressure through two fluids.',
    duration: '3–4 min review',
    color: '#2563eb',
    symbol: 'p',
    url: 'https://hydrostatic-pressure.onrender.com/',
    prerequisites: [],
    objectives: [
      'Relate pressure change to vertical depth in a fluid at rest.',
      'Convert between gauge and absolute pressure using the same atmospheric reference.',
      'Add the pressure contributions of layers with different densities.'
    ],
    equations: [
      {
        label: 'A single fluid',
        formula: 'p = p_surface + ρgh',
        note: 'h is vertical depth below the reference surface. For a surface open to the atmosphere, gauge pressure is ρgh. Use g = 9.80 m/s².'
      },
      {
        label: 'Pressure reference',
        formula: 'p_absolute = p_gauge + p_atmospheric',
        note: 'Gauge pressure is measured relative to atmospheric pressure. A negative gauge value means below atmospheric pressure.'
      },
      {
        label: 'Layered fluids',
        formula: 'p_bottom = p_top + ρ₁gh₁ + ρ₂gh₂',
        note: 'Add ρg times the vertical distance travelled downward in each layer; subtract it when travelling upward.'
      }
    ],
    assumptions: [
      'The fluid is at rest and each layer has uniform density.',
      'Gravity is uniform; depth is measured vertically.',
      'Pressure is continuous across the fluid interface when surface-tension effects are neglected.'
    ],
    misconceptions: [
      {
        claim: 'A wider vessel gives a larger pressure at the same depth.',
        correction: 'For the same fluid and surface pressure, pressure depends on vertical depth, not vessel width. A larger area can still produce a larger total force.'
      },
      {
        claim: 'Zero gauge pressure means there is no pressure.',
        correction: 'It means the pressure equals the atmospheric reference. The absolute pressure is still p_atmospheric.'
      },
      {
        claim: 'Two points at the same height always have equal pressure.',
        correction: 'This follows within the same connected fluid at rest. For different fluids or separate vessels, track the densities and reference pressures first.'
      }
    ],
    guidedActivity: {
      title: 'Predict the change before changing the depth',
      steps: [
        'Open the platform and choose a single-fluid case. Note the density and pressure reference.',
        'Compare two depths. Predict the pressure increase with ρgΔh, then compare with the displayed values.',
        'Compare gauge and absolute readings at the same point. Identify the offset between them.',
        'Explore a two-fluid case. Work downward through each layer and add its pressure contribution.'
      ],
      reflection: 'Why can pressure remain continuous at a fluid interface while its rate of increase with depth changes?'
    },
    connection: {
      title: 'From pressure to force',
      text: 'Pressure acts over an area. The next topic adds those local forces and finds where their resultant acts.',
      nextId: 'forces'
    }
  },
  {
    id: 'forces',
    number: '02',
    title: 'Hydrostatic forces',
    eyebrow: 'Pressure over a surface',
    description: 'Find the resultant on a plane surface and resolve the pressure force on a curved surface.',
    duration: '4–5 min review',
    color: '#7c3aed',
    symbol: 'F',
    url: 'https://hydrostatic-force-surfaces.onrender.com/',
    prerequisites: ['pressure'],
    objectives: [
      'Calculate the hydrostatic force on a submerged plane area.',
      'Distinguish the centroid from the centre of pressure.',
      'Resolve a curved-surface force into horizontal and vertical components.'
    ],
    equations: [
      {
        label: 'Plane-surface resultant',
        formula: 'F = ρgh_cA',
        note: 'A is the actual wetted plane area and h_c is its centroid’s vertical depth. The resultant acts normal to the surface.'
      },
      {
        label: 'Centre of pressure',
        formula: 'h_cp = h_c + I_G sin²θ / (A h_c)',
        note: 'θ is the plane’s angle to the horizontal. I_G is the second moment of area about its centroidal axis parallel to the free surface. This form uses gauge pressure zero at that free surface.'
      },
      {
        label: 'Curved-surface components',
        formula: '|F_H| = ρg h_projection A_projection;  |F_V| = ρg V_imaginary',
        note: 'Use the vertical projection for F_H. V_imaginary is the fluid volume between the curved surface and the free-surface plane. Determine each direction from the wetted side and a force balance; combine with F = √(F_H² + F_V²).'
      }
    ],
    assumptions: [
      'The fluid is static and has uniform density; use g = 9.80 m/s².',
      'The formulas use a free surface open to the atmosphere and atmospheric pressure on the opposite side, so atmospheric contributions cancel.',
      'The plane formula applies to a submerged plane area. A curved surface needs a component balance because the local pressure forces have different directions.'
    ],
    misconceptions: [
      {
        claim: 'The resultant always acts through the area centroid.',
        correction: 'Pressure grows with depth. On a nonhorizontal submerged plane, the centre of pressure lies below the centroid. They coincide when the pressure is uniform.'
      },
      {
        claim: 'The depth in ρgh_cA is the distance measured along the plate.',
        correction: 'h_c is vertical depth below the free surface. Convert an along-plate distance using the plate inclination.'
      },
      {
        claim: 'The vertical force on every curved surface points downward.',
        correction: 'Its direction depends on which side is wetted and the surface geometry. Establish the direction from the pressure forces or a fluid free-body diagram.'
      }
    ],
    guidedActivity: {
      title: 'Separate the size of a force from its line of action',
      steps: [
        'Choose the plane-surface case. Locate the centroid and centre of pressure before changing a setting.',
        'Increase submergence while keeping the plate size and inclination fixed. Compare the resultant force and the separation between centroid and centre of pressure.',
        'Vary the inclination. Use vertical depth when explaining the force and the centre-of-pressure position.',
        'Switch to the quarter-circle curved surface. Identify the horizontal and vertical components and explain their directions from the wetted side.'
      ],
      reflection: 'As a fixed inclined plate moves deeper, why does its force increase while the centre of pressure moves closer to its centroid?'
    },
    connection: {
      title: 'From static fluid to moving fluid',
      text: 'Hydrostatics balances forces in a fluid at rest. Flowlines now give you a way to describe fluid motion before applying conservation laws.',
      nextId: 'flowlines'
    }
  },
  {
    id: 'flowlines',
    number: '03',
    title: 'Streamlines, pathlines & streaklines',
    eyebrow: 'Seeing a velocity field',
    description: 'Distinguish a snapshot of the flow from a particle’s journey and a trail from a fixed source.',
    duration: '3–4 min review',
    color: '#0891b2',
    symbol: '→',
    url: 'https://jiaruilei.github.io/Flowlines_interactive/',
    prerequisites: [],
    objectives: [
      'Define a streamline, pathline and streakline using how each is constructed.',
      'Explain why the three line types can differ in unsteady flow.',
      'Use the velocity arrows and the time evolution to identify a curve.'
    ],
    equations: [
      {
        label: 'Streamline: freeze the time',
        formula: 'dy/dx = v(x, y, t₀) / u(x, y, t₀)',
        note: 'The tangent follows the instantaneous velocity field at one fixed time t₀. This slope form assumes u is nonzero.'
      },
      {
        label: 'Pathline: follow one particle',
        formula: 'dx/dt = u(x, y, t);  dy/dt = v(x, y, t)',
        note: 'The same particle moves through the field as time advances. Its previous positions form the pathline.'
      },
      {
        label: 'Streakline: keep the release point fixed',
        formula: 'Streakline at t = current positions of particles released from one fixed point',
        note: 'The particles have different release times. In a steady flow, streamline, pathline and streakline through the same location coincide geometrically.'
      }
    ],
    assumptions: [
      'The platform shows ideal two-dimensional velocity fields and passive tracers.',
      'The displayed line follows the selected construction; it is not a solid boundary.',
      'Compare lines from the same seed or source when investigating whether they coincide.'
    ],
    misconceptions: [
      {
        claim: 'Every curved trace is a particle trajectory.',
        correction: 'Only a pathline follows one particle through time. A streamline is an instantaneous tangent curve; a streakline contains many particles.'
      },
      {
        claim: 'A particle must remain on the streamline drawn at an earlier time.',
        correction: 'In unsteady flow the velocity field changes, so a later particle trajectory need not follow an earlier streamline.'
      },
      {
        claim: 'Steady flow means particles are stationary.',
        correction: 'Steady means velocity at each fixed location does not change with time. Particles can still move and encounter different velocities at different locations.'
      }
    ],
    guidedActivity: {
      title: 'Compare a snapshot, a journey and a fixed source',
      steps: [
        'Use Explore Mode with the Meandering Jet preset. Turn on Steady flow and keep the velocity arrows visible.',
        'Place a streamline, drop a path particle and set a streak source near the same location. Turn the streak source on and compare the curves.',
        'Clear the traces and turn Steady flow off. Repeat, watching how each curve is constructed over time.',
        'Enter Quiz Mode and identify the mystery curve. Use Explain to connect the visual evidence to its definition.'
      ],
      reflection: 'What would a long-exposure photograph of one marked particle show, and how would continuous dye injection at a fixed point differ?'
    },
    connection: {
      title: 'Describe what crosses a boundary',
      text: 'A flow picture shows how fluid moves. A control volume lets you count how much mass enters and leaves a chosen region.',
      nextId: 'continuity'
    }
  },
  {
    id: 'continuity',
    number: '04',
    title: 'Conservation of mass',
    eyebrow: 'A control-volume balance',
    description: 'Connect density, area and velocity, and distinguish mass flow from volume flow.',
    duration: '3–4 min review',
    color: '#059669',
    symbol: 'ṁ',
    url: 'https://jiaruilei.github.io/Conservation-of-Mass/',
    prerequisites: ['flowlines'],
    objectives: [
      'Identify the inlet, outlet and impermeable wall of a fixed control volume.',
      'Use the steady mass balance to predict the outlet velocity.',
      'Explain when equal mass flow also means equal volume flow.'
    ],
    equations: [
      {
        label: 'Account for accumulation',
        formula: 'dm_CV/dt = ṁ_in − ṁ_out',
        note: 'Mass can accumulate in a general control volume. In this steady-flow model, accumulation is zero.'
      },
      {
        label: 'Steady, one inlet and one outlet',
        formula: 'ρ₁V₁A₁ = ρ₂V₂A₂;  A = πD²/4',
        note: 'With uniform section values, V₂ = (ρ₁/ρ₂)(D₁/D₂)²V₁. The wall contributes no through-flow.'
      },
      {
        label: 'Volume flow and mass flow',
        formula: 'Q = VA;  ṁ = ρQ',
        note: 'Q is measured in m³/s; ṁ is measured in kg/s. Equal densities give Q₁ = Q₂ here; unequal densities can give Q₁ ≠ Q₂ while conserving mass.'
      }
    ],
    assumptions: [
      'The model is steady, with one inlet, one outlet and no leakage through the pipe wall.',
      'Density and velocity are uniform over each section.',
      'The smooth transition and tracer animation illustrate continuity; they do not solve the full flow field or determine the pressure.'
    ],
    misconceptions: [
      {
        claim: 'A narrower pipe has less mass flow at the outlet.',
        correction: 'With steady flow and no leakage or accumulation, inlet and outlet mass flows match. Velocity adjusts to the area and density.'
      },
      {
        claim: 'Conservation of mass always means Q₁ = Q₂.',
        correction: 'It means ρ₁Q₁ = ρ₂Q₂ for this steady model. Volume flows are equal only when the two densities are equal.'
      },
      {
        claim: 'Pausing the animation makes the physical flow zero.',
        correction: 'Pause freezes the visual playback. Set the inlet velocity to zero to produce zero flow in the model.'
      }
    ],
    guidedActivity: {
      title: 'Make a prediction using a ratio',
      steps: [
        'Set the two densities equal and keep a nonzero inlet velocity. Highlight the inlet, outlet and pipe wall in turn.',
        'Keep D₁ and V₁ fixed, then halve D₂ within the allowed range. Predict V₂ before reading the result.',
        'Restore the original diameters. Hold ρ₁ fixed and change ρ₂. Compare Q₁, Q₂ and the mass flow.',
        'Pause the animation and inspect the readings. Then set V₁ to zero and compare the physical quantities.'
      ],
      reflection: 'Why does halving a circular pipe’s diameter require a fourfold velocity increase at constant density and volume flow?'
    },
    connection: {
      title: 'Mass balance gives velocity; energy gives pressure',
      text: 'Once continuity links the section velocities, Bernoulli’s equation relates their pressure and elevation changes.',
      nextId: 'bernoulli'
    }
  },
  {
    id: 'bernoulli',
    number: '05',
    title: 'Bernoulli & energy',
    eyebrow: 'Pressure, speed and elevation',
    description: 'Track the exchange between pressure, velocity and elevation head with the HGL and EGL.',
    duration: '4–5 min review',
    color: '#d97706',
    symbol: 'H',
    url: 'https://bernoulli-pipe-hgl-egl.onrender.com/',
    prerequisites: ['pressure', 'continuity'],
    objectives: [
      'Use continuity and Bernoulli together to predict downstream pressure.',
      'Interpret the hydraulic grade line and energy grade line as head values.',
      'Separate the effects of diameter change and elevation change.'
    ],
    equations: [
      {
        label: 'Ideal mechanical-energy balance',
        formula: 'p₁/(ρg) + v₁²/(2g) + z₁ = p₂/(ρg) + v₂²/(2g) + z₂',
        note: 'Pressure head, velocity head and elevation head all have units of metres. Use one pressure reference consistently and g = 9.80 m/s².'
      },
      {
        label: 'Hydraulic grade line',
        formula: 'HGL = z + p/(ρg)',
        note: 'The vertical difference HGL − z is pressure head. With gauge pressure, HGL below the pipe centreline indicates negative gauge pressure.'
      },
      {
        label: 'Energy grade line',
        formula: 'EGL = HGL + v²/(2g)',
        note: 'The gap EGL − HGL is velocity head. For this model without pumps, turbines or losses, EGL is constant along the flow.'
      }
    ],
    assumptions: [
      'Steady, incompressible flow with uniform section velocities; the kinetic-energy correction factor is taken as one.',
      'Apply the ideal balance along the flow with no head loss and no pump or turbine work.',
      'Use a shared elevation datum and the same gauge or absolute pressure reference at both sections. Real cavitation requires an absolute-pressure check.'
    ],
    misconceptions: [
      {
        claim: 'A smaller diameter always means lower pressure, whatever the elevation.',
        correction: 'A contraction increases velocity at fixed flow, but pressure also depends on elevation. Include both velocity-head and elevation-head changes.'
      },
      {
        claim: 'The EGL follows the shape of the pipe.',
        correction: 'EGL is total mechanical head relative to a datum, not the pipe centreline. It remains level in this ideal model.'
      },
      {
        claim: 'The HGL height is pressure by itself.',
        correction: 'HGL contains elevation head as well as pressure head. Subtract the local pipe elevation to read p/(ρg).'
      }
    ],
    guidedActivity: {
      title: 'Change one energy term at a time',
      steps: [
        'Use Explore Mode. Set z₂ relative to z₁ to zero, choose a nonzero upstream speed and show both HGL and EGL.',
        'Hold the upstream settings fixed and reduce D₂. Predict the downstream speed, pressure and EGL–HGL gap, then inspect the display.',
        'Set equal diameters and increase z₂. Compare the pressure head with the HGL and EGL heights.',
        'Explain the two experiments in words before using the platform’s quiz or coach to practise further.'
      ],
      reflection: 'With equal diameters and a higher outlet, how can downstream pressure decrease while the HGL remains level?'
    },
    connection: {
      title: 'Energy and momentum answer different questions',
      text: 'Energy relates pressure, speed and elevation. Momentum also tracks velocity direction, allowing you to calculate the force needed to turn a jet.',
      nextId: 'momentum'
    }
  },
  {
    id: 'momentum',
    number: '06',
    title: 'Momentum & jet forces',
    eyebrow: 'Turning a moving fluid',
    description: 'Use the change in momentum to predict the force a water jet exerts on a stationary vane.',
    duration: '4–5 min review',
    color: '#dc4d69',
    symbol: 'ΔV',
    url: 'https://jiaruilei.github.io/jet-flow/',
    prerequisites: ['continuity'],
    objectives: [
      'Write a steady momentum balance using inlet and outlet velocity components.',
      'Distinguish force on the fluid from the opposite force on the vane.',
      'Explain how deflection angle and jet speed change the force components.'
    ],
    equations: [
      {
        label: 'Force on the fluid',
        formula: 'ΣF_on fluid = ṁ(V_out − V_in)',
        note: 'This is a vector balance for steady flow with one inlet and one outlet. Include all relevant external forces for the chosen control volume.'
      },
      {
        label: 'Force on the vane in this model',
        formula: 'F_x = ρAV²(1 − cosθ);  F_y = ρAV² sinθ',
        note: 'The incoming jet points right. θ is the downward deflection from that direction, from 0° to 180°. Positive force on the vane is rightward in x and upward in y.'
      },
      {
        label: 'Jet flow and resultant',
        formula: 'A = πD²/4;  ṁ = ρAV;  F = √(F_x² + F_y²)',
        note: 'Water density is 1000 kg/m³ in the app. At a fixed diameter and deflection angle, each force component scales with V².'
      }
    ],
    assumptions: [
      'The vane is stationary; a steady water jet follows the prescribed deflection.',
      'The ideal model uses the same speed V at inlet and outlet and neglects losses.',
      'Both free-jet sections are at atmospheric pressure. The component formulas neglect gravity over the turning region and describe force on the vane.'
    ],
    misconceptions: [
      {
        claim: 'There is no force if inlet and outlet speeds are equal.',
        correction: 'Momentum depends on the velocity vector. Turning the jet changes momentum even if the speed stays the same.'
      },
      {
        claim: 'The force on the vane points in the same direction as the force on the fluid.',
        correction: 'These are an action–reaction pair. The vane turns the fluid downward, while the fluid exerts an upward force on the vane.'
      },
      {
        claim: 'Doubling jet speed doubles the force at a fixed diameter.',
        correction: 'Both mass flow and velocity change scale with speed. Together they make the force four times as large at a fixed deflection angle.'
      }
    ],
    guidedActivity: {
      title: 'Turn the jet; keep track of the reaction',
      steps: [
        'Keep jet diameter and speed fixed. Compare deflections of 0°, 90° and 180°.',
        'At each angle, sketch the inlet and outlet velocity arrows and predict the horizontal and vertical forces on the vane.',
        'At 90°, compare the two force components. At 180°, explain why the vertical component returns to zero.',
        'Keep a nonzero deflection angle and diameter fixed, then compare two allowed speeds with a 2:1 ratio. Check the predicted 4:1 force ratio.'
      ],
      reflection: 'Why can a jet transfer momentum to a stationary vane without the vane doing mechanical work through motion?'
    },
    connection: {
      title: 'Bring pressure forces into a control-volume balance',
      text: 'A free jet has atmospheric pressure at its exposed sections. In a pipe or tank, pressure forces can also enter the momentum balance. Revisit hydrostatic forces to practise identifying force directions and resultants.',
      nextId: 'forces'
    }
  }
];
