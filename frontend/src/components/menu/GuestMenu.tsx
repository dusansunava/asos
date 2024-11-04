import ThemeToggle from "@/components/menu/ThemeToggle";
import { Hand, LogIn, Menu, UserPlus } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import { Message } from "@/providers/intl/IntlMessage";
import MenuNavItem from "./MenuNavItem";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SideMenuLogo, TopMenuLogo } from "@/components/menu/Logo";

const GuestMenu = () => {
  return (
    <IntlMessagePathProvider value="Menu" override>
      <header className="z-40 px-4 h-14 top-0 flex gap-4 fixed flex-row items-center w-full bg-background border-b">
        <div className="w-full h-full grid grid-cols-2 lg:grid-cols-10 gap-x-2 items-center">
          <div className="lg:flex col-span-2 hidden">
            <TopMenuLogo to="/" />
          </div>
          <div className="flex justify-start lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="px-2" variant="ghost">
                  <Menu className="h-9 w-9" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[250px] px-2 pb-14 pt-9" side="left">
                <SideMenuLogo to="/" />
                <nav className="divide-y">
                  <MenuNavItem to="/">
                    <Hand className="mr-3 h-6 w-6" />
                    <Message>welcome</Message>
                  </MenuNavItem>
                  <MenuNavItem to="/login">
                    <LogIn className="mr-3 h-6 w-6" />
                    <Message>login</Message>
                  </MenuNavItem>
                  <MenuNavItem to="/register">
                    <UserPlus className="mr-3 h-6 w-6" />
                    <Message>register</Message>
                  </MenuNavItem>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <nav className="hidden lg:flex gap-x-8 col-span-6 justify-center items-center">
            <div className="flex gap-x-8">
              <MenuNavItem to="/" className="rounded-md">
                <Message>welcome</Message>
              </MenuNavItem>
              <MenuNavItem to="/login" className="rounded-md">
                <Message>login</Message>
              </MenuNavItem>
              <MenuNavItem to="/register" className="rounded-md">
                <Message>register</Message>
              </MenuNavItem>
            </div>
          </nav>
          <div className="flex items-center gap-x-2 justify-end lg:col-span-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>
    </IntlMessagePathProvider>
  );
};

export default GuestMenu;
