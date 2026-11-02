import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateEstimate, formatCurrency } from './pricing';
import { PricingOptions } from '../types/portfolio';

test('calculateEstimate computes standard short-form base rate accurately', () => {
  const options: PricingOptions = {
    projectType: 'reels',
    footageVolume: 'small',
    turnaround: 'standard_4d',
    hasColorGrade: false,
    hasSoundDesign: false,
    hasMotionGraphics: false,
    hasThumbnail: false,
  };

  const result = calculateEstimate(options);
  assert.equal(result.basePrice, 15);
  assert.equal(result.addonsTotal, 0);
  assert.equal(result.turnaroundMultiplier, 1.0);
  assert.equal(result.finalPrice, 15);
  assert.ok(result.estimatedHours >= 2);
});

test('calculateEstimate applies DaVinci addons and turnaround multiplier correctly', () => {
  const options: PricingOptions = {
    projectType: 'youtube',
    footageVolume: 'medium', // 1.25 * 60 = 75
    turnaround: 'priority_48h', // 1.25
    hasColorGrade: true,     // +15
    hasSoundDesign: true,    // +15
    hasMotionGraphics: true, // +25
    hasThumbnail: true,      // +10 -> addons = 65
  };

  const result = calculateEstimate(options);
  assert.equal(result.basePrice, 75);
  assert.equal(result.addonsTotal, 65);
  // subtotal = 75 + 65 = 140. 140 * 1.25 = 175
  assert.equal(result.finalPrice, 175);
  assert.equal(result.summaryList.length, 5);
  assert.ok(result.summaryList[0].includes('DaVinci Resolve'));
});

test('formatCurrency formats whole USD accurately', () => {
  assert.equal(formatCurrency(10), '$10');
  assert.equal(formatCurrency(50), '$50');
  assert.equal(formatCurrency(1250), '$1,250');
});
