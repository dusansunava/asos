import PageTitle from "@/components/PageTitle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";

const ExercisePage = () => {
  return (
    <IntlMessagePathProvider value="Exercise" override>
      <PageTitle />
    </IntlMessagePathProvider>
  );
};

export default ExercisePage;
