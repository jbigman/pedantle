module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en-US', 'en', 'fr', 'fr-FR', 'es'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en-US'
  },
  webpack (config) {
    config.infrastructureLogging = { debug: /PackFileCache/ }
    return config
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**'
      }
    ]
  }
}
