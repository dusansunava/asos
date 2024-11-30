import PageTitle from "@/components/PageTitle";
import { BackButton } from "@/components/ui/button";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { ExerciseData } from "@/pages/user/exercise/detail/ExerciseData";

const ExerciseDetailPage = () => {
  return (
    <IntlMessagePathProvider value="Exercise" override>
      <PageTitle>
        <Message>detail.pageTitle</Message>
      </PageTitle>
      <div className="text-start">
        <BackButton to="/exercises/owned" />
      </div>
      <div className="hidden md:block">
        <ExerciseData />
      </div>
    </IntlMessagePathProvider>
  );
};

export default ExerciseDetailPage;
