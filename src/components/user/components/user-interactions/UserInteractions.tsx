import { PromptEntityWithWrite, ProposalEntityWithWrite, UserEntity, UsersController } from '@/ForFable-Domain';
import './UserInteractions.css';
import { DateTime } from 'luxon';
import Paginator from '../../../../components/paginator/Paginator';

interface UserInteractionsProps {
  user: UserEntity;
  userService: UsersController
}

const UserInteractions: React.FC<UserInteractionsProps> = ({ user, userService }) => {
  const handleIndexFunction = async (page: number) => {
    return await userService.indexWritesByAuthor(user.id, page)
  }

  const handleRedirect = (isPrompt: boolean, id: number) => {
    if (isPrompt) {
      window.location.href = `/prompt/${id}`
    } else {
      window.location.href = `/proposal/${id}`
    }
  }

  return (
    <div className="user-interaction-card">
      <Paginator<(ProposalEntityWithWrite | PromptEntityWithWrite)>
        indexFunction={async (page: number) => { return await handleIndexFunction(page) }}
        renderAll={(interactions) => {
          if(!interactions) { return <div> Carregando... </div> }
          return <>{
            interactions.all.map((interaction) => {
            const isPrompt = ! ('promptId' in interaction && interaction?.promptId)
            return (
              <div onClick={()=>handleRedirect(isPrompt, interaction.id)} className='interaction' key={interaction.id}>
                <div className='minimum-space'>
                  {isPrompt ?
                    <h3>{`Prompt '${'title' in interaction && interaction?.title || ''}'`}</h3>
                    :
                    <h3>{`Proposta em Prompt '${'promptId' in interaction && interaction?.promptId || ''}'`}</h3>
                  }
                  <div className='interaction-info'>
                    <p>{`Popularidade: ${interaction.popularity*10}`}</p>
                    <p>{DateTime.fromISO(interaction.write.createdAt.toString()).toLocaleString()}</p>
                  </div>
                  {isPrompt ?
                    <i className='write-text'>{interaction.write.text}</i>
                    :
                    <i className='write-text'>...{interaction.write.text}</i>
                  }
                </div>
                <div className='observations--user-interaction'>
                  {interaction.write.edited && <i>Editado</i>}
                  {'concluded' in interaction && interaction.concluded &&
                    <i>Concluído</i>
                  }
                  {'isDaily' in interaction && interaction.isDaily &&
                    <i>Diário Apropriado</i>
                  }
                  {'definitive' in interaction && interaction.definitive &&
                    <i>Definitivo</i>
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