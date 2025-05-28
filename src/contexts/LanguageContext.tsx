import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'zh' | 'ja' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'app.title': 'Cosmic Tarot',
    'app.subtitle': 'Unveil the mysteries of your destiny',
    'app.tagline': 'Let the cards guide your path',
    'reading.single': 'Single Card',
    'reading.three': 'Three Card Spread',
    'reading.celtic': 'Celtic Cross',
    'reading.single.desc': 'Quick insight for daily guidance',
    'reading.three.desc': 'Past, Present, and Future',
    'reading.celtic.desc': 'Comprehensive life reading',
    'draw.ready': 'Ready for your reading?',
    'draw.focus': 'Focus on your question and let the universe guide you to the answers you seek.',
    'draw.cards': 'Draw Cards',
    'draw.drawing': 'Drawing Cards...',
    'new.reading': 'New Reading',
    'interpretation.title': 'Your Reading Interpretation',
    'position.past': 'Past',
    'position.present': 'Present',
    'position.future': 'Future',
    'meaning.upright': 'Upright Meaning',
    'meaning.reversed': 'Reversed Meaning',
    'meaning.key': 'Key Message',
    'mode.manual': 'Manual Selection',
    'mode.random': 'Random Draw',
    'music.toggle': 'Toggle Music',
    'style.rational': 'Rational',
    'style.mystical': 'Mystical',
    'style.encouraging': 'Encouraging'
  },
  zh: {
    'app.title': '宇宙神谕',
    'app.subtitle': '揭开命运的神秘面纱',
    'app.tagline': '让塔罗牌指引你的道路',
    'reading.single': '单张牌',
    'reading.three': '三张牌阵',
    'reading.celtic': '凯尔特十字',
    'reading.single.desc': '日常指导的快速洞察',
    'reading.three.desc': '过去、现在和未来',
    'reading.celtic.desc': '全面的人生解读',
    'draw.ready': '准备好进行占卜了吗？',
    'draw.focus': '专注于你的问题，让宇宙引导你找到所寻求的答案。',
    'draw.cards': '抽取卡牌',
    'draw.drawing': '正在抽取卡牌...',
    'new.reading': '新的占卜',
    'interpretation.title': '你的塔罗解读',
    'position.past': '过去',
    'position.present': '现在',
    'position.future': '未来',
    'meaning.upright': '正位含义',
    'meaning.reversed': '逆位含义',
    'meaning.key': '关键信息',
    'mode.manual': '手动选择',
    'mode.random': '随机抽取',
    'music.toggle': '切换音乐',
    'style.rational': '理性',
    'style.mystical': '神秘',
    'style.encouraging': '鼓励'
  },
  ja: {
    'app.title': 'コズミック オラクル',
    'app.subtitle': '運命の謎を解き明かす',
    'app.tagline': 'カードがあなたの道を導く',
    'reading.single': 'シングルカード',
    'reading.three': 'スリーカードスプレッド',
    'reading.celtic': 'ケルティッククロス',
    'reading.single.desc': '日々の指導のための迅速な洞察',
    'reading.three.desc': '過去、現在、未来',
    'reading.celtic.desc': '包括的な人生占い',
    'draw.ready': '占いの準備はできましたか？',
    'draw.focus': 'あなたの質問に集中し、宇宙があなたが求める答えへと導くようにしましょう。',
    'draw.cards': 'カードを引く',
    'draw.drawing': 'カードを引いています...',
    'new.reading': '新しい占い',
    'interpretation.title': 'あなたの占い解釈',
    'position.past': '過去',
    'position.present': '現在',
    'position.future': '未来',
    'meaning.upright': '正位置の意味',
    'meaning.reversed': '逆位置の意味',
    'meaning.key': '重要なメッセージ',
    'mode.manual': '手動選択',
    'mode.random': 'ランダム抽選',
    'music.toggle': '音楽切替',
    'style.rational': '合理的',
    'style.mystical': '神秘的',
    'style.encouraging': '励まし'
  },
  es: {
    'app.title': 'Oráculo Cósmico',
    'app.subtitle': 'Desvela los misterios de tu destino',
    'app.tagline': 'Deja que las cartas guíen tu camino',
    'reading.single': 'Carta Individual',
    'reading.three': 'Tirada de Tres Cartas',
    'reading.celtic': 'Cruz Celta',
    'reading.single.desc': 'Perspicacia rápida para guía diaria',
    'reading.three.desc': 'Pasado, Presente y Futuro',
    'reading.celtic.desc': 'Lectura integral de la vida',
    'draw.ready': '¿Listo para tu lectura?',
    'draw.focus': 'Concéntrate en tu pregunta y deja que el universo te guíe hacia las respuestas que buscas.',
    'draw.cards': 'Sacar Cartas',
    'draw.drawing': 'Sacando cartas...',
    'new.reading': 'Nueva Lectura',
    'interpretation.title': 'Tu Interpretación de Lectura',
    'position.past': 'Pasado',
    'position.present': 'Presente',
    'position.future': 'Futuro',
    'meaning.upright': 'Significado Derecho',
    'meaning.reversed': 'Significado Invertido',
    'meaning.key': 'Mensaje Clave',
    'mode.manual': 'Selección Manual',
    'mode.random': 'Sorteo Aleatorio',
    'music.toggle': 'Alternar Música',
    'style.rational': 'Racional',
    'style.mystical': 'Místico',
    'style.encouraging': 'Alentador'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
