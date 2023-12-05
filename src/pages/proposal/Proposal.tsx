import { useParams } from "react-router-dom";
import { ProposalServices } from "../../services/ProposalsServices";
import { ReactWriteService } from "../../services/ReactWriteService";
import Proposal from "../../components/proposals/Proposals";
import { CommentServices } from "../../services/CommentServices";
import { ReactCommentsService } from "../../services/ReactCommentService";

  
export default function ProposalPage() {
    const proposalService = new ProposalServices()
    const reactionService = new ReactWriteService()
    const commentService = new CommentServices()
    const reactCommentService = new ReactCommentsService

    const { id } = useParams()

    if (!id || isNaN(Number(id))) return null

    return (
        <Proposal
            proposalId={Number(id)}
            reactCommentService={reactCommentService}
            proposalService={proposalService}
            reactionsService={reactionService}
            commentService={commentService}
        />
    )
}