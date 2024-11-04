import PageTitle from "@/components/PageTitle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";

const AssetsPage = () => {
  return (
    <IntlMessagePathProvider value="Assets" override>
      <PageTitle />
    </IntlMessagePathProvider>
  );
};

export default AssetsPage;
