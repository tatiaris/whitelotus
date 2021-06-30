export const metadata = {
  name: 'Web App Template',
  abbrName: 'WAT',
  baseURL: 'https://web-app-template.vercel.app',
  structure: {
    '': {
      title: 'Home',
      href: '/',
      description: 'Home description',
      public: true
    },
    about: {
      title: 'About',
      href: '/about',
      description: 'About description',
      public: true
    },
    shop: {
      title: 'Shop',
      href: '/shop',
      description: 'Shop items',
      public: true
    },
    create: {
      title: 'Create',
      href: '/create',
      description: 'Create items',
      public: true
    },
    _error: {
      title: 'Error',
      href: '/_error',
      description: 'Error',
      public: false
    }
  }
};
