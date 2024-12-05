import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import {
  LogOut,
  Menu,
  Home,
  CalendarPlus,
  Bike, Languages, Moon, Sun, User, UtensilsCrossed, Dumbbell, PackagePlus
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuPortal,
  DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuthContext } from "@/providers/auth";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Message } from "@/providers/intl/IntlMessage";
import MenuNavItem from "@/components/menu/MenuNavItem";
import { Link } from "react-router-dom";
import { SideMenuLogo } from "@/components/menu/Logo";
import useMutateRequest from "@/lib/fetch/useMutateRequest";
import {useLanguage} from "@/providers/intl/IntlProvider.tsx";
import {useTheme} from "@/providers/theme.tsx";
import {ReactNode} from "react";
import {PopoverContentProps} from "@radix-ui/react-popover";
import {useUser} from "@/providers/user/UserProvider.tsx";

const SettingsDropdown = ({ children, side }: { children: ReactNode, side: PopoverContentProps["side"] }) => {
  const { setLanguage } = useLanguage()
  const {theme, setTheme} = useTheme()
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side={side}>
        <DropdownMenuLabel asChild>
          <Link to="/settings" className="flex grow w-full cursor-pointer">
            {user && user.username}
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            {theme === "dark" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
            <Message exactly>Menu.theme</Message>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Message exactly>Menu.theme.light</Message>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Message exactly>Menu.theme.dark</Message>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages className="h-4 w-4 mr-2" />
            <Message exactly>Menu.language</Message>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setLanguage("sk")}>
                <Message exactly>Menu.language.slovak</Message>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>
                <Message exactly>Menu.language.english</Message>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const MenuContent = () => {
  const queryClient = useQueryClient();
  const { setToken } = useAuthContext();
  const { mutate } = useMutateRequest({
    method: "POST",
    url: "/logout",
  });
  const { user } = useUser();

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-y-6 relative">
      <SideMenuLogo to="/home" />
      <nav className="divide-y-[1px]">
        <MenuNavItem to="/home">
          <Home className="mr-3 h-6 w-6" />
          <Message>home</Message>
        </MenuNavItem>
        <MenuNavItem to="/food">
          <UtensilsCrossed className="mr-3 h-6 w-6" />
          <Message>food</Message>
        </MenuNavItem>
        <MenuNavItem to="/plan">
          <PackagePlus className="mr-3 h-6 w-6" />
          <Message>plan</Message>
        </MenuNavItem>
        <MenuNavItem to="/training">
          <Dumbbell className="mr-3 h-6 w-6" />
          <Message>training</Message>
        </MenuNavItem>
        <MenuNavItem to="/exercises/owned">
          <Bike className="mr-3 h-6 w-6" />
          <Message>exerciseList</Message>
        </MenuNavItem>
        <MenuNavItem to="/exercise/create">
          <CalendarPlus className="mr-3 h-6 w-6" />
          <Message>exerciseAdd</Message>
        </MenuNavItem>
        <MenuNavItem to="/profile">
          <User className="mr-3 h-6 w-6" />
          <Message>profile</Message>
        </MenuNavItem>
        <Button
          onClick={() => {
            mutate({});
            queryClient.clear();
            setToken(null);
          }}
          variant="ghost"
          className="w-full flex justify-start items-center rounded-none py-2 px-7"
        >
          <LogOut className="mr-3 h-6 w-6" />
          <Message>logout</Message>
        </Button>
      </nav>
      <div className="flex justify-center flex-grow items-end">
        {user && <SettingsDropdown side="right">
            <Button className="uppercase focus-visible:ring-0 w-[160px] h-10 text-xl hidden lg:flex lg:flex-row">
                <User className="mr-2" />
              {user.username.slice(0, 2)}
            </Button>
        </SettingsDropdown>}
      </div>
    </div>
  );
};

const UserMenu = () => {
  const { user } = useUser();

  return (
    <IntlMessagePathProvider value="Menu" override>
      <>
        <aside className="fixed hidden lg:block z-50 top-0 left-0 bg-background border-r w-[250px] h-screen p-6">
          <MenuContent />
        </aside>
      </>
      <header className="z-40 px-4 h-14 top-0 flex gap-4 fixed flex-row items-center justify-between w-full bg-background border-b lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="px-2 lg:hidden" variant="ghost">
              <Menu className="w-9 h-9" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[250px] px-2 pb-6 pt-9" side="left">
            <MenuContent />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-x-2">
          {user && <SettingsDropdown side="bottom">
            <Button className="uppercase focus-visible:ring-0 w-10 h-10 text-lg">
              {user.username.slice(0, 2)}
            </Button>
          </SettingsDropdown>}
        </div>
      </header>
    </IntlMessagePathProvider>
  );
};

export default UserMenu;
