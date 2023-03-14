export type WordItemType = {
  word: string;
  translation: string[];
};

export type SettingsType = {
  wordsNumber?: number | null | undefined;
  language?: string | null | undefined;
};
