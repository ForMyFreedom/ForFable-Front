import { PromptEntityWithWrite, ProposalEntityWithWrite } from '../../../../../ForFable-Domain';
import './UserInteractions.css';
import { DateTime } from 'luxon';
import { useContext } from 'react'
import Paginator from '../../../../components/paginator/Paginator';
import { LanguageContext } from '../../../../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { ServicesContext } from '../../../../contexts/ServicesContext';

interface UserInteractionsProps {
  userId: number;
}

const UserInteractions: React.FC<UserInteractionsProps> = ({ userId }) => {
  const [lang] = useContext(LanguageContext)
  const { UsersService } = useContext(ServicesContext)
  const navigate = useNavigate()


  const handleIndexFunction = async (page: number) => {
    return await UsersService.indexWritesByAuthor(userId, page)
  }

  const handleRedirect = (isPrompt: boolean, id: number) => {
    if (isPrompt) {
      navigate(`/prompt/${id}`)
    } else {
      navigate(`/proposal/${id}`)
    }
  }

  return (
    <div className="user-interaction-card">
      <Paginator<(ProposalEntityWithWrite | PromptEntityWithWrite)>
        title={<></>}
        noDataMessage={lang.NoInteractionsYet}
        indexFunction={async (page: number) => { return await handleIndexFunction(page) }}
        renderAll={(interactions) => {
          if(!interactions) { return <div> {lang.Loading}... </div> }
          return <>{
            interactions.all.map((interaction) => {
            const isPrompt = ! ('promptId' in interaction && interaction?.promptId)
            return (
              <div onClick={()=>handleRedirect(isPrompt, interaction.id)} className='interaction' key={interaction.id}>
                <div className='minimum-space'>
                  {isPrompt ?
                    <h3>{`${lang.Prompt} '${'title' in interaction && interaction?.title || ''}'`}</h3>
                    :
                    <h3>{`${lang.ProposalInPrompt} '${interaction.promptName}'`}</h3>
                  }
                  <div className='interaction-info'>
                    <p>{`${lang.Popularity}: ${interaction.popularity*10}`}</p>
                    <p>{DateTime.fromISO(interaction.write.createdAt.toString()).toLocaleString()}</p>
                  </div>
                </div>
                <div className='write-div'>
                  {isPrompt ?
                    <i className='write-text'>{interaction.write.text}</i>
                    :
                    <i className='write-text'>...{interaction.write.text}</i>
                  }
                </div>
                <div className='observations--user-interaction'>
                  {interaction.write.edited && <i>{lang.Edited}</i>}
                  {'concluded' in interaction && interaction.concluded &&
                    <i>{lang.Concluded}</i>
                  }
                  {'isDaily' in interaction && interaction.isDaily &&
                    <i>{lang.DailyAppropriated}</i>
                  }
                  {'definitive' in interaction && interaction.definitive &&
                    <i>{lang.Definitive}</i>
                  }
                </div>
              </div>
            )
            })
          }</>
        }}
      />
    </div>
  );
};

export default UserInteractions;