import { useParams } from "react-router-dom";
import Prompt from "../../components/prompt/Prompt";

  
export default function PromptPage() {
    const { id } = useParams()

    if (!id || isNaN(Number(id))) return null

    return (
        <Prompt promptId={Number(id)} />
    )
}