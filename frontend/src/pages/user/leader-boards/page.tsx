import PageTitle from "@/components/PageTitle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";

const LeaderBoardsPage = () => {
  return (
    <IntlMessagePathProvider value="LeaderBoards" override>
      <PageTitle />
    </IntlMessagePathProvider>
  );
};

export default LeaderBoardsPage;
