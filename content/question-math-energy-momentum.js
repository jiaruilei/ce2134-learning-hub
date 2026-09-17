import {mathText as mt, inlineMath as im, displayMath as dm} from '../lib/math.js';

// Presentation-only overlays. Each fallback reproduces the original question
// verbatim, keeping scoring, saved answers, and plain-text exports independent.
export const energyMomentumMath = {
  'bernoulli-01': {
    prompt: mt`When may ${im(String.raw`\frac{p}{\rho g}+\frac{V^2}{2g}+z`, 'p/(ρg) + V²/(2g) + z')} be taken as constant between two points along one streamline?`,
  },
  'bernoulli-02': {
    given: mt`${im(String.raw`\rho = 1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}. Steady incompressible flow; neglect head loss; no pump or turbine; use uniform section velocities.`,
    solution: [
      mt`${dm(String.raw`p_2=p_1+\frac{\rho}{2}(V_1^2-V_2^2).`, 'p2 = p1 + ½ρ(V1² − V2²).')}`,
      mt`${dm(String.raw`\begin{aligned}&p_2=150{,}000\\&\quad+\frac12\times1000\times(2.00^2-6.00^2)\\&=134{,}000\,\mathrm{Pa}.\end{aligned}`, 'p2 = 150,000 + ½ × 1000 × (2.00² − 6.00²) = 134,000 Pa.')}`,
      mt`The downstream gauge pressure is ${im(String.raw`134.0\,\mathrm{kPa}`, '134.0 kPa')}.`,
    ],
  },
  'bernoulli-03': {
    given: mt`${im(String.raw`g = 9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Free surface and jet are at atmospheric pressure; free-surface speed is negligible. Assume quasi-steady flow and neglect losses.`,
    solution: [
      mt`The pressure terms cancel, and the elevation drop becomes velocity head: ${im(String.raw`h=\frac{V^2}{2g}`, 'h = V²/(2g)')}.`,
      mt`${dm(String.raw`\begin{aligned}V&=\sqrt{2\times9.80\times1.80}\\&=5.940\,\mathrm{m/s}.\end{aligned}`, 'V = √(2 × 9.80 × 1.80) = 5.940 m/s.')}`,
    ],
  },
  'bernoulli-04': {
    solution: [
      'Constant area and steady incompressible flow give equal mean speeds.',
      mt`With the velocity terms cancelling, ${im(String.raw`p_2-p_1=-\rho g(z_2-z_1)`, 'p2 − p1 = −ρg(z2 − z1)')}; pressure falls as elevation rises.`,
    ],
  },
  'bernoulli-05': {
    prompt: mt`At a pipe section where the mean speed is ${im(String.raw`4.00\,\mathrm{m/s}`, '4.00 m/s')}, find ${im(String.raw`\mathrm{EGL}-\mathrm{HGL}`, 'EGL − HGL')}.`,
    given: mt`${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}; use kinetic-energy correction factor ${im(String.raw`\alpha=1`, 'α = 1')}. EGL is total energy head and HGL is elevation plus pressure head.`,
    solution: [
      mt`${dm(String.raw`\mathrm{EGL}-\mathrm{HGL}=\frac{V^2}{2g}.`, 'EGL − HGL = V²/(2g).')}`,
      mt`The gap is ${im(String.raw`\frac{4.00^2}{2\times9.80}=0.8163\,\mathrm{m}`, '4.00²/(2 × 9.80) = 0.8163 m')}.`,
    ],
  },
  'bernoulli-06': {
    solution: [
      mt`The mechanical-energy balance is ${im(String.raw`H_{\mathrm{upstream}}=H_{\mathrm{downstream}}+h_{\mathrm L}`, 'Hupstream = Hdownstream + hL')}.`,
      mt`Since ${im(String.raw`h_{\mathrm L}>0`, 'hL > 0')}, ${im(String.raw`H_{\mathrm{downstream}}=H_{\mathrm{upstream}}-h_{\mathrm L}`, 'Hdownstream = Hupstream − hL')}. The energy grade line drops.`,
    ],
  },
  'bernoulli-07': {
    prompt: mt`What physical quantity does ${im(String.raw`\frac{p}{\rho g}`, 'p/(ρg)')} represent in Bernoulli’s equation?`,
    choices: [
      'Pressure energy per unit weight, expressed as a length',
      mt`Pressure energy per unit mass, expressed in ${im(String.raw`\mathrm{m^2/s^2}`, 'm²/s²')}`,
      'The volume flow rate through the pipe',
      'The vertical height of the pipe above the datum',
    ],
    solution: [
      mt`Pressure has units ${im(String.raw`\mathrm{N/m^2}`, 'N/m²')}, while ${im(String.raw`\rho g`, 'ρg')} has units ${im(String.raw`\mathrm{N/m^3}`, 'N/m³')}.`,
      'Their ratio has units of metres and represents pressure energy per unit weight.',
    ],
  },
  'bernoulli-08': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Use ${im(String.raw`\mathrm{HGL}=z+\frac{p}{\rho g}`, 'HGL = z + p/(ρg)')}, with gauge pressure.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&\text{Pressure head}\\&=\frac{29{,}400}{1000\times9.80}=3.00\,\mathrm m.\end{aligned}`, 'Pressure head = 29,400 / (1000 × 9.80) = 3.00 m.')}`,
      mt`${dm(String.raw`\begin{aligned}&\mathrm{HGL}=2.50+3.00\\&=5.50\,\mathrm m\text{ above the datum}.\end{aligned}`, 'HGL = 2.50 + 3.00 = 5.50 m above the datum.')}`,
    ],
  },
  'bernoulli-09': {
    given: mt`Use kinetic-energy correction factor ${im(String.raw`\alpha=1`, 'α = 1')} and ${im(String.raw`g>0`, 'g > 0')}.`,
    solution: [
      mt`${dm(String.raw`\mathrm{EGL}-\mathrm{HGL}=\frac{V^2}{2g}.`, 'EGL − HGL = V²/(2g).')}`,
      mt`For nonzero ${im('V')} and positive ${im('g')}, this difference is positive regardless of the pressure reference.`,
    ],
  },
  'bernoulli-10': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Both elevations use the same datum.`,
    solution: [
      mt`${dm(String.raw`\frac{p}{\rho g}=7.20-8.00=-0.80\,\mathrm m.`, 'p/(ρg) = 7.20 − 8.00 = −0.80 m.')}`,
      mt`${dm(String.raw`\begin{aligned}p&=\frac{1000\times9.80\times(-0.80)}{1000}\\&=-7.84\,\mathrm{kPa}\text{ gauge}.\end{aligned}`, 'p = 1000 × 9.80 × (−0.80) / 1000 = −7.84 kPa gauge.')}`,
    ],
  },
  'bernoulli-11': {
    given: mt`${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')} and kinetic-energy correction factor ${im(String.raw`\alpha=1`, 'α = 1')}. Both lines use the same pressure reference and elevation datum.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&\text{Velocity head}\\&=8.50-7.25=1.25\,\mathrm m.\end{aligned}`, 'Velocity head = 8.50 − 7.25 = 1.25 m.')}`,
      mt`${dm(String.raw`\begin{aligned}V&=\sqrt{2g\times1.25}\\&=\sqrt{2\times9.80\times1.25}\\&=4.950\,\mathrm{m/s}.\end{aligned}`, 'V = √(2g × 1.25) = √(2 × 9.80 × 1.25) = 4.950 m/s.')}`,
    ],
  },
  'bernoulli-12': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Flow is steady and incompressible with uniform section velocities. Neglect head loss and assume no pump or turbine.`,
    solution: [
      mt`Equal diameters give ${im('V_2=V_1', 'V₂ = V₁')}, so the velocity-head terms cancel.`,
      mt`${dm(String.raw`\begin{aligned}p_2&=p_1-\rho g(z_2-z_1)\\&=98{,}000\\&\quad-1000\times9.80\times3.00\\&=68{,}600\,\mathrm{Pa}.\end{aligned}`, 'p₂ = p₁ − ρg(z₂ − z₁) = 98,000 − 1000 × 9.80 × 3.00 = 68,600 Pa.')}`,
      mt`The downstream gauge pressure is ${im(String.raw`68.60\,\mathrm{kPa}`, '68.60 kPa')}.`,
    ],
  },
  'bernoulli-13': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}. Assume steady incompressible flow, full circular sections, uniform section velocities, no head loss and no pump or turbine.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}V_2&=V_1\left(\frac{D_1}{D_2}\right)^2\\&=6.00\left(\frac{0.0800}{0.160}\right)^2\\&=1.50\,\mathrm{m/s}.\end{aligned}`, 'V₂ = V₁(D₁/D₂)² = 6.00 × (0.0800/0.160)² = 1.50 m/s.')}`,
      mt`${dm(String.raw`\begin{aligned}p_2&=p_1+\frac{\rho}{2}(V_1^2-V_2^2)\\&=40{,}000\\&\quad+500\times(36.00-2.25)\\&=56{,}875\,\mathrm{Pa}.\end{aligned}`, 'p₂ = p₁ + ½ρ(V₁² − V₂²) = 40,000 + 500 × (36.00 − 2.25) = 56,875 Pa.')}`,
      mt`The downstream gauge pressure is ${im(String.raw`56.875\,\mathrm{kPa}`, '56.875 kPa')}.`,
    ],
  },
  'bernoulli-14': {
    prompt: mt`A new elevation datum makes every numerical elevation ${im('z')} larger by ${im(String.raw`2.00\,\mathrm m`, '2.00 m')}. Pressures and speeds are unchanged. What happens to the numerical HGL and EGL elevations?`,
    hint: mt`Both head definitions contain ${im('z')} once. Their difference contains no ${im('z')}.`,
    solution: [
      mt`${im(String.raw`\mathrm{HGL}=z+\frac{p}{\rho g}`, 'HGL = z + p/(ρg)')} and ${im(String.raw`\mathrm{EGL}=z+\frac{p}{\rho g}+\frac{V^2}{2g}`, 'EGL = z + p/(ρg) + V²/(2g)')}. Adding ${im(String.raw`2.00\,\mathrm m`, '2.00 m')} to ${im('z')} raises both numerical heads by ${im(String.raw`2.00\,\mathrm m`, '2.00 m')}.`,
      mt`The common shift cancels in ${im(String.raw`\mathrm{EGL}-\mathrm{HGL}`, 'EGL − HGL')}, so the velocity head is unchanged.`,
    ],
  },
  'bernoulli-15': {
    prompt: mt`At the inlet of an ideal water-pipe contraction, ${im(String.raw`z_1=1.50\,\mathrm m`, 'z₁ = 1.50 m')}, ${im(String.raw`p_1=78.40\,\mathrm{kPa}`, 'p₁ = 78.40 kPa')} gauge and ${im(String.raw`V_1=2.00\,\mathrm{m/s}`, 'V₁ = 2.00 m/s')}. The outlet speed is ${im(String.raw`4.00\,\mathrm{m/s}`, '4.00 m/s')}. Find the outlet HGL elevation.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Assume steady incompressible flow, uniform section velocities, no head loss and no pump or turbine. Use one elevation datum.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&\text{Inlet HGL}\\&=1.50+\frac{78{,}400}{1000\times9.80}\\&=9.50\,\mathrm m.\end{aligned}`, 'Inlet HGL = 1.50 + 78,400/(1000 × 9.80) = 9.50 m.')}`,
      mt`${dm(String.raw`\begin{aligned}&\text{Outlet HGL}\\&=9.50+\frac{2.00^2-4.00^2}{2\times9.80}\\&=8.888\,\mathrm m.\end{aligned}`, 'Outlet HGL = 9.50 + (2.00² − 4.00²)/(2 × 9.80) = 8.888 m.')}`,
    ],
  },
  'bernoulli-16': {
    prompt: mt`At a water-pipe section, ${im(String.raw`z=1.20\,\mathrm m`, 'z = 1.20 m')}, gauge pressure is ${im(String.raw`49.00\,\mathrm{kPa}`, '49.00 kPa')} and speed is ${im(String.raw`3.50\,\mathrm{m/s}`, '3.50 m/s')}. Find the EGL elevation above the datum.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}, ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')} and kinetic-energy correction factor ${im(String.raw`\alpha=1`, 'α = 1')}. Define both grade lines using gauge pressure.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}\text{Pressure head}&=\frac{49{,}000}{1000\times9.80}\\&=5.00\,\mathrm m.\end{aligned}`, 'Pressure head = 49,000/(1000 × 9.80) = 5.00 m.')} ${dm(String.raw`\begin{aligned}\text{Velocity head}&=\frac{3.50^2}{2\times9.80}\\&=0.625\,\mathrm m.\end{aligned}`, 'Velocity head = 3.50²/(2 × 9.80) = 0.625 m.')}`,
      mt`${dm(String.raw`\begin{aligned}\mathrm{EGL}&=1.20+5.00+0.625\\&=6.825\,\mathrm m.\end{aligned}`, 'EGL = 1.20 + 5.00 + 0.625 = 6.825 m.')}`,
    ],
  },
  'bernoulli-17': {
    solution: [
      mt`Continuity gives a lower speed in the larger section, so ${im(String.raw`\frac{V^2}{2g}`, 'V²/(2g)')} decreases.`,
      mt`EGL is constant in this ideal flow. Since ${im(String.raw`\mathrm{HGL}=\mathrm{EGL}-\frac{V^2}{2g}`, 'HGL = EGL − V²/(2g)')}, HGL rises and the gap narrows.`,
    ],
  },
  'bernoulli-18': {
    prompt: mt`Water accelerates from ${im(String.raw`2.00\,\mathrm{m/s}`, '2.00 m/s')} to ${im(String.raw`4.00\,\mathrm{m/s}`, '4.00 m/s')} while descending ${im(String.raw`2.00\,\mathrm m`, '2.00 m')} through a pipe. Find the pressure change ${im('p_2-p_1', 'p₂ − p₁')}, including its sign.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Assume steady incompressible flow, uniform section velocities, no head loss and no pump or turbine. Use one pressure reference at both sections.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}p_2-p_1&=\frac{\rho}{2}(V_1^2-V_2^2)\\&\quad+\rho g(z_1-z_2).\end{aligned}`, 'p₂ − p₁ = ½ρ(V₁² − V₂²) + ρg(z₁ − z₂).')}`,
      mt`The velocity contribution is ${im(String.raw`-6000\,\mathrm{Pa}`, '−6000 Pa')} and the elevation contribution is ${im(String.raw`+19{,}600\,\mathrm{Pa}`, '+19,600 Pa')}.`,
      mt`${dm(String.raw`\begin{aligned}p_2-p_1&=+13{,}600\,\mathrm{Pa}\\&=+13.60\,\mathrm{kPa},\end{aligned}`, 'p₂ − p₁ = +13,600 Pa = +13.60 kPa,')} so pressure increases despite the acceleration.`,
    ],
  },
  'bernoulli-19': {
    solution: [
      mt`${im(String.raw`\mathrm{HGL}-z<0`, 'HGL − z < 0')} means ${im(String.raw`\frac{p_{\mathrm{gauge}}}{\rho g}<0`, 'p_gauge/(ρg) < 0')}, so the gauge pressure is negative.`,
      'Absolute pressure equals gauge pressure plus local atmospheric pressure. Compare that absolute value with the water’s vapour pressure at its temperature to assess cavitation.',
    ],
  },
  'bernoulli-20': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Free-surface speed is negligible. Assume quasi-steady flow, no losses and no pump or turbine between the water surface and outlet.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&\text{Surface pressure head}\\&=\frac{39{,}200}{1000\times9.80}\\&=4.00\,\mathrm m.\end{aligned}`, 'Surface pressure head = 39,200/(1000 × 9.80) = 4.00 m.')} The jet has zero gauge pressure.`,
      mt`${dm(String.raw`\begin{aligned}&\text{Outlet velocity head}\\&=4.00+3.00=7.00\,\mathrm m.\end{aligned}`, 'Outlet velocity head = 4.00 + 3.00 = 7.00 m.')}`,
      mt`${dm(String.raw`\begin{aligned}V&=\sqrt{2\times9.80\times7.00}\\&=11.713\,\mathrm{m/s}.\end{aligned}`, 'V = √(2 × 9.80 × 7.00) = 11.713 m/s.')}`,
    ],
  },
  'momentum-01': {
    given: mt`The mass flow rate ${im(String.raw`\dot m`, 'ṁ')} is the same at inlet and outlet. Include pressure, wall, and body forces in the force sum.`,
    choices: [
      mt`${im(String.raw`\sum\vec F=\dot m(\vec V_{\mathrm{out}}-\vec V_{\mathrm{in}})`, 'ΣF = ṁ(Vout − Vin)')}`,
      mt`${im(String.raw`\sum\vec F=\dot m(\vec V_{\mathrm{out}}+\vec V_{\mathrm{in}})`, 'ΣF = ṁ(Vout + Vin)')} for every geometry`,
      mt`${im(String.raw`\sum\vec F=\rho g`, 'ΣF = ρg')} times the control-volume surface area`,
      mt`${im(String.raw`\sum\vec F=0`, 'ΣF = 0')} whenever the flow is steady`,
    ],
    solution: [
      'Net external force equals momentum outflow rate minus momentum inflow rate.',
      mt`Thus ${dm(String.raw`\begin{aligned}\sum\vec F&=\dot m\vec V_{\mathrm{out}}-\dot m\vec V_{\mathrm{in}}\\&=\dot m(\vec V_{\mathrm{out}}-\vec V_{\mathrm{in}}),\end{aligned}`, 'ΣF = ṁVout − ṁVin = ṁ(Vout − Vin),')} with vector velocities.`,
    ],
  },
  'momentum-02': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; jet area = ${im(String.raw`0.00200\,\mathrm{m^2}`, '0.00200 m²')}; speed = ${im(String.raw`10.0\,\mathrm{m/s}`, '10.0 m/s')}. The full jet is intercepted and leaves sideways with zero velocity component in the incoming direction. Free-jet boundaries are at atmospheric pressure; neglect gravity in this direction.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}Q&=AV=0.00200\times10.0\\&=0.0200\,\mathrm{m^3/s};\\\dot m&=\rho Q=20.0\,\mathrm{kg/s}.\end{aligned}`, 'Q = AV = 0.00200 × 10.0 = 0.0200 m³/s; ṁ = ρQ = 20.0 kg/s.')}`,
      mt`The plate force on the water is ${im(String.raw`\dot m(0-10.0)=-200\,\mathrm N`, 'ṁ(0 − 10.0) = −200 N')}.`,
      mt`The water exerts the opposite force on the plate: ${im(String.raw`+200\,\mathrm N`, '+200 N')} in the incoming jet direction.`,
    ],
  },
  'momentum-03': {
    prompt: mt`A stationary vane turns a water jet from ${im('+x')} into ${im('+y')} without changing its speed. Find the ${im('x')}-component of the force exerted by the vane on the water; include its sign.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`Q=0.0100\,\mathrm{m^3/s}`, 'Q = 0.0100 m³/s')}; inlet and outlet speeds = ${im(String.raw`8.00\,\mathrm{m/s}`, '8.00 m/s')}. Both free-jet sections are at atmospheric pressure; neglect gravity and other external forces.`,
    hint: mt`The outlet has zero ${im('x')}-velocity. This question asks for the force on the water.`,
    solution: [
      mt`${dm(String.raw`\dot m=1000\times0.0100=10.0\,\mathrm{kg/s}.`, 'ṁ = 1000 × 0.0100 = 10.0 kg/s.')}`,
      mt`${dm(String.raw`\begin{aligned}F_{x,\mathrm{on\ water}}&=\dot m(V_{\mathrm{out},x}-V_{\mathrm{in},x})\\&=10.0\times(0-8.00)\\&=-80.0\,\mathrm N.\end{aligned}`, 'Fx,on water = ṁ(Vout,x − Vin,x) = 10.0 × (0 − 8.00) = −80.0 N.')}`,
    ],
  },
  'momentum-04': {
    prompt: mt`A stationary vane turns a free jet from ${im('+x')} into ${im('+y')} at unchanged speed. In which directions are the force components exerted by the water on the vane?`,
    choices: [mt`${im('-x', '−x')} and ${im('+y')}`, mt`${im('+x')} and ${im('+y')}`, mt`${im('-x', '−x')} and ${im('-y', '−y')}`, mt`${im('+x')} and ${im('-y', '−y')}`],
    solution: [
      mt`The fluid loses ${im('+x')} momentum and gains ${im('+y')} momentum, so the vane’s force on it points ${im('-x', '−x')} and ${im('+y')}.`,
      mt`By Newton’s third law, the water’s force on the vane points ${im('+x')} and ${im('-y', '−y')}.`,
    ],
  },
  'momentum-05': {
    prompt: mt`A stationary smooth vane reverses a water jet from ${im('+x')} to ${im('-x', '−x')} at unchanged speed. Find the magnitude of the force exerted by the water on the vane.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`Q=0.0200\,\mathrm{m^3/s}`, 'Q = 0.0200 m³/s')}; speed = ${im(String.raw`5.00\,\mathrm{m/s}`, '5.00 m/s')}. The full jet is reversed; both free-jet sections are at atmospheric pressure; neglect gravity and other forces.`,
    solution: [
      mt`${dm(String.raw`\dot m=1000\times0.0200=20.0\,\mathrm{kg/s}.`, 'ṁ = 1000 × 0.0200 = 20.0 kg/s.')}`,
      mt`${dm(String.raw`\begin{aligned}&\text{Force on water}\\&=20.0\times(-5.00-5.00)\\&=-200\,\mathrm N.\end{aligned}`, 'Force on water = 20.0 × (−5.00 − 5.00) = −200 N.')}`,
      mt`The force on the vane is ${im(String.raw`+200\,\mathrm N`, '+200 N')}, so its magnitude is ${im(String.raw`200\,\mathrm N`, '200 N')}.`,
    ],
  },
  'momentum-06': {
    prompt: mt`Water enters a stationary control volume through its left face and flows in ${im('+x')}. If the inlet gauge pressure is positive, in which direction does the inlet pressure force act on the fluid inside the control volume?`,
    choices: [mt`In ${im('-x', '−x')}, because this is an inlet`, mt`In ${im('+x')}, into the control volume`, 'It is zero whenever the flow is steady', 'It acts tangentially to the inlet face'],
    solution: [
      mt`The outward unit normal of the left inlet face is ${im('-x', '−x')}.`,
      mt`Pressure force is ${im(String.raw`-pA\vec n`, '−pAn')}, so positive inlet gauge pressure produces a ${im('+x')} contribution.`,
    ],
  },
  'momentum-07': {
    prompt: mt`A uniform jet has density ${im(String.raw`\rho`, 'ρ')}, area ${im('A')} and speed ${im('V')}. Which quantity is its mass flow rate?`,
    choices: [mt`${im(String.raw`\rho AV^2`, 'ρAV²')}`, mt`${im('AV')}`, mt`${im(String.raw`\rho AV`, 'ρAV')}`, mt`${im(String.raw`\frac{\rho A}{V}`, 'ρA/V')}`],
    hint: mt`Mass flow rate must have units of ${im(String.raw`\mathrm{kg/s}`, 'kg/s')}, not force or volume per second.`,
    solution: [
      mt`Volume flow rate is ${im('Q=AV', 'Q = AV')}.`,
      mt`Multiplying ${im('Q')} by density gives mass flow rate ${im(String.raw`\dot m=\rho AV`, 'ṁ = ρAV')}, with units ${im(String.raw`\mathrm{kg/s}`, 'kg/s')}.`,
    ],
  },
  'momentum-08': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}. Use the full circular jet cross section.`,
    hint: mt`Use ${im(String.raw`A=\frac{\pi D^2}{4}`, 'A = πD²/4')}, then multiply area by speed and density.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}A&=\frac{\pi\times0.0200^2}{4}\\&=0.000314159\,\mathrm{m^2}.\end{aligned}`, 'A = π × 0.0200²/4 = 0.000314159 m².')}`,
      mt`${dm(String.raw`\begin{aligned}&\dot m=1000\times0.000314159\\&\qquad\times6.00\\&=1.885\,\mathrm{kg/s}.\end{aligned}`, 'ṁ = 1000 × 0.000314159 × 6.00 = 1.885 kg/s.')}`,
    ],
  },
  'momentum-09': {
    choices: [
      'Zero because the inlet and outlet momentum fluxes are identical',
      mt`${im(String.raw`\rho AV^2`, 'ρAV²')} in the incoming direction for every jet`,
      'Twice the incoming momentum flux',
      'Nonzero because a flowing jet always pushes any guide',
    ],
    solution: [
      mt`The outlet velocity vector equals the inlet velocity vector, so ${im(String.raw`\dot m(\vec V_{\mathrm{out}}-\vec V_{\mathrm{in}})=0`, 'ṁ(V_out − V_in) = 0')}.`,
      'The guide therefore exerts zero net force on the fluid under the stated assumptions, and the net reaction on the guide is also zero.',
    ],
  },
  'momentum-10': {
    prompt: mt`A jet enters horizontally in ${im('+x')} and leaves a vane at speed ${im(String.raw`10.0\,\mathrm{m/s}`, '10.0 m/s')}, directed ${im(String.raw`30.0^\circ`, '30.0°')} downward from ${im('+x')}. Find the outlet ${im('y')}-velocity, including its sign.`,
    given: mt`Take ${im('+y')} upward. The stated angle is measured from the incoming ${im('+x')} direction, not from the vertical.`,
    hint: mt`The ${im('y')}-component uses the sine of the angle and is negative for a downward velocity.`,
    solution: [
      mt`${im(String.raw`V_{\mathrm{out},y}=-V\sin\theta`, 'V_out,y = −V sin θ')} because ${im('+y')} is upward.`,
      mt`${dm(String.raw`\begin{aligned}V_{\mathrm{out},y}&=-10.0\sin30.0^\circ\\&=-5.00\,\mathrm{m/s}.\end{aligned}`, 'V_out,y = −10.0 sin 30.0° = −5.00 m/s.')}`,
    ],
  },
  'momentum-11': {
    prompt: mt`A stationary vane turns a water jet from ${im('+x')} to ${im(String.raw`60.0^\circ`, '60.0°')} downward from ${im('+x')}. Find the ${im('x')}-component of the water’s force on the vane, with ${im('+x')} rightward.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}, ${im(String.raw`Q=0.0120\,\mathrm{m^3/s}`, 'Q = 0.0120 m³/s')} and inlet and outlet speeds ${im(String.raw`V=5.00\,\mathrm{m/s}`, 'V = 5.00 m/s')}. The full jet is turned. Both sections are at atmospheric pressure. Neglect gravity and other forces on the fluid.`,
    hint: mt`The fluid leaves with ${im('x')}-velocity ${im(String.raw`V\cos\theta`, 'V cos θ')}. Reverse the fluid force to obtain the vane reaction.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&\dot m=1000\times0.0120\\&=12.0\,\mathrm{kg/s}\\&\text{and }V_{\mathrm{out},x}=5.00\cos60.0^\circ\\&=2.50\,\mathrm{m/s}.\end{aligned}`, 'ṁ = 1000 × 0.0120 = 12.0 kg/s and V_out,x = 5.00 cos 60.0° = 2.50 m/s.')}`,
      mt`The force on the fluid is ${dm(String.raw`12.0\times(2.50-5.00)=-30.0\,\mathrm N.`, '12.0 × (2.50 − 5.00) = −30.0 N.')}`,
      mt`The force on the vane is ${im(String.raw`+30.0\,\mathrm N`, '+30.0 N')} in ${im('x')}.`,
    ],
    takeaway: mt`Only the change in the ${im('x')}-component of velocity enters the horizontal momentum balance.`,
  },
  'momentum-12': {
    prompt: mt`A stationary vane turns a water jet from ${im('+x')} to ${im(String.raw`30.0^\circ`, '30.0°')} downward from ${im('+x')}. Find the ${im('y')}-component of the water’s force on the vane, taking ${im('+y')} upward.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}, ${im(String.raw`Q=0.00800\,\mathrm{m^3/s}`, 'Q = 0.00800 m³/s')} and inlet and outlet speeds ${im(String.raw`V=10.0\,\mathrm{m/s}`, 'V = 10.0 m/s')}. The full jet is turned. Both sections are at atmospheric pressure. Neglect gravity and other forces on the fluid.`,
    hint: mt`The incoming ${im('y')}-velocity is zero. The vane pushes the jet downward, and the water pushes the vane upward.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&\dot m=1000\times0.00800\\&=8.00\,\mathrm{kg/s}\\&\text{and }V_{\mathrm{out},y}=-10.0\sin30.0^\circ\\&=-5.00\,\mathrm{m/s}.\end{aligned}`, 'ṁ = 1000 × 0.00800 = 8.00 kg/s and V_out,y = −10.0 sin 30.0° = −5.00 m/s.')}`,
      mt`${dm(String.raw`\begin{gathered}\text{Force on the fluid in }y\\=8.00\times(-5.00-0)\\=-40.0\,\mathrm N.\end{gathered}`, 'Force on the fluid in y = 8.00 × (−5.00 − 0) = −40.0 N.')}`,
      mt`The opposite force on the vane is ${im(String.raw`+40.0\,\mathrm N`, '+40.0 N')} in ${im('y')}.`,
    ],
  },
  'momentum-13': {
    prompt: mt`A stationary vane turns a water jet from ${im('+x')} vertically downward at unchanged speed. Find the magnitude of the water’s resultant force on the vane.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}, ${im(String.raw`Q=0.00400\,\mathrm{m^3/s}`, 'Q = 0.00400 m³/s')} and ${im(String.raw`V=12.0\,\mathrm{m/s}`, 'V = 12.0 m/s')}. The full jet is turned. Both sections are at atmospheric pressure. Neglect gravity and other forces on the fluid.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}\dot m&=1000\times0.00400\\&=4.00\,\mathrm{kg/s}.\end{aligned}`, 'ṁ = 1000 × 0.00400 = 4.00 kg/s.')} The force on the vane has components ${im(String.raw`F_x=+48.0\,\mathrm N`, 'Fₓ = +48.0 N')} and ${im(String.raw`F_y=+48.0\,\mathrm N`, 'Fᵧ = +48.0 N')}.`,
      mt`${dm(String.raw`F=\sqrt{48.0^2+48.0^2}=67.88\,\mathrm N.`, 'F = √(48.0² + 48.0²) = 67.88 N.')}`,
    ],
  },
  'momentum-14': {
    prompt: mt`A stationary vane turns a water jet from ${im('+x')} to ${im(String.raw`120.0^\circ`, '120.0°')} downward from ${im('+x')} at unchanged speed. Find the ${im('x')}-component of the vane’s force on the water, including its sign.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}, circular jet diameter ${im(String.raw`D=0.0300\,\mathrm m`, 'D = 0.0300 m')} and ${im(String.raw`V=8.00\,\mathrm{m/s}`, 'V = 8.00 m/s')}. The full jet is turned. Both sections are at atmospheric pressure. Neglect gravity and other forces on the water.`,
    hint: mt`At ${im(String.raw`120^\circ`, '120°')}, the outlet ${im('x')}-velocity is negative. This question asks for force on the water.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}&A=\frac{\pi\times0.0300^2}{4}\\&=0.000706858\,\mathrm{m^2}\\&\text{and }\dot m=1000AV\\&=5.65487\,\mathrm{kg/s}.\end{aligned}`, 'A = π × 0.0300²/4 = 0.000706858 m² and ṁ = 1000AV = 5.65487 kg/s.')}`,
      mt`${dm(String.raw`\begin{aligned}V_{\mathrm{out},x}&=8.00\cos120.0^\circ\\&=-4.00\,\mathrm{m/s}.\end{aligned}`, 'V_out,x = 8.00 cos 120.0° = −4.00 m/s.')}`,
      mt`${dm(String.raw`\begin{aligned}&F_{x,\mathrm{on\ water}}\\&=5.65487\times(-4.00-8.00)\\&=-67.86\,\mathrm N.\end{aligned}`, 'Fₓ,on water = 5.65487 × (−4.00 − 8.00) = −67.86 N.')}`,
    ],
    takeaway: mt`Turning a jet past ${im(String.raw`90^\circ`, '90°')} reverses its outlet ${im('x')}-component and increases the required horizontal momentum change.`,
  },
  'momentum-15': {
    solution: [
      mt`Area scales with ${im('D^2', 'D²')}, so doubling the diameter makes the area four times larger.`,
      mt`Both force components and their resultant scale with ${im(String.raw`\rho AV^2`, 'ρAV²')} at the fixed angle, so the force becomes four times as large.`,
    ],
  },
  'momentum-16': {
    solution: [
      mt`At fixed area, density and angle, ${im('F')} is proportional to ${im('V^2', 'V²')}.`,
      mt`${dm(String.raw`F_{\mathrm{new}}=27.0\left(\frac{5.00}{3.00}\right)^2=75.0\,\mathrm N.`, 'F_new = 27.0 × (5.00/3.00)² = 75.0 N.')}`,
    ],
  },
  'momentum-17': {
    prompt: mt`A water jet enters a stationary vane in ${im('+x')} at ${im(String.raw`6.00\,\mathrm{m/s}`, '6.00 m/s')} and leaves at the same speed, ${im(String.raw`60.0^\circ`, '60.0°')} downward from ${im('+x')}. The water exerts ${im(String.raw`+120\,\mathrm N`, '+120 N')} on the vane in ${im('x')}. Find the volume flow rate.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}. The full jet is turned. Both sections are at atmospheric pressure. Neglect gravity and other forces on the fluid.`,
    hint: mt`Rearrange ${im(String.raw`F_{x,\mathrm{on\ vane}}=\rho QV(1-\cos\theta)`, 'Fₓ,on vane = ρQV(1 − cos θ)')} for ${im('Q')}.`,
    solution: [
      mt`The reduction in ${im('x')}-velocity is ${dm(String.raw`6.00(1-\cos60.0^\circ)=3.00\,\mathrm{m/s}.`, '6.00(1 − cos 60.0°) = 3.00 m/s.')}`,
      mt`${dm(String.raw`\begin{aligned}Q&=\frac{120}{1000\times3.00}\\&=0.0400\,\mathrm{m^3/s}.\end{aligned}`, 'Q = 120/(1000 × 3.00) = 0.0400 m³/s.')}`,
    ],
  },
  'momentum-18': {
    prompt: mt`At fixed jet area and speed, the downward deflection angle increases from ${im(String.raw`0^\circ`, '0°')} to ${im(String.raw`180^\circ`, '180°')}. Which statement describes the water’s force on the stationary vane?`,
    given: mt`The inlet points in ${im('+x')} and ${im('+y')} is upward. The full jet follows the prescribed turn at unchanged speed. Both sections are at atmospheric pressure. Neglect gravity and other forces.`,
    choices: [
      mt`Both horizontal and upward components are largest at ${im(String.raw`180^\circ`, '180°')}`,
      mt`The horizontal component increases throughout, while the upward component peaks at ${im(String.raw`90^\circ`, '90°')} and returns to zero at ${im(String.raw`180^\circ`, '180°')}`,
      mt`The horizontal component returns to zero at ${im(String.raw`180^\circ`, '180°')}`,
      mt`The upward component becomes negative beyond ${im(String.raw`90^\circ`, '90°')}`,
    ],
    hint: mt`Compare ${im(String.raw`1-\cos\theta`, '1 − cos θ')} with ${im(String.raw`\sin\theta`, 'sin θ')} between ${im(String.raw`0^\circ`, '0°')} and ${im(String.raw`180^\circ`, '180°')}.`,
    solution: [
      mt`${im(String.raw`F_x=\rho AV^2(1-\cos\theta)`, 'Fₓ = ρAV²(1 − cos θ)')} grows from zero to ${im(String.raw`2\rho AV^2`, '2ρAV²')} over this angle range.`,
      mt`${im(String.raw`F_y=\rho AV^2\sin\theta`, 'Fᵧ = ρAV² sin θ')} starts at zero, reaches its maximum at ${im(String.raw`90^\circ`, '90°')} and returns to zero at ${im(String.raw`180^\circ`, '180°')}.`,
    ],
  },
  'momentum-19': {
    prompt: mt`A water jet enters a stationary vane in ${im('+x')} and leaves at ${im(String.raw`120.0^\circ`, '120.0°')} downward from ${im('+x')} at unchanged speed. Find the angle of the water’s resultant force on the vane, measured upward from ${im('+x')}.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}, ${im(String.raw`Q=0.00600\,\mathrm{m^3/s}`, 'Q = 0.00600 m³/s')} and ${im(String.raw`V=10.0\,\mathrm{m/s}`, 'V = 10.0 m/s')}. The full jet is turned. Both sections are at atmospheric pressure. Neglect gravity and other forces. Take ${im('+y')} upward.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}\dot mV&=1000\times0.00600\times10.0\\&=60.0\,\mathrm N.\end{aligned}`, 'ṁV = 1000 × 0.00600 × 10.0 = 60.0 N.')} The vane force components are ${dm(String.raw`\begin{aligned}F_x&=60.0(1-\cos120.0^\circ)\\&=90.0\,\mathrm N\\\text{and}\quad F_y&=60.0\sin120.0^\circ\\&=51.96\,\mathrm N.\end{aligned}`, 'Fₓ = 60.0(1 − cos 120.0°) = 90.0 N and Fᵧ = 60.0 sin 120.0° = 51.96 N.')}`,
      mt`Both components are positive, so the force is in the first quadrant. Its angle is ${im(String.raw`\arctan\left(\frac{51.96}{90.0}\right)=30.0^\circ`, 'arctan(51.96/90.0) = 30.0°')} above ${im('+x')}.`,
    ],
  },
  'momentum-20': {},
  'mixed-01': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}; water at rest on one side and atmospheric pressure on the other.`,
    solution: [
      mt`Top and bottom gauge pressures are ${im(String.raw`9.80\,\mathrm{kPa}`, '9.80 kPa')} and ${im(String.raw`29.40\,\mathrm{kPa}`, '29.40 kPa')}.`,
      mt`The linear distribution has average pressure ${im(String.raw`\frac{9.80+29.40}{2}=19.60\,\mathrm{kPa}`, '(9.80 + 29.40)/2 = 19.60 kPa')}.`,
      mt`${dm(String.raw`\begin{aligned}&\text{Gate area}\\&=1.00\times(3.00-1.00)\\&=2.00\,\mathrm{m^2};\\&F=19.60\times2.00\\&=39.20\,\mathrm{kN}.\end{aligned}`, 'Gate area = 1.00 × (3.00 − 1.00) = 2.00 m²; F = 19.60 × 2.00 = 39.20 kN.')}`,
    ],
  },
  'mixed-02': {
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; steady incompressible flow with uniform section velocities; no leakage, head loss, pump, or turbine.`,
    solution: [
      mt`${dm(String.raw`\begin{aligned}V_2&=1.00\left(\frac{0.100}{0.050}\right)^2\\&=4.00\,\mathrm{m/s}.\end{aligned}`, 'V2 = 1.00 × (0.100/0.050)² = 4.00 m/s.')}`,
      mt`${dm(String.raw`\begin{aligned}&p_2=100{,}000\\&\quad+\frac12\times1000\times(1.00^2-4.00^2)\\&=92{,}500\,\mathrm{Pa}.\end{aligned}`, 'p2 = 100,000 + ½ × 1000 × (1.00² − 4.00²) = 92,500 Pa.')}`,
      mt`The downstream gauge pressure is ${im(String.raw`92.50\,\mathrm{kPa}`, '92.50 kPa')}.`,
    ],
  },
  'mixed-03': {
    given: mt`Free surface is ${im(String.raw`5.00\,\mathrm m`, '5.00 m')} above the outlet; jet area at the plate = ${im(String.raw`0.00100\,\mathrm{m^2}`, '0.00100 m²')}; ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Assume quasi-steady lossless discharge, negligible free-surface speed, and atmospheric pressure at the free surface and jet. The full jet is intercepted and leaves sideways with zero incoming-direction velocity component.`,
    hint: mt`Use tank head to obtain ${im('V^2', 'V²')}, then combine ${im('Q=AV', 'Q = AV')} with the plate momentum balance.`,
    solution: [
      mt`Bernoulli gives ${dm(String.raw`\begin{aligned}V^2&=2gh=2\times9.80\times5.00\\&=98.0\,\mathrm{m^2/s^2}.\end{aligned}`, 'V² = 2gh = 2 × 9.80 × 5.00 = 98.0 m²/s².')}`,
      mt`For full normal interception, force on the plate is ${im(String.raw`\rho QV=\rho AV^2`, 'ρQV = ρAV²')}.`,
      mt`${dm(String.raw`\begin{aligned}F&=1000\times0.00100\times98.0\\&=98.0\,\mathrm N\end{aligned}`, 'F = 1000 × 0.00100 × 98.0 = 98.0 N')} in the incoming jet direction.`,
    ],
  },
  'mixed-04': {
    solution: [
      mt`The normal velocity is zero on the stream surface, so ${im(String.raw`\rho\vec V\cdot\vec n`, 'ρV·n')} gives zero mass flux there.`,
      'Zero mass flux does not remove the pressure term from a momentum balance.',
    ],
  },
  'mixed-05': {},
  'mixed-06': {},
};
