import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/dates/styles.css'

import '../src/styles/mantine.scss'

import type { AppProps } from 'next/app'
import { MantineProvider, createTheme, virtualColor } from '@mantine/core'

import en from '../src/i18n/en.json'
import es from '../src/i18n/es.json'
import fr from '../src/i18n/fr.json'
import { LOCALES } from '../src/i18n/locales'

import '../src/styles/variables.scss'
import { IntlProvider } from 'next-intl'
import { useRouter } from 'next/router'
import '../src/styles/general.scss'

const theme = createTheme({
  /* Put your mantine theme override here */
  primaryColor: 'bright-pink',
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: '#F19274',
      light: '#EFD2C4',
    }),
    'bright-pink': [
      '#EFD2C4',
      '#EFD2C4',
      '#EFD2C4',
      '#EFD2C4',
      '#F13EAF',
      '#F13EAF',
      '#F19274',
      '#F19274',
      '#F19274',
      '#F19274',
    ],
  },
  black: '#2C2C2C',
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { locale } = useRouter()

  const AnyComponent = Component as any

  const messages = {
    [LOCALES.ENGLISH]: en,
    [LOCALES.ENGLISH_AUSTRALIA]: en,
    [LOCALES.ENGLISH_BELIZE]: en,
    [LOCALES.ENGLISH_CANADA]: en,
    [LOCALES.ENGLISH_IRELAND]: en,
    [LOCALES.ENGLISH_JAMAICA]: en,
    [LOCALES.ENGLISH_NEW_ZEALAND]: en,
    [LOCALES.ENGLISH_TRINIDAD]: en,
    [LOCALES.ENGLISH_SOUTH_AFRICA]: en,
    [LOCALES.ENGLISH_UNITED_KINGDOM]: en,
    [LOCALES.ENGLISH_UNITED_STATES]: en,
    [LOCALES.FRENCH]: fr,
    [LOCALES.FRENCH_BELGIUM]: fr,
    [LOCALES.FRENCH_CANADA]: fr,
    [LOCALES.FRENCH_FRANCE]: fr,
    [LOCALES.FRENCH_LUX]: fr,
    [LOCALES.FRENCH_SWITZERLAND]: fr,
    [LOCALES.SPANISH]: es,
    [LOCALES.SPANISH_ARGENTINA]: es,
    [LOCALES.SPANISH_BOLIVIA]: es,
    [LOCALES.SPANISH_CHILE]: es,
    [LOCALES.SPANISH_COLOMBIA]: es,
    [LOCALES.SPANISH_COSTA_RICA]: es,
    [LOCALES.SPANISH_DOMINICAN_REPUBLIC]: es,
    [LOCALES.SPANISH_ECUADOR]: es,
    [LOCALES.SPANISH_SALVADOR]: es,
    [LOCALES.SPANISH_GUATEMALA]: es,
    [LOCALES.SPANISH_HONDURAS]: es,
    [LOCALES.SPANISH_MEXICO]: es,
    [LOCALES.SPANISH_NICARAGUA]: es,
    [LOCALES.SPANISH_PANAMA]: es,
    [LOCALES.SPANISH_PARAGUAY]: es,
    [LOCALES.SPANISH_PERU]: es,
    [LOCALES.SPANISH_PUERTO_RICO]: es,
    [LOCALES.SPANISH_URUGUAY]: es,
    [LOCALES.SPANISH_VENEZUELA]: es,
  }

  if (locale !== undefined) {
    return (
      <IntlProvider
        messages={messages[locale.toLowerCase()]}
        locale={locale}
        onError={() => null}
      >
        <MantineProvider theme={theme}>
          <Component {...pageProps} />
        </MantineProvider>
      </IntlProvider>
    )
  }
  return <AnyComponent {...pageProps} />
}
