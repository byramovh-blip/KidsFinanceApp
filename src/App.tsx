import { RouterProvider } from 'react-router';
import { router } from './utils/routes';
import { LanguageProvider } from './utils/languageContext';

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  );
}

export default App;
