const NextI18Next = require('next-i18next').default;
const path = require('path');

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: [
    'es', 'fr', 'de', 'hi', 'zh', 'ja', 'ru', 'ar', 'pt', 'bn', 'pa', 'te', 'mr', 'ta', 'tr', 'it', 'ko', 'vi', 'fa'
  ],
  localePath: path.resolve('./public/locales'),
});
