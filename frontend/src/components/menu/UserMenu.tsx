import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import {
  LogOut,
  Menu,
  Home,
  FolderOpen,
  LineChart,
  CalendarPlus,
  Settings,
  Pencil,
  Bike
} from "lucide-react";
import { useAuthContext } from "@/providers/auth";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Message } from "@/providers/intl/IntlMessage";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import MenuNavItem from "@/components/menu/MenuNavItem";
import { Link } from "react-router-dom";
import { SideMenuLogo } from "@/components/menu/Logo";
import useMutateRequest from "@/lib/fetch/useMutateRequest";

const MenuContent = () => {
  const queryClient = useQueryClient();
  const { setToken } = useAuthContext();
  const { mutate } = useMutateRequest({
    method: "POST",
    url: "/logout",
  });

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-y-6 relative">
      <SideMenuLogo to="/home" />
      <nav className="divide-y-[1px]">
        <MenuNavItem to="/home">
          <Home className="mr-3 h-6 w-6" />
          <Message>home</Message>
        </MenuNavItem>
        <MenuNavItem to="/food">
          <FolderOpen className="mr-3 h-6 w-6" />
          <Message>food</Message>
        </MenuNavItem>
        <MenuNavItem to="/exercises">
          <Bike className="mr-3 h-6 w-6" />
          <Message>exerciseList</Message>
        </MenuNavItem>
        <MenuNavItem to="/exercise/create">
          <CalendarPlus className="mr-3 h-6 w-6" />
          <Message>exerciseAdd</Message>
        </MenuNavItem>
        <MenuNavItem to="/settings">
          <Settings className="mr-3 h-6 w-6" />
          <Message>settings</Message>
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
      <div className="flex justify-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="rounded-full w-24 h-24 text-lg hidden lg:block">
              Icon
            </Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <div className="flex flex-col gap-y-2">
              <p>admin123@gmail.com</p>
              <p>username</p>
              <Link
                to="/home"
                className={buttonVariants({ variant: "default" })}
              >
                <Pencil className="mr-3 h-6 w-6" />
                <Message>profile.edit</Message>
              </Link>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

const UserMenu = () => {
  return (
    <IntlMessagePathProvider value="Menu" override>
      <>
        <aside className="fixed hidden lg:block z-50 top-0 left-0 bg-background border-r w-[250px] h-screen px-2 py-6">
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
          <Popover>
            <PopoverTrigger asChild>
              <Button className="h-11 w-11 rounded-full mx-2">Icon</Button>
            </PopoverTrigger>
            <PopoverContent side="bottom">
              <div className="flex flex-col gap-y-2">
                <p>admin123@gmail.com</p>
                <p>username</p>
                <Link
                  to="/home"
                  className={buttonVariants({ variant: "default" })}
                >
                  <Pencil className="mr-3 h-6 w-6" />
                  <Message>profile.edit</Message>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </IntlMessagePathProvider>
  );
};

export default UserMenu;
