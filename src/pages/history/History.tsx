import History from "../../components/history/History";
import { GenreServices } from "../../services/GenreServices";
import { PromptServices } from "../../services/PromptServices";

export default function HistoryPage() {
    const promptServices = new PromptServices()
    const genresServices = new GenreServices()

    return (
        <History
            promptServices={promptServices}
            genresServices={genresServices}
        />
    );
}
