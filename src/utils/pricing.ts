import { PricingOptions } from '../types/portfolio';

export interface EstimateResult {
  basePrice: number;
  addonsTotal: number;
  turnaroundMultiplier: number;
  finalPrice: number;
  estimatedHours: number;
  summaryList: string[];
}

export function calculateEstimate(options: PricingOptions): EstimateResult {
  // Base rates by project type
  const baseRates: Record<PricingOptions['projectType'], number> = {
    reels: 15,           // Starter short tier baseline on Upwork
    youtube: 60,         // YouTube longform cut
    podcast: 50,         // Multicam podcast edit
    commercial: 95,      // Promo with Fusion motion graphics
    documentary: 140,    // Narrative pacing & archival research
  };

  // Footage volume multipliers
  const volumeMultipliers: Record<PricingOptions['footageVolume'], number> = {
    small: 1.0,    // Under 15m raw footage
    medium: 1.25,  // 15-30m raw footage
    large: 1.55,   // 30-60m raw footage
    massive: 2.0,  // 60m+ multi-cam raw footage
  };

  // Turnaround multipliers
  const turnaroundMultipliers: Record<PricingOptions['turnaround'], number> = {
    standard_4d: 1.0,
    priority_48h: 1.25,
    rush_24h: 1.5,
  };

  const rawBase = baseRates[options.projectType] || 25;
  const volumeMultiplier = volumeMultipliers[options.footageVolume] || 1.0;
  const adjustedBase = Math.round(rawBase * volumeMultiplier);

  let addonsTotal = 0;
  const summaryList: string[] = [];

  summaryList.push(`DaVinci Resolve Assembly (${options.projectType.toUpperCase()} - ${options.footageVolume} footage)`);

  if (options.hasColorGrade) {
    const fee = 15;
    addonsTotal += fee;
    summaryList.push('DaVinci 32-bit Float Color Grade (+$15)');
  }

  if (options.hasSoundDesign) {
    const fee = 15;
    addonsTotal += fee;
    summaryList.push('Fairlight Foley & Sound Design (+$15)');
  }

  if (options.hasMotionGraphics) {
    const fee = 25;
    addonsTotal += fee;
    summaryList.push('DaVinci Fusion Motion Graphics (+$25)');
  }

  if (options.hasThumbnail) {
    const fee = 10;
    addonsTotal += fee;
    summaryList.push('High-CTR Cover Frame & Typography (+$10)');
  }

  const turnaroundMult = turnaroundMultipliers[options.turnaround] || 1.0;
  const subtotal = adjustedBase + addonsTotal;
  const finalPrice = Math.round(subtotal * turnaroundMult);

  const estimatedHours = Math.max(2, Math.round(finalPrice / 15)); // based on $15/hr

  return {
    basePrice: adjustedBase,
    addonsTotal,
    turnaroundMultiplier: turnaroundMult,
    finalPrice,
    estimatedHours,
    summaryList,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
