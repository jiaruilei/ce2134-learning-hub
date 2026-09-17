import { mathText as mt, inlineMath as im, displayMath as dm } from '../lib/math.js';

// Presentation only. Every fallback retains the original question text exactly.
export const flowMassMath = {
  'flowlines-01': {},
  'flowlines-02': {},
  'flowlines-03': {},
  'flowlines-04': {},
  'flowlines-05': {},
  'flowlines-06': {
    prompt: mt`At a point in a two-dimensional flow, the velocity components are ${im(String.raw`u = 4.00\,\mathrm{m/s}`, 'u = 4.00 m/s')} in ${im('+x')} and ${im(String.raw`v = 2.00\,\mathrm{m/s}`, 'v = 2.00 m/s')} in ${im('+y')}. Find the instantaneous streamline slope ${im(String.raw`\frac{\mathrm{d}y}{\mathrm{d}x}`, 'dy/dx')} there.`,
    given: mt`Use Cartesian coordinates. The ${im('x')}-component of velocity is nonzero.`,
    solution: [
      mt`For a streamline, ${dm(String.raw`\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{v}{u}.`, 'dy/dx = v/u.')}`,
      mt`Here ${dm(String.raw`\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{2.00}{4.00} = 0.500.`, 'dy/dx = 2.00/4.00 = 0.500.')}`,
    ],
  },
  'flowlines-07': {},
  'flowlines-08': {
    prompt: mt`A particle starts at ${im('y = 0')} and moves for ${im(String.raw`4.00\,\mathrm{s}`, '4.00 s')} in a uniform, steady flow with ${im(String.raw`u = 1.50\,\mathrm{m/s}`, 'u = 1.50 m/s')} and ${im(String.raw`v = 0.500\,\mathrm{m/s}`, 'v = 0.500 m/s')}. Find its final ${im('y')}-coordinate.`,
    given: mt`The velocity components are along ${im('+x')} and ${im('+y')} in Cartesian coordinates.`,
    hint: mt`Only the vertical velocity component determines the change in ${im('y')}.`,
    solution: [
      mt`The pathline satisfies ${dm(String.raw`\frac{\mathrm{d}y}{\mathrm{d}t} = v = 0.500\,\mathrm{m/s}.`, 'dy/dt = v = 0.500 m/s.')}`,
      mt`Thus ${dm(String.raw`\begin{aligned}y &= 0 + 0.500\times4.00 \\ &= 2.00\,\mathrm{m}.\end{aligned}`, 'y = 0 + 0.500 × 4.00 = 2.00 m.')} The horizontal component determines ${im('x')} separately.`,
    ],
  },
  'flowlines-09': {
    prompt: mt`At a regular point, the instantaneous velocity components are ${im('u = 0')} and ${im(String.raw`v = 2.00\,\mathrm{m/s}`, 'v = 2.00 m/s')}. What is the local streamline direction?`,
    choices: [mt`Horizontal toward ${im('+x')}`, 'Undefined because the fluid is stationary', mt`Vertical toward ${im('+y')}`, mt`At ${im(String.raw`45^\circ`, '45°')} to the ${im('x')}-axis`],
    hint: mt`Use the velocity vector directly when the slope ratio ${im(String.raw`\frac{v}{u}`, 'v/u')} cannot be evaluated.`,
    solution: [
      mt`The velocity vector has no ${im('x')}-component and a positive ${im('y')}-component.`,
      mt`The streamline has a vertical tangent directed toward ${im('+y')}. The slope ${im(String.raw`\frac{\mathrm{d}y}{\mathrm{d}x}`, 'dy/dx')} is undefined, but the direction is well defined.`,
    ],
  },
  'flowlines-10': {},
  'flowlines-11': {
    prompt: mt`A streamline passes through ${im(String.raw`(x,y) = (1.00\,\mathrm{m},4.00\,\mathrm{m})`, '(x, y) = (1.00 m, 4.00 m)')} in a uniform flow with ${im(String.raw`u = 3.00\,\mathrm{m/s}`, 'u = 3.00 m/s')} and ${im(String.raw`v = -2.00\,\mathrm{m/s}`, 'v = −2.00 m/s')}. Find its ${im('y')}-coordinate at ${im(String.raw`x = 7.00\,\mathrm{m}`, 'x = 7.00 m')}.`,
    hint: mt`Use the streamline slope ${im(String.raw`\frac{v}{u}`, 'v/u')} and the change in ${im('x')} from the given point.`,
    solution: [
      mt`${dm(String.raw`\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{v}{u} = -\frac{2}{3},`, 'dy/dx = v/u = −2/3,')} so ${dm(String.raw`y - 4.00 = -\frac{2}{3}(x - 1.00).`, 'y − 4.00 = (−2/3)(x − 1.00).')}`,
      mt`At ${im(String.raw`x = 7.00\,\mathrm{m}`, 'x = 7.00 m')}, ${dm(String.raw`\begin{aligned}y &= 4.00 - \frac{2}{3}\times6.00 \\ &= 0\,\mathrm{m}.\end{aligned}`, 'y = 4.00 − (2/3) × 6.00 = 0 m.')}`,
    ],
  },
  'flowlines-12': {
    prompt: mt`A particle starts at ${im(String.raw`y = 1.00\,\mathrm{m}`, 'y = 1.00 m')} when ${im('t = 0')}. In a spatially uniform flow, ${im(String.raw`u = 2.00\,\mathrm{m/s}`, 'u = 2.00 m/s')} and ${im('v = at')} with ${im(String.raw`a = 2.00\,\mathrm{m/s^2}`, 'a = 2.00 m/s²')}. Find the particle’s ${im('y')}-coordinate at ${im(String.raw`t = 3.00\,\mathrm{s}`, 't = 3.00 s')}.`,
    given: mt`The velocity law applies throughout ${im(String.raw`0 \le t \le 3.00\,\mathrm{s}`, '0 ≤ t ≤ 3.00 s')}. The tracer follows the local fluid velocity exactly.`,
    hint: mt`The vertical velocity changes with time, so integrate ${im('v')} rather than multiplying the final velocity by the entire duration.`,
    solution: [
      mt`The vertical displacement is ${dm(String.raw`\begin{aligned}\int_0^3 at\,\mathrm{d}t &= \frac{a(3.00)^2}{2} \\ &= 9.00\,\mathrm{m}.\end{aligned}`, '∫₀³ at dt = a(3.00)²/2 = 9.00 m.')}`,
      mt`Add the initial coordinate: ${dm(String.raw`y = 1.00 + 9.00 = 10.00\,\mathrm{m}.`, 'y = 1.00 + 9.00 = 10.00 m.')}`,
    ],
  },
  'flowlines-13': {},
  'flowlines-14': {
    prompt: mt`In the steady two-dimensional field ${im('u = ax')} and ${im('v = ay')}, find the ${im('y')}-coordinate at ${im(String.raw`x = 6.00\,\mathrm{m}`, 'x = 6.00 m')} of the streamline through ${im(String.raw`(2.00\,\mathrm{m},3.00\,\mathrm{m})`, '(2.00 m, 3.00 m)')}.`,
    given: mt`${im(String.raw`a = 1.00\,\mathrm{s^{-1}}`, 'a = 1.00 s⁻¹')} and ${im('x > 0')} throughout the region.`,
    hint: mt`The streamline equation is ${im(String.raw`\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{y}{x}`, 'dy/dx = y/x')}. Integrating gives ${im('y = Cx')} in this region.`,
    solution: [
      mt`From ${im(String.raw`\frac{\mathrm{d}y}{\mathrm{d}x} = \frac{y}{x}`, 'dy/dx = y/x')}, a streamline satisfies ${im('y = Cx')}.`,
      mt`The starting point gives ${dm(String.raw`C = \frac{3.00}{2.00} = 1.50.`, 'C = 3.00/2.00 = 1.50.')} At ${im(String.raw`x = 6.00\,\mathrm{m}`, 'x = 6.00 m')}, ${dm(String.raw`y = 1.50\times6.00 = 9.00\,\mathrm{m}.`, 'y = 1.50 × 6.00 = 9.00 m.')}`,
    ],
  },
  'flowlines-15': {
    prompt: mt`A streamline drawn at ${im(String.raw`t = 1\,\mathrm{s}`, 't = 1 s')} crosses a streamline drawn at ${im(String.raw`t = 3\,\mathrm{s}`, 't = 3 s')} with a different tangent. Is this necessarily inconsistent with a single-valued velocity field?`,
  },
  'flowlines-16': {},
  'flowlines-17': {
    prompt: mt`A tracer moves in a uniform, steady flow with ${im(String.raw`u = 3.00\,\mathrm{m/s}`, 'u = 3.00 m/s')} and ${im(String.raw`v = 4.00\,\mathrm{m/s}`, 'v = 4.00 m/s')}. How long does it take to travel ${im(String.raw`20.0\,\mathrm{m}`, '20.0 m')} along its pathline?`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}\text{Speed} &= \sqrt{u^2 + v^2} \\ &= \sqrt{3.00^2 + 4.00^2} \\ &= 5.00\,\mathrm{m/s}.\end{aligned}`, 'Speed = √(u² + v²) = √(3.00² + 4.00²) = 5.00 m/s.')}`,
      mt`${dm(String.raw`\text{Travel time} = \frac{20.0}{5.00} = 4.00\,\mathrm{s}.`, 'Travel time = 20.0/5.00 = 4.00 s.')}`,
    ],
  },
  'flowlines-18': {
    prompt: mt`A spatially uniform flow has ${im(String.raw`u = U_0\left(1 + \frac{t}{T}\right)`, 'u = U₀(1 + t/T)')} and ${im('v = 0')} for ${im(String.raw`t \ge 0`, 't ≥ 0')}, where ${im('U_0', 'U₀')} and ${im('T')} are positive constants. Tracers are released from the origin. Which statement is correct?`,
    choices: [
      'The flow is steady because its direction is constant',
      'The three curves must have different directions because the speed changes',
      'A streamline must curve upward as time increases',
      mt`The flow is unsteady, but all three curves lie along the ${im('x')}-axis`,
    ],
    solution: [
      'The velocity at every fixed location changes with time, so this is unsteady flow.',
      mt`The vertical velocity is always zero and the horizontal velocity is positive. Streamlines through the origin and all tracer trajectories and streaks from it lie on the ${im('x')}-axis.`,
    ],
  },
  'flowlines-19': {
    prompt: mt`Dye is released continuously from the origin into a spatially uniform flow with ${im(String.raw`u = 2.00\,\mathrm{m/s}`, 'u = 2.00 m/s')} and ${im('v = at')}, where ${im(String.raw`a = 1.00\,\mathrm{m/s^2}`, 'a = 1.00 m/s²')}. At observation time ${im(String.raw`t = 4.00\,\mathrm{s}`, 't = 4.00 s')}, find the ${im('y')}-coordinate of the dye particle released at ${im(String.raw`t = 1.00\,\mathrm{s}`, 't = 1.00 s')}.`,
    given: mt`Time ${im('t')} is measured from the start of the experiment, not from each particle’s release. The dye follows the fluid without diffusion.`,
    hint: mt`This member of the streakline starts at ${im('y = 0')} at its own release time. Integrate ${im('v')} from ${im(String.raw`1.00\,\mathrm{s}`, '1.00 s')} to ${im(String.raw`4.00\,\mathrm{s}`, '4.00 s')}.`,
    solution: [
      mt`The particle’s vertical displacement is ${dm(String.raw`\int_1^4 at\,\mathrm{d}t = \frac{a(4.00^2 - 1.00^2)}{2}.`, '∫₁⁴ at dt = a(4.00² − 1.00²)/2.')}`,
      mt`Its ${im('y')}-coordinate is ${dm(String.raw`\begin{aligned}\frac{1.00}{2}\times(16.00 - 1.00) \\ = 7.50\,\mathrm{m}.\end{aligned}`, '(1.00/2) × (16.00 − 1.00) = 7.50 m.')} Other members of the streakline have different release times.`,
    ],
  },
  'flowlines-20': {},
  'continuity-01': {
    given: mt`There is no storage or leakage; ${im(String.raw`Q_{\mathrm{in}}`, 'Qin')} enters, and ${im(String.raw`Q_{\mathrm{out},1}`, 'Qout,1')} and ${im(String.raw`Q_{\mathrm{out},2}`, 'Qout,2')} leave the junction.`,
    choices: [
      mt`${im(String.raw`Q_{\mathrm{in}} = Q_{\mathrm{out},1} - Q_{\mathrm{out},2}`, 'Qin = Qout,1 − Qout,2')}`,
      mt`${im(String.raw`Q_{\mathrm{in}} = Q_{\mathrm{out},1} + Q_{\mathrm{out},2}`, 'Qin = Qout,1 + Qout,2')}`,
      mt`${im(String.raw`Q_{\mathrm{in}} = Q_{\mathrm{out},1} = Q_{\mathrm{out},2}`, 'Qin = Qout,1 = Qout,2')} in every junction`,
      mt`${im(String.raw`Q_{\mathrm{in}} = \frac{Q_{\mathrm{out},1} + Q_{\mathrm{out},2}}{2}`, 'Qin = (Qout,1 + Qout,2)/2')}`,
    ],
    solution: [
      mt`Steady conservation of mass gives ${dm(String.raw`\rho Q_{\mathrm{in}} = \rho Q_{\mathrm{out},1} + \rho Q_{\mathrm{out},2}.`, 'ρQin = ρQout,1 + ρQout,2.')}`,
      mt`The common density cancels, leaving ${dm(String.raw`Q_{\mathrm{in}} = Q_{\mathrm{out},1} + Q_{\mathrm{out},2}.`, 'Qin = Qout,1 + Qout,2.')}`,
    ],
  },
  'continuity-02': {
    prompt: mt`Steady incompressible flow passes from a ${im(String.raw`0.100\,\mathrm{m}`, '0.100 m')} diameter pipe into a ${im(String.raw`0.050\,\mathrm{m}`, '0.050 m')} diameter pipe. If the upstream mean speed is ${im(String.raw`1.50\,\mathrm{m/s}`, '1.50 m/s')}, find the downstream mean speed.`,
    solution: [
      mt`${im('A_1 V_1 = A_2 V_2', 'A1V1 = A2V2')}, so ${dm(String.raw`V_2 = V_1\left(\frac{D_1}{D_2}\right)^2.`, 'V2 = V1(D1/D2)².')}`,
      mt`${dm(String.raw`\begin{aligned}V_2 &= 1.50\left(\frac{0.100}{0.050}\right)^2 \\ &= 6.00\,\mathrm{m/s}.\end{aligned}`, 'V2 = 1.50 × (0.100/0.050)² = 6.00 m/s.')}`,
    ],
  },
  'continuity-03': {
    prompt: mt`A pipe has a flow area of ${im(String.raw`0.0200\,\mathrm{m^2}`, '0.0200 m²')} and a mean flow speed of ${im(String.raw`3.00\,\mathrm{m/s}`, '3.00 m/s')}. Find the volumetric flow rate.`,
    hint: mt`Use ${im('Q = A')} times the area-mean velocity.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}Q &= AV = 0.0200\times3.00 \\ &= 0.0600\,\mathrm{m^3/s}.\end{aligned}`, 'Q = AV = 0.0200 × 3.00 = 0.0600 m³/s.')}`,
      mt`This is also ${im(String.raw`60.0\,\mathrm{L/s}`, '60.0 L/s')}, but enter the answer in ${im(String.raw`\mathrm{m^3/s}`, 'm³/s')}.`,
    ],
  },
  'continuity-04': {
    choices: [mt`${im('0.5')}`, mt`${im('2')}`, mt`${im('4')}`, mt`${im('8')}`],
    solution: [
      mt`${dm(String.raw`\frac{A_{\mathrm{new}}}{A_{\mathrm{old}}} = \left(\frac{1}{2}\right)^2 = \frac{1}{4}.`, 'Anew/Aold = (1/2)² = 1/4.')}`,
      mt`Since ${im('Q = AV')} is fixed, ${dm(String.raw`\frac{V_{\mathrm{new}}}{V_{\mathrm{old}}} = \frac{A_{\mathrm{old}}}{A_{\mathrm{new}}} = 4.`, 'Vnew/Vold = Aold/Anew = 4.')}`,
    ],
  },
  'continuity-05': {
    prompt: mt`A steady gas flow enters a duct at ${im(String.raw`\rho_1 = 1.20\,\mathrm{kg/m^3}`, 'ρ1 = 1.20 kg/m³')}, ${im(String.raw`A_1 = 0.0400\,\mathrm{m^2}`, 'A1 = 0.0400 m²')}, and ${im(String.raw`V_1 = 5.00\,\mathrm{m/s}`, 'V1 = 5.00 m/s')}. It leaves at ${im(String.raw`\rho_2 = 0.800\,\mathrm{kg/m^3}`, 'ρ2 = 0.800 kg/m³')} through ${im(String.raw`A_2 = 0.0250\,\mathrm{m^2}`, 'A2 = 0.0250 m²')}. Find ${im('V_2', 'V2')}.`,
    hint: mt`Density changes, so conserve ${im(String.raw`\rho AV`, 'ρAV')} rather than ${im('AV')}.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&\text{Mass flow rate} = \rho_1 A_1 V_1 \\ &= 1.20\times0.0400\times5.00 \\ &= 0.240\,\mathrm{kg/s}.\end{aligned}`, 'Mass flow rate = ρ1A1V1 = 1.20 × 0.0400 × 5.00 = 0.240 kg/s.')}`,
      mt`${dm(String.raw`\begin{aligned}V_2 &= \frac{0.240}{0.800\times0.0250} \\ &= 12.00\,\mathrm{m/s}.\end{aligned}`, 'V2 = 0.240/(0.800 × 0.0250) = 12.00 m/s.')}`,
    ],
  },
  'continuity-06': {
    prompt: mt`Water enters a tank at ${im(String.raw`5\,\mathrm{L/s}`, '5 L/s')} and leaves at ${im(String.raw`3\,\mathrm{L/s}`, '3 L/s')}. What must be included in its mass balance?`,
    choices: [mt`An accumulation term: stored water volume increases at ${im(String.raw`2\,\mathrm{L/s}`, '2 L/s')}`, 'No accumulation term, because each flow rate is constant', mt`A loss of water mass at ${im(String.raw`2\,\mathrm{L/s}`, '2 L/s')}`, 'Equal inlet and outlet speeds, regardless of area'],
    solution: [
      mt`The volume balance is ${dm(String.raw`\frac{\mathrm{d}V_{\mathrm{stored}}}{\mathrm{d}t} = Q_{\mathrm{in}} - Q_{\mathrm{out}}.`, 'dVstored/dt = Qin − Qout.')}`,
      mt`Here ${dm(String.raw`\frac{\mathrm{d}V_{\mathrm{stored}}}{\mathrm{d}t} = 5 - 3 = 2\,\mathrm{L/s},`, 'dVstored/dt = 5 − 3 = 2 L/s,')} so the tank contents are accumulating.`,
    ],
  },
  'continuity-07': {
    prompt: mt`Oil of density ${im(String.raw`800\,\mathrm{kg/m^3}`, '800 kg/m³')} flows at a volumetric rate of ${im(String.raw`0.0120\,\mathrm{m^3/s}`, '0.0120 m³/s')}. Find its mass flow rate.`,
    solution: [
      mt`Mass flow rate is ${im(String.raw`\dot{m} = \rho Q`, 'ṁ = ρQ')}.`,
      mt`${dm(String.raw`\dot{m} = 800\times0.0120 = 9.60\,\mathrm{kg/s}.`, 'ṁ = 800 × 0.0120 = 9.60 kg/s.')}`,
    ],
  },
  'continuity-08': {},
  'continuity-09': {
    solution: [mt`Zero accumulation means ${im(String.raw`\frac{\mathrm{d}m}{\mathrm{d}t} = 0`, 'dm/dt = 0')} for the mass inside the control volume.`, 'Mass may enter and leave continuously, provided the total inlet and outlet mass flow rates balance.'],
  },
  'continuity-10': {
    prompt: mt`A flow meter reads ${im(String.raw`18.0\,\mathrm{L/min}`, '18.0 L/min')}. Express this volumetric flow rate in ${im(String.raw`\mathrm{m^3/s}`, 'm³/s')}.`,
    given: mt`${im(String.raw`1\,\mathrm{L} = 0.001\,\mathrm{m^3}`, '1 L = 0.001 m³')} and ${im(String.raw`1\,\mathrm{min} = 60\,\mathrm{s}`, '1 min = 60 s')}.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}18.0\,\mathrm{L/min} &= 18.0\times0.001 \\ &= 0.0180\,\mathrm{m^3/min}.\end{aligned}`, '18.0 L/min = 18.0 × 0.001 = 0.0180 m³/min.')}`,
      mt`Divide by ${im('60')} to obtain ${im(String.raw`0.000300\,\mathrm{m^3/s}`, '0.000300 m³/s')}.`,
    ],
  },
  'continuity-11': {
    prompt: mt`Two water pipes supply a junction at ${im(String.raw`0.0180\,\mathrm{m^3/s}`, '0.0180 m³/s')} and ${im(String.raw`0.0120\,\mathrm{m^3/s}`, '0.0120 m³/s')}. The single outlet has an area of ${im(String.raw`0.00500\,\mathrm{m^2}`, '0.00500 m²')}. Find the outlet mean speed.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}Q_{\mathrm{out}} &= 0.0180 + 0.0120 \\ &= 0.0300\,\mathrm{m^3/s}.\end{aligned}`, 'Qout = 0.0180 + 0.0120 = 0.0300 m³/s.')}`,
      mt`${dm(String.raw`\begin{aligned}V_{\mathrm{out}} &= \frac{Q_{\mathrm{out}}}{A_{\mathrm{out}}} = \frac{0.0300}{0.00500} \\ &= 6.00\,\mathrm{m/s}.\end{aligned}`, 'Vout = Qout/Aout = 0.0300/0.00500 = 6.00 m/s.')}`,
    ],
  },
  'continuity-12': {
    prompt: mt`In a rectangular channel, water flows at a mean speed of ${im(String.raw`0.750\,\mathrm{m/s}`, '0.750 m/s')} where the width is ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} and depth is ${im(String.raw`0.400\,\mathrm{m}`, '0.400 m')}. Farther downstream, the width is ${im(String.raw`1.50\,\mathrm{m}`, '1.50 m')} and depth is ${im(String.raw`0.250\,\mathrm{m}`, '0.250 m')}. Find the downstream mean speed.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}Q &= (2.00\times0.400)\times0.750 \\ &= 0.600\,\mathrm{m^3/s}.\end{aligned}`, 'Q = (2.00 × 0.400) × 0.750 = 0.600 m³/s.')}`,
      mt`The downstream area is ${dm(String.raw`1.50\times0.250 = 0.375\,\mathrm{m^2},`, '1.50 × 0.250 = 0.375 m²,')} so ${dm(String.raw`V = \frac{0.600}{0.375} = 1.60\,\mathrm{m/s}.`, 'V = 0.600/0.375 = 1.60 m/s.')}`,
    ],
  },
  'continuity-13': {
    prompt: mt`Water enters a vertical-sided tank at ${im(String.raw`0.00800\,\mathrm{m^3/s}`, '0.00800 m³/s')} and leaves at ${im(String.raw`0.00300\,\mathrm{m^3/s}`, '0.00300 m³/s')} for ${im(String.raw`120\,\mathrm{s}`, '120 s')}. The horizontal tank area is ${im(String.raw`2.50\,\mathrm{m^2}`, '2.50 m²')}. Find the rise in water level.`,
    solution: [
      mt`The added water volume is ${dm(String.raw`\begin{aligned}(0.00800 - 0.00300)\times120 \\ = 0.600\,\mathrm{m^3}.\end{aligned}`, '(0.00800 − 0.00300) × 120 = 0.600 m³.')}`,
      mt`${dm(String.raw`\begin{aligned}\text{Level rise} &= \frac{\text{added volume}}{\text{tank area}} \\ &= \frac{0.600}{2.50} = 0.240\,\mathrm{m}.\end{aligned}`, 'Level rise = added volume/tank area = 0.600/2.50 = 0.240 m.')}`,
    ],
  },
  'continuity-14': {
    prompt: mt`The axial velocity varies across a pipe. A sensor measures only the centreline speed. Can that reading be used directly as ${im('V')} in ${im('Q = AV')}?`,
    choices: ['Yes, the centreline speed is always the area-mean speed', mt`No, ${im('Q = AV')} requires the area-mean normal velocity`, 'Yes, provided the pipe is circular', mt`No, ${im('Q = AV')} cannot be used for any nonuniform velocity profile`],
    solution: [
      mt`For nonuniform flow, ${im('Q')} is the integral of the normal velocity over the full area.`,
      mt`The expression ${im('Q = AV')} remains valid when ${im('V')} is the area-mean normal velocity. One centreline reading does not determine that mean without more information.`,
    ],
  },
  'continuity-15': {
    prompt: mt`A full circular pipe must carry ${im(String.raw`0.0200\,\mathrm{m^3/s}`, '0.0200 m³/s')} while its mean speed is no greater than ${im(String.raw`2.50\,\mathrm{m/s}`, '2.50 m/s')}. Find the minimum internal diameter.`,
    hint: mt`First find the minimum area from ${im(String.raw`\frac{Q}{V_{\mathrm{max}}}`, 'Q/Vmax')}, then use ${im(String.raw`A = \frac{\pi D^2}{4}`, 'A = πD²/4')}.`,
    solution: [
      mt`${dm(String.raw`A_{\mathrm{min}} = \frac{0.0200}{2.50} = 0.00800\,\mathrm{m^2}.`, 'Amin = 0.0200/2.50 = 0.00800 m².')}`,
      mt`${dm(String.raw`\begin{aligned}D_{\mathrm{min}} &= \sqrt{\frac{4\times0.00800}{\pi}} \\ &= 0.100925\,\mathrm{m} \\ &= 100.93\,\mathrm{mm}.\end{aligned}`, 'Dmin = √(4 × 0.00800/π) = 0.100925 m = 100.93 mm.')} A smaller diameter would give a larger mean speed.`,
    ],
  },
  'continuity-16': {
    prompt: mt`Gas enters a steady-flow device at a density of ${im(String.raw`1.20\,\mathrm{kg/m^3}`, '1.20 kg/m³')} and a volumetric rate of ${im(String.raw`0.300\,\mathrm{m^3/s}`, '0.300 m³/s')}. Its outlet volumetric rate is ${im(String.raw`0.200\,\mathrm{m^3/s}`, '0.200 m³/s')}. Find the outlet density.`,
    hint: mt`The conserved quantity is mass flow rate, so use ${im(String.raw`\rho_{\mathrm{in}} Q_{\mathrm{in}} = \rho_{\mathrm{out}} Q_{\mathrm{out}}`, 'ρinQin = ρoutQout')}.`,
    solution: [
      mt`The inlet mass flow rate is ${dm(String.raw`1.20\times0.300 = 0.360\,\mathrm{kg/s}.`, '1.20 × 0.300 = 0.360 kg/s.')}`,
      mt`The outlet density is ${dm(String.raw`\frac{0.360}{0.200} = 1.80\,\mathrm{kg/m^3}.`, '0.360/0.200 = 1.80 kg/m³.')}`,
    ],
  },
  'continuity-17': {
    solution: [
      mt`Steady mass conservation gives ${dm(String.raw`\rho_1 A V_1 = \rho_2 A V_2.`, 'ρ₁A V₁ = ρ₂A V₂.')}`,
      mt`With ${im(String.raw`\rho_2 = \frac{\rho_1}{2}`, 'ρ₂ = ρ₁/2')}, the outlet speed is ${im('V_2 = 2V_1', 'V₂ = 2V₁')}.`,
    ],
  },
  'continuity-18': {
    prompt: mt`A flow cross-section consists of two zones. A ${im(String.raw`0.0100\,\mathrm{m^2}`, '0.0100 m²')} zone has a uniform normal velocity of ${im(String.raw`4.00\,\mathrm{m/s}`, '4.00 m/s')} and a ${im(String.raw`0.0300\,\mathrm{m^2}`, '0.0300 m²')} zone has a uniform normal velocity of ${im(String.raw`2.00\,\mathrm{m/s}`, '2.00 m/s')}. Find the total volumetric flow rate.`,
    solution: [
      mt`The zone contributions are ${dm(String.raw`0.0100\times4.00 = 0.0400\,\mathrm{m^3/s}`, '0.0100 × 4.00 = 0.0400 m³/s')} and ${dm(String.raw`0.0300\times2.00 = 0.0600\,\mathrm{m^3/s}.`, '0.0300 × 2.00 = 0.0600 m³/s.')}`,
      mt`Total ${dm(String.raw`\begin{aligned}Q &= 0.0400 + 0.0600 \\ &= 0.100\,\mathrm{m^3/s}.\end{aligned}`, 'Q = 0.0400 + 0.0600 = 0.100 m³/s.')} The area-mean velocity is ${dm(String.raw`\frac{0.100}{0.0400} = 2.50\,\mathrm{m/s}.`, '0.100/0.0400 = 2.50 m/s.')}`,
    ],
  },
  'continuity-19': {
    prompt: mt`A graph shows the total inlet mass flow greater than the total outlet mass flow just before ${im(String.raw`t = 10\,\mathrm{s}`, 't = 10 s')}. The rates are equal at ${im(String.raw`t = 10\,\mathrm{s}`, 't = 10 s')}, and the outlet rate is greater just afterward. What happens to the mass stored in the fixed control volume at that time?`,
    given: mt`All mass transfers are included. The rates are continuous near ${im(String.raw`t = 10\,\mathrm{s}`, 't = 10 s')}.`,
    solution: [mt`Before ${im(String.raw`10\,\mathrm{s}`, '10 s')}, the positive mass-flow difference makes stored mass increase. After ${im(String.raw`10\,\mathrm{s}`, '10 s')}, the negative difference makes it decrease.`, 'At the crossover the rate of change is zero, so stored mass reaches a local maximum. Its value is not necessarily zero.'],
  },
  'continuity-20': {
    prompt: mt`A rigid tank of volume ${im(String.raw`0.500\,\mathrm{m^3}`, '0.500 m³')} initially contains gas at a uniform density of ${im(String.raw`1.20\,\mathrm{kg/m^3}`, '1.20 kg/m³')}. Gas enters at ${im(String.raw`0.0300\,\mathrm{kg/s}`, '0.0300 kg/s')} and leaves at ${im(String.raw`0.0100\,\mathrm{kg/s}`, '0.0100 kg/s')} for ${im(String.raw`40.0\,\mathrm{s}`, '40.0 s')}. Find the final mean gas density.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}\text{Initial mass} &= 1.20\times0.500 \\ &= 0.600\,\mathrm{kg}.\end{aligned}`, 'Initial mass = 1.20 × 0.500 = 0.600 kg.')} ${dm(String.raw`\begin{aligned}&\text{Net added mass} \\ &= (0.0300 - 0.0100)\times40.0 \\ &= 0.800\,\mathrm{kg}.\end{aligned}`, 'Net added mass = (0.0300 − 0.0100) × 40.0 = 0.800 kg.')}`,
      mt`${im(String.raw`\text{Final mass} = 1.400\,\mathrm{kg}`, 'Final mass = 1.400 kg')}, so the final mean density is ${dm(String.raw`\frac{1.400}{0.500} = 2.80\,\mathrm{kg/m^3}.`, '1.400/0.500 = 2.80 kg/m³.')}`,
    ],
  },
};
