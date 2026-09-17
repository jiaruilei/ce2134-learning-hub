import {mathText as mt, inlineMath as im, displayMath as dm} from '../lib/math.js';

// Presentation only. Every fallback retains the exact authored question text.
export const hydrostaticsMath = {
  'pressure-01': {
    choices: [mt`${im(String.raw`0\,\mathrm{kPa}`, '0 kPa')}`, mt`${im(String.raw`101.3\,\mathrm{kPa}`, '101.3 kPa')} for every location`, mt`${im(String.raw`9.80\,\mathrm{kPa}`, '9.80 kPa')}`, 'It depends on the liquid density'],
    solution: ['Gauge pressure is absolute pressure minus local atmospheric pressure.', mt`At the open surface these pressures are equal, so the gauge pressure is ${im(String.raw`0\,\mathrm{kPa}`, '0 kPa')}.`],
  },
  'pressure-02': {
    prompt: mt`Find the gauge pressure ${im(String.raw`2.50\,\mathrm{m}`, '2.50 m')} below the free surface of still water in an open tank.`,
    given: mt`Water density ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    hint: mt`Use the vertical water depth in ${im(String.raw`p=\rho gh`, 'p = ρgh')}, then convert ${im(String.raw`\mathrm{Pa}`, 'Pa')} to ${im(String.raw`\mathrm{kPa}`, 'kPa')}.`,
    solution: [mt`${dm(String.raw`\begin{aligned}p&=1000\times9.80\times2.50\\&=24{,}500\,\mathrm{Pa}.\end{aligned}`, 'p = 1000 × 9.80 × 2.50 = 24,500 Pa.')}`, mt`Divide by ${im('1000')}: ${im(String.raw`p=24.50\,\mathrm{kPa}`, 'p = 24.50 kPa')} gauge.`],
  },
  'pressure-03': {
    prompt: mt`Find the absolute pressure ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} below the free surface of an open water tank.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}; local atmospheric pressure = ${im(String.raw`101.3\,\mathrm{kPa}`, '101.3 kPa')}.`,
    solution: [mt`Gauge pressure = ${dm(String.raw`\begin{aligned}&\frac{1000\times9.80\times2.00}{1000}\\&=19.60\,\mathrm{kPa}.\end{aligned}`, '1000 × 9.80 × 2.00 / 1000 = 19.60 kPa.')}`, mt`Absolute pressure = ${dm(String.raw`\begin{aligned}&101.3+19.60\\&=120.90\,\mathrm{kPa}.\end{aligned}`, '101.3 + 19.60 = 120.90 kPa.')}`],
  },
  'pressure-04': {
    solution: [mt`The hydrostatic relation is ${im(String.raw`\frac{\mathrm{d}p}{\mathrm{d}z}=-\rho g`, 'dp/dz = −ρg')}.`, 'For equal elevations in the connected liquid, the pressure difference is zero. Container shape does not alter this result.'],
  },
  'pressure-05': {
    prompt: mt`An open tank contains ${im(String.raw`0.50\,\mathrm{m}`, '0.50 m')} of oil above ${im(String.raw`1.20\,\mathrm{m}`, '1.20 m')} of water. Find the gauge pressure at the tank bottom.`,
    given: mt`Oil density = ${im(String.raw`800\,\mathrm{kg/m^3}`, '800 kg/m³')}; water density = ${im(String.raw`1000\,\mathrm{kg/m^3}`, '1000 kg/m³')}; ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Both layers are at rest.`,
    hint: mt`Add each layer’s ${im(String.raw`\rho gh`, 'ρgh')} contribution; use each density only with its own depth.`,
    solution: [mt`Oil contribution = ${dm(String.raw`\begin{aligned}&800\times9.80\times0.50\\&=3920\,\mathrm{Pa}.\end{aligned}`, '800 × 9.80 × 0.50 = 3920 Pa.')}`, mt`Water contribution = ${dm(String.raw`\begin{aligned}&1000\times9.80\times1.20\\&=11{,}760\,\mathrm{Pa}.\end{aligned}`, '1000 × 9.80 × 1.20 = 11,760 Pa.')}`, mt`Bottom gauge pressure = ${dm(String.raw`\begin{aligned}&\frac{3920+11{,}760}{1000}\\&=15.68\,\mathrm{kPa}.\end{aligned}`, '(3920 + 11,760) / 1000 = 15.68 kPa.')}`],
  },
  'pressure-06': {
    hint: mt`Distinguish the pressure itself from the pressure gradient ${im(String.raw`\rho g`, 'ρg')}.`,
    solution: ['Pressure is continuous across the interface under the stated assumptions.', mt`The downward pressure gradient is ${im(String.raw`\frac{\mathrm{d}p}{\mathrm{d}h}=\rho g`, 'dp/dh = ρg')}, so entering the denser water increases the slope.`],
  },
  'pressure-07': {
    solution: [mt`With upward elevation ${im('z')}, the hydrostatic relation is ${im(String.raw`\frac{\mathrm{d}p}{\mathrm{d}z}=-\rho g`, 'dp/dz = −ρg')}.`, mt`An upward displacement therefore produces a pressure decrease of ${im(String.raw`\rho g`, 'ρg')} times the vertical rise.`],
  },
  'pressure-08': {
    prompt: mt`A sensor reads ${im(String.raw`34.30\,\mathrm{kPa}`, '34.30 kPa')} gauge in an open freshwater tank. How far below the free surface is the sensor?`,
    given: mt`Water is at rest. ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    hint: mt`Rearrange ${im(String.raw`p=\rho gh`, 'p = ρgh')} to find ${im('h')}, after converting ${im(String.raw`\mathrm{kPa}`, 'kPa')} to ${im(String.raw`\mathrm{Pa}`, 'Pa')}.`,
    solution: [mt`The open surface is at zero gauge pressure, so ${im(String.raw`\rho gh=34{,}300\,\mathrm{Pa}`, 'ρgh = 34,300 Pa')}.`, mt`${dm(String.raw`\begin{aligned}h&=\frac{34{,}300}{1000\times9.80}\\&=3.500\,\mathrm{m}.\end{aligned}`, 'h = 34,300 / (1000 × 9.80) = 3.500 m.')}`],
  },
  'pressure-09': {},
  'pressure-10': {
    hint: mt`Identify which factor in ${im(String.raw`\rho gh`, 'ρgh')} differs between the two tanks.`,
    solution: [mt`Both sensors have the same depth ${im('h')} and gravitational acceleration ${im('g')}.`, mt`Their gauge pressures are ${im(String.raw`\rho gh`, 'ρgh')}, so the larger density gives the larger pressure.`],
  },
  'pressure-11': {
    prompt: mt`Air above the water in a sealed tank is at ${im(String.raw`25.0\,\mathrm{kPa}`, '25.0 kPa')} gauge. Find the gauge pressure at a point ${im(String.raw`1.50\,\mathrm{m}`, '1.50 m')} below the water surface.`,
    given: mt`The water is at rest with ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}. Use ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')} and neglect pressure variation within the air.`,
    solution: [mt`The water adds ${dm(String.raw`\begin{aligned}\rho gh&=1000\times9.80\times1.50\\&=14{,}700\,\mathrm{Pa}\\&=14.70\,\mathrm{kPa}.\end{aligned}`, 'ρgh = 1000 × 9.80 × 1.50 = 14,700 Pa = 14.70 kPa.')}`, mt`The required gauge pressure is ${dm(String.raw`25.0+14.70=39.70\,\mathrm{kPa}.`, '25.0 + 14.70 = 39.70 kPa.')}`],
  },
  'pressure-12': {
    prompt: mt`Point A in stationary water has an absolute pressure of ${im(String.raw`120.0\,\mathrm{kPa}`, '120.0 kPa')}. Point B is ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} vertically above A in the same connected water. Find the absolute pressure at B.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. The water remains a continuous liquid between A and B.`,
    solution: [mt`The pressure decrease from A to B is ${dm(String.raw`\begin{aligned}&\frac{1000\times9.80\times2.00}{1000}\\&=19.60\,\mathrm{kPa}.\end{aligned}`, '1000 × 9.80 × 2.00 / 1000 = 19.60 kPa.')}`, mt`The absolute pressure at B is ${dm(String.raw`120.0-19.60=100.40\,\mathrm{kPa}.`, '120.0 − 19.60 = 100.40 kPa.')}`],
  },
  'pressure-13': {
    prompt: mt`Two sensors in a homogeneous liquid at rest are separated vertically by ${im(String.raw`0.750\,\mathrm{m}`, '0.750 m')}. The lower sensor reads ${im(String.raw`6.174\,\mathrm{kPa}`, '6.174 kPa')} more than the upper sensor. Find the liquid density.`,
    given: mt`Use ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. The readings use the same pressure reference.`,
    solution: [mt`The hydrostatic difference is ${im(String.raw`\Delta p=\rho g\Delta h`, 'Δp = ρgΔh')}, with ${im(String.raw`\Delta p=6174\,\mathrm{Pa}`, 'Δp = 6174 Pa')}.`, mt`${dm(String.raw`\begin{aligned}\rho&=\frac{6174}{9.80\times0.750}\\&=840.0\,\mathrm{kg/m^3}.\end{aligned}`, 'ρ = 6174 / (9.80 × 0.750) = 840.0 kg/m³.')}`],
  },
  'pressure-14': {
    hint: mt`Integrate ${im(String.raw`\mathrm{d}p=-\rho g\,\mathrm{d}z`, 'dp = −ρg dz')} along the tube and consider which geometric quantity remains.`,
    solution: [mt`For constant density, the pressure difference is ${im(String.raw`-\rho g`, '−ρg')} times the net change in elevation.`, 'Extra horizontal travel and bends do not alter that net elevation change.'],
  },
  'pressure-15': {
    prompt: mt`An open oil column must produce the same bottom gauge pressure as an open water column ${im(String.raw`1.20\,\mathrm{m}`, '1.20 m')} high. Find the required oil-column height.`,
    given: mt`Oil density is ${im(String.raw`800\,\mathrm{kg/m^3}`, '800 kg/m³')} and water density is ${im(String.raw`1000\,\mathrm{kg/m^3}`, '1000 kg/m³')}. Both columns are at rest with ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    hint: mt`Equate the two ${im(String.raw`\rho gh`, 'ρgh')} values. The columns need not have equal heights.`,
    solution: [mt`Equal bottom gauge pressures require ${dm(String.raw`800\times g\times h=1000\times g\times1.20.`, '800 × g × h = 1000 × g × 1.20.')}`, mt`Gravity cancels, giving ${dm(String.raw`\begin{aligned}h&=\frac{1000}{800}\times1.20\\&=1.500\,\mathrm{m}.\end{aligned}`, 'h = (1000 / 800) × 1.20 = 1.500 m.')}`],
  },
  'pressure-16': {
    prompt: mt`An open tank contains ${im(String.raw`0.400\,\mathrm{m}`, '0.400 m')} of oil above a water layer of unknown depth. The bottom gauge pressure is ${im(String.raw`13.72\,\mathrm{kPa}`, '13.72 kPa')}. Find the water-layer depth.`,
    given: mt`Oil density is ${im(String.raw`750\,\mathrm{kg/m^3}`, '750 kg/m³')} and water density is ${im(String.raw`1000\,\mathrm{kg/m^3}`, '1000 kg/m³')}. Both layers are at rest. Use ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    solution: [mt`The oil contributes ${dm(String.raw`\begin{aligned}&750\times9.80\times0.400\\&=2940\,\mathrm{Pa}.\end{aligned}`, '750 × 9.80 × 0.400 = 2940 Pa.')}`, mt`The water contributes ${dm(String.raw`13{,}720-2940=10{,}780\,\mathrm{Pa}.`, '13,720 − 2940 = 10,780 Pa.')}`, mt`The water depth is ${dm(String.raw`\begin{aligned}&\frac{10{,}780}{1000\times9.80}\\&=1.100\,\mathrm{m}.\end{aligned}`, '10,780 / (1000 × 9.80) = 1.100 m.')}`],
  },
  'pressure-17': {
    solution: [mt`For downward depth ${im('h')}, the hydrostatic slope is ${im(String.raw`\frac{\mathrm{d}p}{\mathrm{d}h}=\rho g`, 'dp/dh = ρg')}.`, mt`With the same ${im('g')}, a slope ratio of two means a density ratio of two. The surface pressures need not be related.`],
  },
  'pressure-18': {
    prompt: mt`Two water tanks are not connected. A point in tank A is ${im(String.raw`1.00\,\mathrm{m}`, '1.00 m')} below a surface at ${im(String.raw`15.0\,\mathrm{kPa}`, '15.0 kPa')} gauge. A point in tank B is ${im(String.raw`3.00\,\mathrm{m}`, '3.00 m')} below an open surface. Find the signed pressure difference ${im(String.raw`p_{\mathrm A}-p_{\mathrm B}`, 'pA − pB')}.`,
    given: mt`The two points happen to be at the same elevation. Water is at rest with ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Both gauge readings use the same atmospheric reference.`,
    solution: [mt`Tank A gives ${dm(String.raw`\begin{aligned}p_{\mathrm A}&=15.0+\frac{1000\times9.80\times1.00}{1000}\\&=24.80\,\mathrm{kPa}\;\text{gauge.}\end{aligned}`, 'pA = 15.0 + 1000 × 9.80 × 1.00 / 1000 = 24.80 kPa gauge.')}`, mt`Tank B gives ${dm(String.raw`\begin{aligned}p_{\mathrm B}&=\frac{1000\times9.80\times3.00}{1000}\\&=29.40\,\mathrm{kPa}\;\text{gauge.}\end{aligned}`, 'pB = 1000 × 9.80 × 3.00 / 1000 = 29.40 kPa gauge.')}`, mt`Therefore ${dm(String.raw`\begin{aligned}p_{\mathrm A}-p_{\mathrm B}&=24.80-29.40\\&=-4.60\,\mathrm{kPa}.\end{aligned}`, 'pA − pB = 24.80 − 29.40 = −4.60 kPa.')}`],
  },
  'pressure-19': {
    hint: mt`Use ${im(String.raw`p=\rho gh`, 'p = ρgh')} at each bottom, then use the specified equal bottom areas.`,
    solution: ['Equal density and depth give equal uniform bottom gauge pressure.', mt`Equal bottom areas then give equal net bottom forces ${im('F=pA', 'F = pA')}. Vertical pressure forces on sloping walls help balance the different water weights.`],
  },
  'pressure-20': {
    prompt: mt`Local atmospheric pressure falls by ${im(String.raw`2.0\,\mathrm{kPa}`, '2.0 kPa')} over an open water tank. Once the water is again at rest, what happens to pressure at a sensor whose depth is unchanged?`,
    choices: [mt`Absolute pressure is unchanged and gauge pressure rises by ${im(String.raw`2.0\,\mathrm{kPa}`, '2.0 kPa')}`, mt`Both absolute and gauge pressure fall by ${im(String.raw`2.0\,\mathrm{kPa}`, '2.0 kPa')}`, 'Both absolute and gauge pressure are unchanged', mt`Absolute pressure falls by ${im(String.raw`2.0\,\mathrm{kPa}`, '2.0 kPa')} and gauge pressure is unchanged`],
    hint: mt`Write ${im(String.raw`p_{\mathrm{absolute}}=p_{\mathrm{atmospheric}}+\rho gh`, 'p_absolute = p_atmospheric + ρgh')} and identify which term changes.`,
    solution: [mt`The hydrostatic contribution ${im(String.raw`\rho gh`, 'ρgh')} is unchanged, while the surface absolute pressure falls by ${im(String.raw`2.0\,\mathrm{kPa}`, '2.0 kPa')}.`, mt`The sensor’s absolute pressure therefore falls by ${im(String.raw`2.0\,\mathrm{kPa}`, '2.0 kPa')}. Subtracting the new atmospheric reference still gives the same gauge pressure ${im(String.raw`\rho gh`, 'ρgh')}.`],
  },
  'forces-01': {
    prompt: mt`Which expression gives the magnitude of the net hydrostatic force on a submerged plane area ${im('A')}?`,
    given: mt`Homogeneous liquid at rest, open free surface; the opposite side is at atmospheric pressure. ${im(String.raw`\bar h`, 'h̄')} is the vertical depth of the area centroid.`,
    choices: [mt`${im(String.raw`F=\rho gA`, 'F = ρgA')}, regardless of depth`, mt`${im(String.raw`F=\rho g\bar h A`, 'F = ρg h̄ A')}`, mt`${im(String.raw`F=\rho g h_{\mathrm{CP}}A`, 'F = ρg hCP A')}, using the centre-of-pressure depth`, mt`${im(String.raw`F=\frac{\rho g\bar h}{A}`, 'F = ρg h̄ / A')}`],
    solution: [mt`Integrate gauge pressure over the surface: ${dm(String.raw`F=\int_A\rho gh\,\mathrm{d}A.`, 'F = ∫A ρgh dA.')}`, mt`Since ${im(String.raw`\int_A h\,\mathrm{d}A=\bar h A`, '∫A h dA = h̄A')}, the resultant magnitude is ${im(String.raw`F=\rho g\bar h A`, 'F = ρg h̄A')}.`],
  },
  'forces-02': {
    prompt: mt`A vertical rectangular gate is ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} wide and ${im(String.raw`3.00\,\mathrm{m}`, '3.00 m')} high, with its top edge at the water free surface. Find the net hydrostatic force magnitude.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Water is on one side; the other side is at atmospheric pressure.`,
    solution: [mt`Area ${dm(String.raw`A=2.00\times3.00=6.00\,\mathrm{m^2};`, 'A = 2.00 × 3.00 = 6.00 m²;')} centroid depth ${im(String.raw`\bar h=1.50\,\mathrm{m}`, 'h̄ = 1.50 m')}.`, mt`${dm(String.raw`\begin{aligned}F&=1000\times9.80\times1.50\times6.00\\&=88{,}200\,\mathrm{N}\\&=88.20\,\mathrm{kN}.\end{aligned}`, 'F = 1000 × 9.80 × 1.50 × 6.00 = 88,200 N = 88.20 kN.')}`],
  },
  'forces-03': {
    prompt: mt`A vertical rectangular gate is ${im(String.raw`1.00\,\mathrm{m}`, '1.00 m')} wide and ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} high. Its top edge is ${im(String.raw`1.00\,\mathrm{m}`, '1.00 m')} below the free surface. Find the centre-of-pressure depth below the free surface.`,
    given: mt`Homogeneous water at rest on one side; atmospheric pressure on the other. Use ${im(String.raw`h_{\mathrm{CP}}=\bar h+\frac{I_{\mathrm G}}{\bar h A}`, 'hCP = h̄ + IG/(h̄A)')}, with ${im(String.raw`I_{\mathrm G}`, 'IG')} about the horizontal centroidal axis.`,
    hint: mt`For a rectangle, ${im(String.raw`I_{\mathrm G}=\frac{bH^3}{12}`, 'IG = bH³/12')}. The centroid depth is not measured from the gate’s top edge.`,
    solution: [mt`${dm(String.raw`\bar h=1.00+\frac{2.00}{2}=2.00\,\mathrm{m};`, 'h̄ = 1.00 + 2.00/2 = 2.00 m;')} ${dm(String.raw`A=1.00\times2.00=2.00\,\mathrm{m^2}.`, 'A = 1.00 × 2.00 = 2.00 m².')}`, mt`${dm(String.raw`I_{\mathrm G}=\frac{1.00\times2.00^3}{12}=\frac23\,\mathrm{m^4}.`, 'IG = 1.00 × 2.00³/12 = 2/3 m⁴.')}`, mt`${dm(String.raw`\begin{aligned}h_{\mathrm{CP}}&=2.00+\frac{2/3}{2.00\times2.00}\\&=2.167\,\mathrm{m}\end{aligned}`, 'hCP = 2.00 + (2/3)/(2.00 × 2.00) = 2.167 m')} below the free surface.`],
  },
  'forces-04': {},
  'forces-05': {
    prompt: mt`For a curved gate, the complete imaginary-water volume used to calculate the vertical component is ${im(String.raw`0.300\,\mathrm{m^3}`, '0.300 m³')}. Find the magnitude of that vertical hydrostatic force component.`,
    given: mt`${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')}; ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. The imaginary-fluid construction is valid for this gate; pressure is gauge pressure.`,
    solution: [mt`${dm(String.raw`\begin{aligned}F_{\mathrm V}&=\rho gV\\&=1000\times9.80\times0.300\\&=2940\,\mathrm{N}.\end{aligned}`, 'FV = ρgV = 1000 × 9.80 × 0.300 = 2940 N.')}`, mt`The magnitude is ${im(String.raw`2.940\,\mathrm{kN}`, '2.940 kN')}. Its direction must be determined separately from the gate geometry.`],
  },
  'forces-06': {},
  'forces-07': {},
  'forces-08': {
    prompt: mt`A horizontal hatch of area ${im(String.raw`0.600\,\mathrm{m^2}`, '0.600 m²')} lies ${im(String.raw`1.50\,\mathrm{m}`, '1.50 m')} below the open water surface. Find the magnitude of the net pressure force on the hatch.`,
    given: mt`Water is above the hatch and atmospheric air is below it. ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    solution: [mt`The uniform gauge pressure is ${dm(String.raw`\begin{aligned}&1000\times9.80\times1.50\\&=14{,}700\,\mathrm{Pa}.\end{aligned}`, '1000 × 9.80 × 1.50 = 14,700 Pa.')}`, mt`The net force is ${dm(String.raw`\begin{aligned}&14{,}700\times0.600\\&=8820\,\mathrm{N}\\&=8.820\,\mathrm{kN},\end{aligned}`, '14,700 × 0.600 = 8820 N = 8.820 kN,')} acting downward.`],
  },
  'forces-09': {},
  'forces-10': {
    prompt: mt`Which area should be used in ${im(String.raw`F=\rho g\bar h A`, 'F = ρg h̄ A')} to find the force magnitude on a fully submerged inclined plane gate?`,
    given: mt`The free surface and the opposite side of the gate are at atmospheric pressure. ${im(String.raw`\bar h`, 'h̄')} is the gate centroid’s vertical depth.`,
    solution: [mt`For a plane gate, the magnitude is ${dm(String.raw`F=\int_A\rho gh\,\mathrm{d}A.`, 'F = ∫A ρgh dA.')}`, mt`The integral uses the actual wetted area, giving ${im(String.raw`F=\rho g\bar h A`, 'F = ρg h̄ A')}. Projection is used separately when resolving components.`],
  },
  'forces-11': {
    prompt: mt`A rectangular gate is ${im(String.raw`1.00\,\mathrm{m}`, '1.00 m')} wide and ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} long along its inclined face. Its upper edge is ${im(String.raw`0.500\,\mathrm{m}`, '0.500 m')} vertically below the water surface, and the face is at ${im(String.raw`30.0^{\circ}`, '30.0°')} to the horizontal. Find the net hydrostatic force magnitude.`,
    given: mt`The gate extends downward from its upper edge. Water is on one side and atmospheric air on the other. The free surface is open. ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    solution: [mt`The wetted area is ${dm(String.raw`1.00\times2.00=2.00\,\mathrm{m^2}.`, '1.00 × 2.00 = 2.00 m².')}`, mt`The centroid depth is ${dm(String.raw`\begin{aligned}&0.500+\frac{2.00}{2}\sin30.0^{\circ}\\&=1.000\,\mathrm{m}.\end{aligned}`, '0.500 + (2.00 / 2) sin 30.0° = 1.000 m.')}`, mt`The force is ${dm(String.raw`\begin{aligned}&\frac{1000\times9.80\times1.000\times2.00}{1000}\\&=19.60\,\mathrm{kN}.\end{aligned}`, '1000 × 9.80 × 1.000 × 2.00 / 1000 = 19.60 kN.')}`],
  },
  'forces-12': {
    prompt: mt`A vertical circular window has radius ${im(String.raw`0.500\,\mathrm{m}`, '0.500 m')} and its centre is ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} below the open water surface. Find the centre-of-pressure depth below the free surface.`,
    given: mt`Homogeneous water is on one side and atmospheric air on the other. For a circle, ${im(String.raw`A=\pi r^2`, 'A = πr²')} and ${im(String.raw`I_{\mathrm G}=\frac{\pi r^4}{4}`, 'I_G = πr⁴/4')} about a horizontal diameter.`,
    hint: mt`Use ${im(String.raw`h_{\mathrm{cp}}=\bar h+\frac{I_{\mathrm G}}{A\bar h}`, 'h_cp = h̄ + I_G / (A h̄)')} for the vertical window.`,
    solution: [mt`The area centroid is at ${im(String.raw`\bar h=2.00\,\mathrm{m}`, 'h̄ = 2.00 m')}, and ${im(String.raw`\frac{I_{\mathrm G}}{A}=\frac{r^2}{4}`, 'I_G / A = r² / 4')}.`, mt`Thus ${dm(String.raw`\begin{aligned}h_{\mathrm{cp}}&=2.00+\frac{0.500^2}{4\times2.00}\\&=2.03125\,\mathrm{m}.\end{aligned}`, 'h_cp = 2.00 + 0.500² / (4 × 2.00) = 2.03125 m.')}`],
  },
  'forces-13': {
    prompt: mt`A vertical gate is ${im(String.raw`1.20\,\mathrm{m}`, '1.20 m')} wide and ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} high, with its top edge hinged at the open water surface. Find the magnitude of the hydrostatic moment about the horizontal hinge.`,
    given: mt`Water is on one side and atmospheric air on the other. ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}. Ignore gate weight and other loads.`,
    solution: [mt`The force is ${dm(String.raw`\begin{aligned}&\frac{\rho gbH^2}{2}\\&=\frac{1000\times9.80\times1.20\times2.00^2}{2}\\&=23{,}520\,\mathrm{N}.\end{aligned}`, 'ρg bH² / 2 = 1000 × 9.80 × 1.20 × 2.00² / 2 = 23,520 N.')}`, mt`Its perpendicular lever arm about the hinge is ${im(String.raw`\frac{2H}{3}=\frac43\,\mathrm{m}`, '2H / 3 = 4 / 3 m')}.`, mt`The moment magnitude is ${dm(String.raw`\begin{aligned}&\frac{23{,}520\times(4/3)}{1000}\\&=31.36\,\mathrm{kN\cdot m}.\end{aligned}`, '23,520 × (4 / 3) / 1000 = 31.36 kN·m.')}`],
  },
  'forces-14': {
    prompt: mt`The vertical projection of a curved retaining wall is a rectangle ${im(String.raw`1.50\,\mathrm{m}`, '1.50 m')} wide and ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} high. Its top edge is ${im(String.raw`1.00\,\mathrm{m}`, '1.00 m')} below the open water surface. Find the magnitude of the horizontal water-force component.`,
    given: mt`The wall curves in a vertical plane and has constant width. Water is on one side and atmospheric air on the other. ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    solution: [mt`The projection has area ${dm(String.raw`1.50\times2.00=3.00\,\mathrm{m^2}`, '1.50 × 2.00 = 3.00 m²')} and centroid depth ${dm(String.raw`1.00+\frac{2.00}{2}=2.00\,\mathrm{m}.`, '1.00 + 2.00 / 2 = 2.00 m.')}`, mt`The horizontal component is ${dm(String.raw`\begin{aligned}&\frac{1000\times9.80\times2.00\times3.00}{1000}\\&=58.80\,\mathrm{kN}.\end{aligned}`, '1000 × 9.80 × 2.00 × 3.00 / 1000 = 58.80 kN.')}`],
  },
  'forces-15': {
    prompt: mt`The hydrostatic force on a curved gate has a horizontal component of ${im(String.raw`3.00\,\mathrm{kN}`, '3.00 kN')} to the right and a vertical component of ${im(String.raw`4.00\,\mathrm{kN}`, '4.00 kN')} downward. Find the resultant force magnitude.`,
    solution: [mt`The magnitude satisfies ${im(String.raw`F^2=F_{\mathrm H}^2+F_{\mathrm V}^2`, 'F² = F_H² + F_V²')}.`, mt`Thus ${dm(String.raw`\begin{aligned}F&=\sqrt{3.00^2+4.00^2}\\&=5.000\,\mathrm{kN}.\end{aligned}`, 'F = √(3.00² + 4.00²) = 5.000 kN.')} The downward sign affects direction but not this magnitude.`],
  },
  'forces-16': {
    solution: [mt`At each depth, ${im(String.raw`\rho gh`, 'ρgh')} doubles, so the resultant force and its moment about any fixed axis both double.`, 'Their ratio determines the centre of pressure, so its location is unchanged.'],
  },
  'forces-17': {},
  'forces-18': {
    prompt: mt`A vertical gate is ${im(String.raw`1.50\,\mathrm{m}`, '1.50 m')} wide and ${im(String.raw`3.00\,\mathrm{m}`, '3.00 m')} high, with its lower edge at a common horizontal floor. Water depth is ${im(String.raw`3.00\,\mathrm{m}`, '3.00 m')} on one side and ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')} on the other. Find the magnitude of the net horizontal hydrostatic force on the gate.`,
    given: mt`Both free surfaces are open to the same atmosphere. The two water bodies are at rest with ${im(String.raw`\rho=1000\,\mathrm{kg/m^3}`, 'ρ = 1000 kg/m³')} and ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    solution: [mt`The deeper side exerts ${dm(String.raw`\frac{\rho gb\times3.00^2}{2}=66.15\,\mathrm{kN}.`, 'ρg b × 3.00² / 2 = 66.15 kN.')}`, mt`The shallower side exerts ${dm(String.raw`\frac{\rho gb\times2.00^2}{2}=29.40\,\mathrm{kN}.`, 'ρg b × 2.00² / 2 = 29.40 kN.')}`, mt`The net magnitude is ${dm(String.raw`66.15-29.40=36.75\,\mathrm{kN},`, '66.15 − 29.40 = 36.75 kN,')} directed toward the shallower side.`],
  },
  'forces-19': {
    hint: mt`Compare how ${im(String.raw`\bar h`, 'h̄')} appears in ${im(String.raw`F=\rho g\bar h A`, 'F = ρg h̄ A')} and in ${im(String.raw`h_{\mathrm{cp}}-\bar h=\frac{I_{\mathrm G}}{A\bar h}`, 'h_cp − h̄ = I_G / (A h̄)')}.`,
    solution: [mt`The centroid depth ${im(String.raw`\bar h`, 'h̄')} increases, so the force ${im(String.raw`\rho g\bar h A`, 'ρg h̄ A')} increases.`, mt`The fixed geometric factor ${im(String.raw`\frac{I_{\mathrm G}}{A}`, 'I_G / A')} is divided by a larger ${im(String.raw`\bar h`, 'h̄')}, so the centre-of-pressure offset decreases.`],
  },
  'forces-20': {
    prompt: mt`A vertical rectangular gate is ${im(String.raw`1.00\,\mathrm{m}`, '1.00 m')} wide and extends from an open free surface to a depth of ${im(String.raw`2.00\,\mathrm{m}`, '2.00 m')}. Oil occupies the upper ${im(String.raw`0.500\,\mathrm{m}`, '0.500 m')}, with water beneath it. Find the net hydrostatic force on the gate.`,
    given: mt`Oil density is ${im(String.raw`800\,\mathrm{kg/m^3}`, '800 kg/m³')} and water density is ${im(String.raw`1000\,\mathrm{kg/m^3}`, '1000 kg/m³')}. Both layers are at rest, and the opposite side of the gate is at atmospheric pressure. Use ${im(String.raw`g=9.80\,\mathrm{m/s^2}`, 'g = 9.80 m/s²')}.`,
    solution: [mt`The oil-loaded upper section contributes ${dm(String.raw`\begin{aligned}&\frac{800\times9.80\times1.00\times0.500^2}{2}\\&=980\,\mathrm{N}.\end{aligned}`, '800 × 9.80 × 1.00 × 0.500² / 2 = 980 N.')}`, mt`The ${im(String.raw`1.50\,\mathrm{m}`, '1.50 m')} water section carries the interface pressure load ${dm(String.raw`\begin{aligned}&800\times9.80\times0.500\\&\quad\times1.00\times1.50\\&=5880\,\mathrm{N}.\end{aligned}`, '800 × 9.80 × 0.500 × 1.00 × 1.50 = 5880 N.')}`, mt`The additional water-pressure triangle contributes ${dm(String.raw`\begin{aligned}&\frac{1000\times9.80\times1.00\times1.50^2}{2}\\&=11{,}025\,\mathrm{N}.\end{aligned}`, '1000 × 9.80 × 1.00 × 1.50² / 2 = 11,025 N.')}`, mt`The total is ${dm(String.raw`\begin{aligned}&\frac{980+5880+11{,}025}{1000}\\&=17.885\,\mathrm{kN}.\end{aligned}`, '(980 + 5880 + 11,025) / 1000 = 17.885 kN.')}`],
  },
};
