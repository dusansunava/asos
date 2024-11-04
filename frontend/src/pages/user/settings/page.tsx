import PageTitle from "@/components/PageTitle";
import LanguageToggle from "@/components/menu/LanguageToggle";
import ThemeToggle from "@/components/menu/ThemeToggle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";

const SettingsPage = () => {
  return (
    <IntlMessagePathProvider value="Settings" override>
      <PageTitle />
      <LanguageToggle />
      <ThemeToggle />
    </IntlMessagePathProvider>
  );
};

export default SettingsPage;
