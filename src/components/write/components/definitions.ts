import { ReactionType } from "../../../../ForFable-Domain"

export const getColorForReactionIcon = (userReaction: ReactionType|null, type: ReactionType, color: string) => {
    if(userReaction == ReactionType.POSITIVE_CONCLUSIVE) {
      if(type == ReactionType.POSITIVE || type == ReactionType.CONCLUSIVE) {
        return color
      }
    }
    if(userReaction == type) {
      return color
    } else {
      return ''
    }
}