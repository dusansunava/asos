import { SK, GB } from "country-flag-icons/react/3x2";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useLanguage } from "@/providers/intl/IntlProvider";
import { Message } from "@/providers/intl/IntlMessage";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  const handleLangSelection = (lang: string): JSX.Element => {
    switch (lang) {
      case "sk":
        return <SK className="h-[1.8rem] w-[1.8rem]" />;
      default:
        return <GB className="h-[1.8rem] w-[1.8rem]" />;
    }
  };

  const [flag, setFlag] = useState<JSX.Element>(handleLangSelection(language));

  const onLanguageChange = (lang: string): void => {
    setLanguage(lang);
    setFlag(handleLangSelection(lang));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {flag}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onLanguageChange("sk")}>
          <Message>language.slovak</Message>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onLanguageChange("en")}>
          <Message>language.english</Message>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
