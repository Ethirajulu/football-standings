import { Resource, createInstance, i18n } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const supportedLngs = ['en'];

export const initTranslations = async (
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Resource
) => {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);
  i18nInstance.use(LanguageDetector);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: [supportedLngs[0]],
    supportedLngs: supportedLngs,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : supportedLngs,
  });

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  };
};
