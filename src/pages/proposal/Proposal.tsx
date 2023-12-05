import { useParams } from "react-router-dom";
import Proposal from "../../components/proposals/Proposals";

  
export default function ProposalPage() {
    const { id } = useParams()

    if (!id || isNaN(Number(id))) return null

    return (
        <Proposal proposalId={Number(id)} />
    )
}