
import {  ReactionType } from '../../../../ForFable-Domain';
import { getColorForReactionIcon } from './definitions';
import './actions.css'

interface Props {
    react(reactionType: ReactionType): void
    userReaction: ReactionType|null
}

const Complaint: React.FC<Props> = ({ react, userReaction }) => {
  return (
    <div style={{display:'flex', alignItems: 'center'}}>
      <p className='pointer' onClick={()=>react(ReactionType.COMPLAINT)}
        style={{color: getColorForReactionIcon(userReaction, ReactionType.COMPLAINT, 'red')}}
      >{userReaction==ReactionType.COMPLAINT ? 'Denunciado' : 'Denunciar'}</p>
    </div>
  )
}

export default Complaint