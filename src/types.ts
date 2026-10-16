export type HolidayTheme = 'winter' | 'harvest' | 'newyear' | 'blossom';

export interface ThemeConfig {
  id: HolidayTheme;
  name: string;
  subtitle: string;
  badgeLabel: string;
  primaryBg: string;
  canvasBg: string;
  accentColor: string;
  textColor: string;
  heroHeadline: string;
  heroSubheadline: string;
  accentGradient: string;
  particleType: 'snow' | 'leaves' | 'stars' | 'petals';
}

export interface GreetingCardData {
  recipient: string;
  sender: string;
  headline: string;
  message: string;
  themeStyle: 'emerald' | 'burgundy' | 'gold' | 'midnight';
  stamp: 'wreath' | 'bell' | 'star' | 'cocoa' | 'gingerbread' | 'candle';
}

export interface CheerGift {
  id: number;
  dayNumber: number;
  tagline: string;
  title: string;
  quote: string;
  author: string;
  activity: string;
  category: 'Reflection' | 'Warmth' | 'Kindness' | 'Wonder' | 'Gratitude' | 'Laughter';
}

export interface FestiveRecipe {
  title: string;
  prepTime: string;
  servings: string;
  description: string;
  ingredients: string[];
  steps: string[];
}
