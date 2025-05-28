export type ReadingType = 'single' | 'three-card' | 'celtic-cross';

export interface TarotCardData {
  id: number;
  name: string;
  suit: string;
  symbol: string;
  image: string;
  meanings: {
    upright: string;
    reversed: string;
  };
  interpretation: string;
}

export const tarotDeck: TarotCardData[] = [
  // Major Arcana
  {
    id: 0,
    name: "The Fool",
    suit: "Major Arcana",
    symbol: "🃏",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    meanings: {
      upright: "New beginnings, innocence, spontaneity, free spirit, adventure",
      reversed: "Recklessness, taken advantage of, inconsideration, lack of direction"
    },
    interpretation: "You stand at the beginning of a new journey. Trust in your intuition and take that leap of faith."
  },
  {
    id: 1,
    name: "The Magician",
    suit: "Major Arcana",
    symbol: "🎩",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    meanings: {
      upright: "Manifestation, resourcefulness, power, inspired action, willpower",
      reversed: "Manipulation, poor planning, latent talents, confusion"
    },
    interpretation: "You have all the tools you need to create the reality you desire. Focus your energy and take action."
  },
  {
    id: 2,
    name: "The High Priestess",
    suit: "Major Arcana",
    symbol: "👑",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop",
    meanings: {
      upright: "Intuition, sacred knowledge, subconscious mind, inner guidance",
      reversed: "Secrets, disconnected from intuition, withdrawal, silence"
    },
    interpretation: "Listen to your inner voice. The answers you seek lie within your intuitive wisdom."
  },
  {
    id: 3,
    name: "The Empress",
    suit: "Major Arcana",
    symbol: "👸",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    meanings: {
      upright: "Femininity, beauty, nature, nurturing, abundance, creativity",
      reversed: "Creative block, dependence on others, smothering, lack of growth"
    },
    interpretation: "Embrace your creative power and nurturing nature. Abundance flows when you align with natural cycles."
  },
  {
    id: 4,
    name: "The Emperor",
    suit: "Major Arcana",
    symbol: "👑",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
    meanings: {
      upright: "Authority, structure, control, fatherhood, leadership, stability",
      reversed: "Tyranny, rigidity, coldness, domination, inflexibility"
    },
    interpretation: "Take charge of your situation with wisdom and structure. Leadership requires both strength and compassion."
  },
  {
    id: 5,
    name: "The Hierophant",
    suit: "Major Arcana",
    symbol: "⛪",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    meanings: {
      upright: "Spiritual wisdom, tradition, conformity, education, institutions",
      reversed: "Personal beliefs, freedom, challenging the status quo"
    },
    interpretation: "Seek wisdom from traditional sources or trusted mentors. Sometimes conformity serves a greater purpose."
  },
  {
    id: 6,
    name: "The Lovers",
    suit: "Major Arcana",
    symbol: "💕",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    meanings: {
      upright: "Love, harmony, relationships, values alignment, choices",
      reversed: "Self-love, disharmony, imbalance, misalignment of values"
    },
    interpretation: "Important choices regarding relationships and values await. Choose with both heart and mind."
  },
  {
    id: 7,
    name: "The Chariot",
    suit: "Major Arcana",
    symbol: "🏎️",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    meanings: {
      upright: "Control, willpower, success, determination, direction",
      reversed: "Self-discipline, lack of control, lack of direction, aggression"
    },
    interpretation: "Victory comes through focused determination and self-control. Harness opposing forces to move forward."
  },
  {
    id: 8,
    name: "Strength",
    suit: "Major Arcana",
    symbol: "🦁",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop",
    meanings: {
      upright: "Strength, courage, patience, control, compassion, inner strength",
      reversed: "Self doubt, weakness, insecurity, lack of confidence"
    },
    interpretation: "True strength comes from compassion and inner courage, not force. Gentle persistence wins the day."
  },
  {
    id: 9,
    name: "The Hermit",
    suit: "Major Arcana",
    symbol: "🕯️",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    meanings: {
      upright: "Soul searching, introspection, inner guidance, solitude, spiritual enlightenment",
      reversed: "Isolation, loneliness, withdrawal, paranoia, inability to accept help"
    },
    interpretation: "A time for introspection and spiritual seeking. The answers you need will come through quiet contemplation."
  },
  // Cups Suit
  {
    id: 10,
    name: "Ace of Cups",
    suit: "Cups",
    symbol: "🏆",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
    meanings: {
      upright: "New relationships, compassion, creativity, new emotional beginnings",
      reversed: "Self-love, intuition, blocked creativity, emptiness"
    },
    interpretation: "A new emotional beginning or spiritual awakening is at hand. Open your heart to receive love and inspiration."
  },
  {
    id: 11,
    name: "Two of Cups",
    suit: "Cups",
    symbol: "💑",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    meanings: {
      upright: "Unified love, partnership, mutual attraction, relationships",
      reversed: "Self-love, break-ups, disharmony, distrust"
    },
    interpretation: "A meaningful connection or partnership is forming. Mutual respect and emotional balance are key."
  },
  {
    id: 12,
    name: "Three of Cups",
    suit: "Cups",
    symbol: "🥂",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    meanings: {
      upright: "Celebration, friendship, creativity, community, group events",
      reversed: "Independence, alone time, inner circle, three's a crowd"
    },
    interpretation: "Celebrate your achievements with friends and community. Joy is multiplied when shared with others."
  },
  // Pentacles Suit
  {
    id: 13,
    name: "Ace of Pentacles",
    suit: "Pentacles",
    symbol: "💎",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    meanings: {
      upright: "A new financial or career opportunity, material manifestation",
      reversed: "Lost opportunity, lack of planning, poor financial judgment"
    },
    interpretation: "A golden opportunity for material or financial growth presents itself. Plant the seeds for future prosperity."
  },
  {
    id: 14,
    name: "Two of Pentacles",
    suit: "Pentacles",
    symbol: "⚖️",
    image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=600&fit=crop",
    meanings: {
      upright: "Multiple priorities, time management, prioritization, adaptability",
      reversed: "Over-committed, disorganization, reprioritization"
    },
    interpretation: "Balance multiple responsibilities with grace and flexibility. Prioritize what truly matters most."
  },
  // Swords Suit
  {
    id: 15,
    name: "Ace of Swords",
    suit: "Swords",
    symbol: "⚔️",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    meanings: {
      upright: "New ideas, mental clarity, breakthrough, communication",
      reversed: "Confusion, brutality, chaos, lack of clarity"
    },
    interpretation: "A breakthrough in thinking or communication brings clarity to confusion. Truth cuts through illusion."
  },
  {
    id: 16,
    name: "Two of Swords",
    suit: "Swords",
    symbol: "🤔",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=600&fit=crop",
    meanings: {
      upright: "Difficult decisions, weighing options, indecision, stalemate",
      reversed: "Indecision, confusion, information overload, stalemate"
    },
    interpretation: "A difficult decision requires careful consideration. Remove the blindfold and see the situation clearly."
  },
  // Wands Suit
  {
    id: 17,
    name: "Ace of Wands",
    suit: "Wands",
    symbol: "🔥",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=600&fit=crop",
    meanings: {
      upright: "Inspiration, new opportunities, growth, creative spark",
      reversed: "An emerging idea, lack of direction, distractions, delays"
    },
    interpretation: "A spark of inspiration ignites new possibilities. Take action while the fire of creativity burns bright."
  },
  {
    id: 18,
    name: "Two of Wands",
    suit: "Wands",
    symbol: "🗺️",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    meanings: {
      upright: "Future planning, making decisions, leaving comfort zone",
      reversed: "Personal goals, inner alignment, fear of unknown, lack of planning"
    },
    interpretation: "The world is in your hands. Make concrete plans and prepare to expand beyond your current horizons."
  },
  {
    id: 19,
    name: "Three of Wands",
    suit: "Wands",
    symbol: "🌅",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    meanings: {
      upright: "Progress, expansion, foresight, overseas opportunities",
      reversed: "Playing small, lack of foresight, unexpected delays"
    },
    interpretation: "Your efforts are beginning to pay off. Look to the horizon for expanding opportunities and growth."
  }
];
