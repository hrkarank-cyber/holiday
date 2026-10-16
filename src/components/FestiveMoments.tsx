import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Coffee, Clock, Users, ChevronRight, Sparkles, Utensils } from 'lucide-react';
import { FestiveRecipe } from '../types.ts';
import tableCelebrationImg from '../assets/images/holiday_table_celebration_1792175339916.jpg';
import winterVillageImg from '../assets/images/holiday_winter_village_1792175341320.jpg';

const FESTIVE_RECIPES: FestiveRecipe[] = [
  {
    title: 'Hearthside Spiced Apple Cider',
    prepTime: '20 mins',
    servings: '6 cups',
    description: 'Slow-simmered pure apple cider infused with cinnamon quills, star anise, whole cloves, and fresh orange wheels.',
    ingredients: [
      '6 cups organic unfiltered apple cider',
      '2 whole Ceylon cinnamon quills',
      '3 whole star anise pods',
      '6 whole cloves',
      '1 organic orange, sliced into rounds',
      '1 tbsp maple syrup or honey (optional)',
    ],
    steps: [
      'Pour apple cider into a heavy enameled Dutch oven or saucepan over medium heat.',
      'Add cinnamon quills, star anise, cloves, and orange rounds.',
      'Bring to a gentle simmer, then reduce heat to low. Cover loosely and steep for 25 minutes.',
      'Ladle warm into stoneware mugs, garnishing each with a fresh cinnamon stick.',
    ],
  },
  {
    title: 'Old-Fashioned Ginger & Molasses Biscuits',
    prepTime: '35 mins',
    servings: '18 biscuits',
    description: 'Crackled, chewy holiday spiced cookies rolled in turbinado raw sugar crystals for a warm, fragrant bite.',
    ingredients: [
      '2 cups all-purpose flour',
      '1 tbsp ground ginger + 1 tsp ground cinnamon',
      '1/2 tsp ground cloves and nutmeg',
      '3/4 cup unsalted butter, softened',
      '1 cup dark brown sugar',
      '1/4 cup blackstrap molasses',
      '1 large organic egg',
      '1/3 cup turbinado sugar for rolling',
    ],
    steps: [
      'Whisk dry ingredients and spices in a medium bowl.',
      'Beat butter, brown sugar, and molasses until creamy. Incorporate the egg.',
      'Gradually mix in dry ingredients. Chill dough for 30 minutes in the refrigerator.',
      'Roll into 1-inch balls, roll generously in turbinado sugar, and bake at 350°F (175°C) for 10–12 minutes.',
    ],
  },
  {
    title: 'Starlight Rosemary Candied Pecans',
    prepTime: '25 mins',
    servings: '8 servings',
    description: 'Crisp roasted pecan halves glazed in brown butter, brown sugar, fresh minced winter rosemary, and flaky sea salt.',
    ingredients: [
      '3 cups raw pecan halves',
      '3 tbsp salted butter, melted',
      '1/4 cup light brown sugar',
      '1.5 tbsp fresh rosemary, very finely minced',
      '1 tsp flaky Maldon sea salt',
      '1/4 tsp cayenne pepper (for a subtle warm kick)',
    ],
    steps: [
      'Toss pecan halves with melted butter, brown sugar, minced rosemary, sea salt, and cayenne in a bowl.',
      'Spread onto a parchment-lined baking sheet in a single even layer.',
      'Roast at 325°F (165°C) for 15–18 minutes until fragrant and lightly toasted.',
      'Let cool completely to crisp up before serving in rustic bowls by the hearth.',
    ],
  },
];

export const FestiveMoments: React.FC = () => {
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(0);
  const activeRecipe = FESTIVE_RECIPES[selectedRecipeIndex];

  return (
    <section id="traditions" className="py-16 sm:py-24 border-t border-stone-800/80">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <BookOpen className="h-4 w-4" />
            <span>Cherished Holiday Traditions</span>
          </div>
          <h2 className="font-holiday text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-100">
            Stories, Gatherings & Fireside Aromas
          </h2>
          <p className="mt-3 text-stone-400 text-base">
            The heart of the season is rooted in shared rituals—the warmth of an alpine cabin, the laughter around the feast table, and the aromas drifting from winter kitchens.
          </p>
        </div>

        {/* Bento Grid: 2 Marquee Visual Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1: The Art of Winter Gatherings */}
          <div className="group overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 transition-all hover:border-stone-700">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={tableCelebrationImg}
                alt="Friends and family gathered around an elegant candlelit holiday table"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute top-4 left-4 rounded-md bg-stone-900/80 px-2.5 py-1 text-xs font-medium text-amber-300 backdrop-blur-md border border-stone-800">
                Fellowship & Feast
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-holiday text-2xl font-bold text-stone-100 mb-2">
                The Sacred Circle of the Table
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                Long after the plates are cleared, conversation lingers over flickering candlelight. Sharing gratitude, reminiscing about years past, and passing handmade treats form the soul of holiday fellowship.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Tradition of Thanksgiving & Christmas Eve</span>
                <span aria-hidden="true">·</span>
                <span>Gathered in Fellowship</span>
              </div>
            </div>
          </div>

          {/* Card 2: Alpine Solitude & Starlit Nights */}
          <div className="group overflow-hidden rounded-2xl border border-stone-800 bg-stone-900/60 transition-all hover:border-stone-700">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img
                src={winterVillageImg}
                alt="Snow-covered alpine chalet at twilight with glowing windows"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
              <div className="absolute top-4 left-4 rounded-md bg-stone-900/80 px-2.5 py-1 text-xs font-medium text-amber-300 backdrop-blur-md border border-stone-800">
                Quiet Reflection
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-holiday text-2xl font-bold text-stone-100 mb-2">
                Twilight Snow & Starlit Stillness
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-4">
                When fresh snow blankets the pines and the winter sky reveals crystal constellations, stepping outside into the crisp silence brings peace, renewal, and gratitude for simple blessings.
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-400">
                <span>Winter Solstice & Year-End Reflection</span>
                <span aria-hidden="true">·</span>
                <span>The Quiet Outdoors</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Holiday Kitchen Recipe Feature */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900/50 p-6 sm:p-10 backdrop-blur-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-800">
            <div className="flex items-center gap-2.5">
              <Utensils className="h-5 w-5 text-amber-400" />
              <div>
                <h3 className="text-lg font-bold text-stone-100">
                  The Holiday Kitchen: Winter Warmers
                </h3>
                <p className="text-xs text-stone-400">
                  Select a classic seasonal recipe to craft by the hearth
                </p>
              </div>
            </div>

            {/* Recipe Selector Buttons */}
            <div className="flex flex-wrap gap-2">
              {FESTIVE_RECIPES.map((recipe, index) => (
                <button
                  key={recipe.title}
                  onClick={() => setSelectedRecipeIndex(index)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all whitespace-nowrap ${
                    selectedRecipeIndex === index
                      ? 'border-amber-500 bg-amber-600/20 text-amber-200'
                      : 'border-stone-800 bg-stone-950 text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {recipe.title.split(' ')[0]} {recipe.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Recipe Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <h4 className="font-holiday text-2xl font-bold text-amber-100">
                {activeRecipe.title}
              </h4>
              <p className="text-sm text-stone-300 leading-relaxed">
                {activeRecipe.description}
              </p>

              <div className="flex items-center gap-6 py-2 text-xs text-stone-400 border-y border-stone-800">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>Prep: {activeRecipe.prepTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-amber-400" />
                  <span>Yield: {activeRecipe.servings}</span>
                </div>
              </div>

              <div>
                <h5 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                  Ingredients:
                </h5>
                <ul className="space-y-1.5 text-xs text-stone-300">
                  {activeRecipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400 text-xs mt-0.5">•</span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 bg-stone-950/70 rounded-xl p-6 border border-stone-800/80">
              <h5 className="text-xs font-semibold uppercase tracking-wider text-amber-300 mb-4 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Method & Instructions:</span>
              </h5>
              <ol className="space-y-4 text-xs sm:text-sm text-stone-300">
                {activeRecipe.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone-800 text-[11px] font-semibold text-amber-300 font-mono">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
