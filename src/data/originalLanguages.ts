/** Nordic language taxonomy. Original language means language of first composition. */
export const originalLanguages = [
  { id: 'sv', label: 'Swedish', group: 'swedish', htmlLang: 'sv' },
  { id: 'nb', label: 'Norwegian Bokmål', group: 'norwegian', htmlLang: 'nb' },
  { id: 'nn', label: 'Norwegian Nynorsk', group: 'norwegian', htmlLang: 'nn' },
  { id: 'da', label: 'Danish', group: 'danish', htmlLang: 'da' },
  { id: 'fi', label: 'Finnish', group: 'finnish', htmlLang: 'fi' },
  { id: 'is', label: 'Icelandic', group: 'icelandic', htmlLang: 'is' },
  { id: 'fo', label: 'Faroese', group: 'faroese', htmlLang: 'fo' },
  { id: 'kl', label: 'Greenlandic (Kalaallisut)', group: 'greenlandic', htmlLang: 'kl' },
  { id: 'sme', label: 'Northern Sámi', group: 'sami', htmlLang: 'se' },
  { id: 'smj', label: 'Lule Sámi', group: 'sami', htmlLang: 'smj' },
  { id: 'sma', label: 'Southern Sámi', group: 'sami', htmlLang: 'sma' },
  { id: 'smn', label: 'Inari Sámi', group: 'sami', htmlLang: 'smn' },
  { id: 'sms', label: 'Skolt Sámi', group: 'sami', htmlLang: 'sms' },
  { id: 'fit', label: 'Meänkieli', group: 'other', htmlLang: 'fit' },
  { id: 'fkv', label: 'Kven', group: 'other', htmlLang: 'fkv' },
  { id: 'en', label: 'English', group: 'english', htmlLang: 'en' },
  { id: 'other', label: 'Other Nordic language', group: 'other', htmlLang: '' },
] as const;

export const languageGroups = [
  { id: 'swedish', label: 'Swedish', description: 'Poetry, fiction, essays and criticism originally written in Swedish.' },
  { id: 'norwegian', label: 'Norwegian', description: 'Literature originally written in Norwegian Bokmål or Nynorsk.' },
  { id: 'danish', label: 'Danish', description: 'Poetry, fiction, essays and criticism originally written in Danish.' },
  { id: 'finnish', label: 'Finnish', description: 'Poetry, fiction, essays and criticism originally written in Finnish.' },
  { id: 'icelandic', label: 'Icelandic', description: 'Literature originally written in Icelandic.' },
  { id: 'faroese', label: 'Faroese', description: 'Literature originally written in Faroese.' },
  { id: 'greenlandic', label: 'Greenlandic', description: 'Literature originally written in Greenlandic (Kalaallisut).' },
  { id: 'sami', label: 'Sámi languages', description: 'Work in Northern, Lule, Southern, Inari, Skolt and other Sámi languages, each identified individually.' },
  { id: 'other', label: 'Other Nordic languages', description: 'Literature in Meänkieli, Kven and other languages of the Nordic region.' },
  { id: 'english', label: 'English', description: 'Literature originally written in English by TSQ contributors.' },
] as const;

export const languageFilters = [
  { id: 'all', label: 'All languages' },
  ...languageGroups.map(({id,label})=>({id,label})),
] as const;

export function getOriginalLanguage(id?: string, detail?: string) {
  if (!id) return null;
  const language = originalLanguages.find(item => item.id === id);
  if (!language) return null;
  return {...language, label: id === 'other' && detail?.trim() ? detail.trim() : language.label};
}
