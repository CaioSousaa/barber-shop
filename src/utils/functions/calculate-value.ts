import { Cutting, DyeHair } from '@prisma/client';

export function CalculateValue(
  cut?: Cutting,
  dye_hair?: DyeHair,
  eyebrows?: string,
): number {
  let value = 0;
  if (cut === 'social') {
    value += 15;
  } else if (cut === 'fade') {
    value += 20;
  } else if (cut === 'razor') {
    value += 35;
  }

  if (dye_hair === 'highlights') {
    value += 50;
  } else if (dye_hair === 'snowed') {
    value += 100;
  } else if (dye_hair === 'streaks') {
    value += 80;
  }

  if (eyebrows === 'sim') {
    value += 7;
  }

  return value;
}
