import { appWithTranslation } from 'next-i18next';
import '../app/globals.css';

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);
