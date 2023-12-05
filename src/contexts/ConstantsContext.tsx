import { createContext, useState } from "react";
import { ConstantEntity } from "../../ForFable-Domain";
import { ReactDuo } from "../utils/react";

interface ContantsProviderProps {
  children: React.ReactNode;
}

const ConstantsContext = createContext<ReactDuo<ConstantEntity | null>>(
  [null, () => {}]
);

const ContantsProvider: React.FC<ContantsProviderProps> = ({ children }) => {
    const duo = useState<ConstantEntity|null>(null);
  
    return (
      <ConstantsContext.Provider value={duo}>
        {children}
      </ConstantsContext.Provider>
    );
}
  
export { ConstantsContext, ContantsProvider };