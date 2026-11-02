/**
 * One taxonomy for the editor, language labels and public filters.
 * Only works with an explicit original_language belong in this section.
 */
export const originalLanguages = [
  { id: 'sv', label: 'Swedish', group: 'swedish', htmlLang: 'sv' },
  { id: 'nb', label: 'Norwegian Bokmål', group: 'norwegian', htmlLang: 'nb' },
  { id: 'nn', label: 'Norwegian Nynorsk', group: 'norwegian', htmlLang: 'nn' },
  { id: 'da', label: 'Danish', group: 'danish', htmlLang: 'da' },
  { id: 'fi', label: 'Finnish', group: 'finnish', htmlLang: 'fi' },
  { id: 'is', label: 'Icelandic', group: 'icelandic', htmlLang: 'is' },
  { id: 'fo', label: 'Faroese', group: 'faroese', htmlLang: 'fo' },
  { id: 'sme', label: 'Northern Sámi', group: 'sami', htmlLang: 'se' },
  { id: 'smj', label: 'Lule Sámi', group: 'sami', htmlLang: 'smj' },
  { id: 'sma', label: 'Southern Sámi', group: 'sami', htmlLang: 'sma' },
  { id: 'smn', label: 'Inari Sámi', group: 'sami', htmlLang: 'smn' },
  { id: 'sms', label: 'Skolt Sámi', group: 'sami', htmlLang: 'sms' },
  { id: 'kl', label: 'Greenlandic (Kalaallisut)', group: 'greenlandic', htmlLang: 'kl' },
  { id: 'fit', label: 'Meänkieli', group: 'other', htmlLang: 'fit' },
  { id: 'fkv', label: 'Kven', group: 'other', htmlLang: 'fkv' },
  { id: 'other', label: 'Other Nordic language', group: 'other', htmlLang: '' },
] as const;

export const languageFilters = [
  { id: 'all', label: 'All languages' },
  { id: 'swedish', label: 'Swedish' },
  { id: 'norwegian', label: 'Norwegian' },
  { id: 'danish', label: 'Danish' },
  { id: 'finnish', label: 'Finnish' },
  { id: 'icelandic', label: 'Icelandic' },
  { id: 'faroese', label: 'Faroese' },
  { id: 'sami', label: 'Sámi' },
  { id: 'greenlandic', label: 'Greenlandic' },
  { id: 'other', label: 'Other' },
] as const;

export function getOriginalLanguage(id?: string, detail?: string) {
  if (!id) return null;
  const language = originalLanguages.find((item) => item.id === id);
  if (!language) return null;
  return {
    ...language,
    label: id === 'other' && detail?.trim() ? detail.trim() : language.label,
  };
}
