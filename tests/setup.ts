import "@testing-library/jest-dom";

beforeEach(() => {
  jest.clearAllMocks();
});

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "app.title": "Welcome to Actepeloc",
        "app.welcome": "Your journey starts here",
        "app.buttons.clickMe": "Click Me",
        "app.buttons.orMe": "Or Me",
      };
      return translations[key] || key;
    },
  }),
}));
