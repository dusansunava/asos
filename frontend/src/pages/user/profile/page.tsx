import PageTitle from "@/components/PageTitle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import {Message} from "@/providers/intl/IntlMessage.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {User as UserIcon} from "lucide-react";
import {useUser} from "@/providers/user/UserProvider.tsx";
import {ChangePasswordModal} from "@/pages/user/profile/ChangePasswordForm.tsx";

const ProfilePage = () => {
  const { user } = useUser()

  return (
    <IntlMessagePathProvider value="Settings" override>
      <PageTitle>
        <Message exactly>Menu.profile</Message>
      </PageTitle>
      <div className="w-full flex justify-center">
        <Card className="relative p-6 w-[min(100%,400px)] flex flex-col items-center space-y-4">
          {user?.username && <p className="text-2xl sm:text-4xl">{user.username}</p>}
          {user?.email && <Badge>{user.email}</Badge>}
          <UserIcon className="border-4 rounded-full w-36 h-36 sm:w-56 sm:h-56"/>
          <ChangePasswordModal />
        </Card>
      </div>
    </IntlMessagePathProvider>
  );
};

export default ProfilePage;
