import {hydrostaticsMath} from './question-math-hydrostatics.js';
import {flowMassMath} from './question-math-flow-mass.js';
import {energyMomentumMath} from './question-math-energy-momentum.js';
import {inlineMath,mathText} from '../lib/math.js';

// Presentation stays separate from the stable question data used for grading
// and saved sessions. Every annotation retains the original readable text.
export const questionMath={...hydrostaticsMath,...flowMassMath,...energyMomentumMath};
export const presentQuestion=question=>({...question,...questionMath[question.id]});

const units={
  kPa:String.raw`\mathrm{kPa}`,
  'kPa absolute':String.raw`\mathrm{kPa}\text{ absolute}`,
  'kPa gauge':String.raw`\mathrm{kPa}\text{ gauge}`,
  kN:String.raw`\mathrm{kN}`,N:String.raw`\mathrm{N}`,m:String.raw`\mathrm{m}`,mm:String.raw`\mathrm{mm}`,s:String.raw`\mathrm{s}`,
  'm/s':String.raw`\mathrm{m/s}`,'m³/s':String.raw`\mathrm{m^3/s}`,
  'kg/m³':String.raw`\mathrm{kg/m^3}`,'kg/s':String.raw`\mathrm{kg/s}`,
  'kN·m':String.raw`\mathrm{kN}\!\cdot\!\mathrm{m}`,
  degrees:String.raw`{}^\circ`,
};
export const presentUnit=unit=>units[unit]?mathText`${inlineMath(units[unit],unit)}`:unit;
export function presentQuantity(value,unit){
  const number=Number.isInteger(value)?String(value):String(Number(value.toPrecision(7)));
  const texNumber=number.replace(/e([+-]?\d+)$/i,String.raw`\times 10^{$1}`);
  if(unit==='dimensionless')return mathText`${inlineMath(texNumber,number)} dimensionless`;
  if(!units[unit])return `${number} ${unit}`;
  return mathText`${inlineMath(`${texNumber}\\,${units[unit]}`,`${number} ${unit}`)}`;
}
