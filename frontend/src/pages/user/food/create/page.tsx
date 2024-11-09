import { SetStateAction, useState } from "react";
import { BackButton, Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "@/providers/intl/IntlMessage";
import { IntlMessagePathProvider } from "@/providers/intl/IntlMessagePath";
import PageTitle from "@/components/PageTitle";
import useMutateRequest from "@/lib/fetch/useMutateRequest";

const CreateFoodPage = () => {
  const [inputValue, setInputValue] = useState("");

  const { mutateAsync, isPending } = useMutateRequest({
    url: `/food/similar`,
    method: "POST",
    onSuccess: () => {
      console.log("mam jedlo")
    }
  });

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await mutateAsync({
        searchExpression: inputValue,
      });
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <IntlMessagePathProvider value="Food" override>
      <PageTitle>
        <Message>create.pageTitle</Message>
      </PageTitle>
      <div className="text-start">
        <BackButton to="/food" />
      </div>
      <div className="flex justify-center mt-6 gap-x-6">
        <Input
          type="text"
          placeholder="namePlaceholder"
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleSearch} isLoading={isPending} disabled={isPending}>
          <Message>button.create</Message>
        </Button>
      </div>
    </IntlMessagePathProvider>
  );
};

export default CreateFoodPage;
