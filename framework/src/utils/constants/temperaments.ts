export const ALLOWED_TEMPERAMENTS = [
  'Calm',
  'Curious',
  'Playful',
  'Affectionate',
  'Independent',
  'Shy',
  'Dominant',
  'Easygoing',
  'Aggressive',
  'Nervous',
  'Social'
];

export function isValidTemperament(value: string): boolean {
  return ALLOWED_TEMPERAMENTS.includes(value);
}