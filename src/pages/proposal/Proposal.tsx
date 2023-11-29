import { useParams } from "react-router-dom";
import { ProposalServices } from "../../services/ProposalsServices";
import { ReactWriteService } from "../../services/ReactWriteService";
import Proposal from "../../components/proposals/Proposals";
import { CommentServices } from "../../services/CommentServices";

  
export default function ProposalPage() {
    const proposalService = new ProposalServices()
    const reactionService = new ReactWriteService()
    const commentService = new CommentServices()

    const { id } = useParams()

    if (!id || isNaN(Number(id))) return null

    return (
        <Proposal
            proposalId={Number(id)}
            proposalService={proposalService}
            reactionsService={reactionService}
            commentService={commentService}
        />
    )
}