import './ToWritePrompt.css'
import { PromptInsert } from 'ForFable-Domain';
import { ServicesContext } from '../../contexts/ServicesContext';
import { LanguageContext } from '../../contexts/LanguageContext';
import { useContext } from 'react'
import { stringifyAppError } from '../../utils/error';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const ToWritePrompt: React.FC = () => {
    const { PromptsService } = useContext(ServicesContext)
    const [lang] = useContext(LanguageContext)
    const navigate = useNavigate()

    const postPrompt = async (e: React.FormEvent<HTMLFormElement>) => {
        const bruteData = new FormData(e.target as HTMLFormElement)
        const data = Object.fromEntries(bruteData.entries()) as unknown as PromptInsert
        data.genreIds = [1]
        const response = await PromptsService.store(data)
        if (response.state == 'Failure') {
            toast.error(stringifyAppError(response))
        } else {
            toast.success(lang.PromptCreatedSuccessfully)
            navigate(`/prompt/${response.data.id}`)
        }
    }

    return (
    <div>
        <h1 className='user-list-header'>{lang.CreatePrompt}</h1>
        <div className='login-card'>
            <form className="login-form prompt-form" onSubmit={(e) => { e.preventDefault(); postPrompt(e) }}>
                <div className='prompt-form-div'>
                    <label htmlFor="title">{lang.Title}:</label>
                    <input type="text" name="title" required />
                </div>
                <div className='prompt-form-div'>
                    <label htmlFor="text">{lang.Text}:</label>
                    <textarea name="text" required />
                </div>
                <div className='prompt-number-data'>
                    <div>
                        <label htmlFor="maxSizePerExtension">{lang.MaxSizePerExtension}:</label>
                        <input type="number" name="maxSizePerExtension" required />
                        </div>
                    <div>
                        <label htmlFor="limitOfExtensions">{lang.LimitOfExtensions}:</label>
                        <input type="number" name="limitOfExtensions" required />
                        </div>
                    <div>
                        <label htmlFor="timeForAvanceInMinutes">{lang.TimeForAvanceInMinutes}:</label>
                        <input type="number" name="timeForAvanceInMinutes" required />
                    </div>
                </div>
                <button type="submit">{lang.Submit}</button>
            </form>
        </div>
    </div>
    )
}

export default ToWritePrompt