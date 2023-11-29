
import {  ReactionType } from '../../../../ForFable-Domain';
import { getColorForReactionIcon } from './definitions';


interface Props {
    react(reactionType: ReactionType): void
    userReaction: ReactionType|null
    reactionAmount: number
}

const Dislike: React.FC<Props> = ({ react, userReaction, reactionAmount }) => {
  return (
    <div style={{display:'flex', alignItems: 'center'}}>
        <i onClick={()=>react(ReactionType.NEGATIVE)}
        className="tooltip pointer fa-solid fa-thumbs-down"
        style={{color: getColorForReactionIcon(userReaction, ReactionType.NEGATIVE, 'red')}}
        >
        <span className="tooltiptext">Dislike</span>
        </i>
        <p>{reactionAmount}</p>
    </div>
  )
}

export default Dislike