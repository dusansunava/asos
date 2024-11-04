import PageTitle from "@/components/PageTitle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";

const PortfoliosPage = () => {
  return (
    <IntlMessagePathProvider value="Portfolios" override>
      <PageTitle />
    </IntlMessagePathProvider>
  );
};

export default PortfoliosPage;
