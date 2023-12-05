import { ApiResponse, CleanReactionResponse, PromptEntity, ProposalEntity, ReactionType, UserEntity, WriteEntity, WriteReactionEntity } from '../../../ForFable-Domain';
import './WriteDetails.css';
import { NO_USER_IMAGE } from '../../utils/default';
import { useMemo, useState, useEffect, useContext, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { stringifyAppError } from '../../utils/error';
import Comments from '../comments/Comments';
import Like from './components/Like';
import Dislike from './components/Dislike';
import { getColorForReactionIcon } from './components/definitions';
import Complaint from './components/Complaint';
import { UserContext } from '../../contexts/UserContext';
import InsertComment from '../comments/InsertComment';
import { ServicesContext } from 'src/contexts/ServicesContext';


type Prompt = {type: 'Prompt', write: PromptEntity}
type Proposal = {type: 'Proposal', write: ProposalEntity}

interface Props {
    user: UserEntity
    writeProp: Prompt|Proposal
    write: WriteEntity // Tirar?
    exibitionText: ReactNode
}

const WriteDetails: React.FC<Props> = ({ user, writeProp, exibitionText}) => {
  const { type, write: promposal } = writeProp
  const [appUser,] = useContext(UserContext)
  const { ReactWritesService } = useContext(ServicesContext)

  const navigate = useNavigate()
  const [reactionsResponse, setReactionsResponse] = useState<CleanReactionResponse>({reactions: [], userReaction: null})
  const [, setReload] = useState(0)

  useEffect(()=>{
      const loadReactions = async () => {
          const request = await ReactWritesService.show(Number(promposal.writeId))
          if (request.state == 'Failure') {
              toast.error(stringifyAppError(request))
          } else {
            setReactionsResponse(request.data)
          }
      }
      loadReactions()
  },[ReactWritesService, promposal.writeId])

  const positiveReactionAmount = useMemo(()=> {
    return reactionsResponse.reactions.filter(r => r.type === 'POSITIVE').length
  }, [reactionsResponse.reactions])

  const negativeReactionAmount = useMemo(()=> {
    return reactionsResponse.reactions.filter(r => r.type === 'NEGATIVE').length
  }, [reactionsResponse.reactions])

  const conclusiveReactionAmount = useMemo(()=> {
    return reactionsResponse.reactions.filter(r => r.type === 'CONCLUSIVE').length
  }, [reactionsResponse.reactions])

  const returnPage = () => {
    if(type == 'Prompt') {
      navigate('/')
    } else {
      navigate(`/prompt/${promposal.promptId}`)
    }
  }

  const gotoAuthor = () => {
    navigate(`/user/${user.id}`)
  }

  const positiveConclusive = (type1: ReactionType|null, type2: ReactionType|null): boolean => {
    return (type1 == ReactionType.POSITIVE && type2 == ReactionType.CONCLUSIVE) ||
           (type1 == ReactionType.CONCLUSIVE && type2 == ReactionType.POSITIVE)
  }

  const react = async (type: ReactionType) => {
    let response: ApiResponse<WriteReactionEntity>
    if(positiveConclusive(type, reactionsResponse.userReaction)) {
      type = ReactionType.POSITIVE_CONCLUSIVE
    } else if(reactionsResponse.userReaction==ReactionType.POSITIVE_CONCLUSIVE) {
      type = type == ReactionType.POSITIVE ? ReactionType.CONCLUSIVE : ReactionType.POSITIVE
    }
    if(reactionsResponse.userReaction != type) {
      response = await ReactWritesService.store({type: type, writeId: promposal.writeId})
    } else {
      response = await ReactWritesService.destroy(Number(promposal.writeId))
    }
    if(response.state == 'Failure') {
      toast.warning(stringifyAppError(response))
    } else {
      const newResponse = await ReactWritesService.show(Number(promposal.writeId))
      if(newResponse.state == 'Sucess') {
        setReactionsResponse(newResponse.data)
      } else {
        toast.warning(stringifyAppError(newResponse))
      }
    }
  }

  return (
    <div className='page--write-details'>
      <div className='flex-row'>
        <i className="fa-solid fa-caret-left return-icon--write-details" onClick={returnPage}/>
        <div className='details--write-details full-width'>
            <div className='info--write-details'>
                <img className='image-portrait pointer' onClick={gotoAuthor} src={user.imageUrl || NO_USER_IMAGE}/>
                <h2 className='author-name--write-details' onClick={gotoAuthor}>Autor: {user.name}</h2>
                <h2 className='popularity-name--write-details'>Popularidade: {promposal.popularity*10}</h2>
                <div className='reactions--write-details'>
                  <Like
                    react={react}
                    userReaction={reactionsResponse.userReaction}
                    reactionAmount={positiveReactionAmount}
                  />
                  <Dislike
                    react={react}
                    userReaction={reactionsResponse.userReaction}
                    reactionAmount={negativeReactionAmount}
                  />
                  {type =='Proposal' &&
                    <div>
                      <i onClick={()=>react(ReactionType.CONCLUSIVE)}
                        className="tooltip pointer fa-solid fa-circle-notch"
                        style={{color: getColorForReactionIcon(reactionsResponse.userReaction, ReactionType.CONCLUSIVE, 'blue')}}
                      >
                      <span className="tooltiptext">Conclusivo</span>
                      </i>
                      <p>{conclusiveReactionAmount}</p>
                    </div>
                  }
                  <Complaint
                    react={react}
                    userReaction={reactionsResponse.userReaction}
                  />
                </div>
            </div>
            {type=='Proposal' && promposal.definitive &&
              <i className='definitive-proposal--write'>Proposta Definitiva</i>
            }
            <div className='text--write-details'>
              {exibitionText}
            </div>
        </div>
      </div>
        {appUser &&
          <InsertComment
            writeId={promposal.writeId} answerToId={null} user={appUser}
            reloadComments={()=>setReload(prev=>prev+1)}
            setIsResponseOpen={()=>{}}
          />
        }
        <Comments
          appUser={appUser as UserEntity}
          writeId={promposal.writeId}
        />
    </div>
  )
};

export default WriteDetails;