import { createContext, ReactNode, useContext } from "react";

type IntlMessagePathProviderProps = {
  value?: string;
  override?: boolean;
  firstParent?: boolean;
  children: ReactNode;
};

type IntlMessagePathProviderState = {
  current: string | undefined;
  previous: string[];
};

const initialState = {
  current: "",
  previous: [],
};

const IntlMessagePathContext =
  createContext<IntlMessagePathProviderState>(initialState);

export const useIntlMessagePathContext = () => {
  return useContext(IntlMessagePathContext);
};

export const IntlMessagePathProvider = ({
  value,
  override,
  firstParent,
  children,
}: IntlMessagePathProviderProps) => {
  const { current, previous = [] } = useIntlMessagePathContext();

  let _value = value;

  if (current && !override) {
    _value = current + "." + _value;
  }

  if (firstParent) {
    _value = previous[0] + (value ? "." + value : "");
  }

  return (
    <IntlMessagePathContext.Provider
      value={{
        current: _value,
        previous: [...previous, _value] as string[],
      }}
    >
      {children}
    </IntlMessagePathContext.Provider>
  );
};
