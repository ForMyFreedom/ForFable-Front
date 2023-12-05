import { createContext } from "react";
import { AllControllers } from "../../ForFable-Domain";
import { CommentServices, ConstantsServices, GenreServices, PromptServices, ProposalServices, ReactCommentsService, ReactWriteService, UserServices, LoginServices, ImageService } from "../services";

interface ServicesProviderProps {
  children: React.ReactNode;
}

const ServicesContext = createContext<AllControllers>(getAllServices());

const ServicesProvider: React.FC<ServicesProviderProps> = ({ children }) => {
    const value = getAllServices()
  
    return (
      <ServicesContext.Provider value={value}>
        {children}
      </ServicesContext.Provider>
    );
}

function getAllServices() {
  return {
    CommentsService: new CommentServices(),
    ConstantsService: new ConstantsServices(),
    GenresService: new GenreServices(),
    PromptsService: new PromptServices(),
    ProposalsService: new ProposalServices(),
    ReactCommentsService: new ReactCommentsService(),
    ReactWritesService: new ReactWriteService(),
    UsersService: new UserServices(),
    LoginService: new LoginServices(),
    ImageService: new ImageService(),
  }
}
  
export { ServicesContext, ServicesProvider };