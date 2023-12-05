import { useState, useContext } from 'react';
import './ChangeNameModal.css';
import { UserEntity } from '../../../../../../../ForFable-Domain';
import { ReactDuo } from '../../../../../../utils/react';
import { toast } from 'react-toastify';
import { stringifyAppError } from '../../../../../../../src/utils/error';
import { LanguageContext } from '../../../../../../contexts/LanguageContext';
import { ServicesContext } from '../../../../../../contexts/ServicesContext';

interface ChangeNameModalProps extends React.HTMLAttributes<HTMLDivElement> {
    propKey: keyof UserEntity
    titleText: string
    userDuo: ReactDuo<UserEntity>
    modalOpenDuo: ReactDuo<boolean>
}

const ChangeNameModal: React.FC<ChangeNameModalProps> = ({ propKey, titleText, userDuo, modalOpenDuo, ...rest }) => {
    const [user, setUser] = userDuo
    const [newName, setNewName] = useState<string>(user[propKey] as string);
    const [isNameModalOpen, setIsNameModalOpen] = modalOpenDuo;
    const [lang] = useContext(LanguageContext)
  const { UsersService } = useContext(ServicesContext)


    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const handleNameFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = { [propKey]: newName }
        const response = await UsersService.update(user.id, body)
        if (response.state == 'Failure') {
            toast.error(stringifyAppError(response))
            return;
        } else {
            toast.success(lang.NamedChangedSuccessfully)
            const result: UserEntity = {...user, [propKey]: newName}
            setUser(result);
            setIsNameModalOpen(false);
        }
    };

    const closeChangeNameModal = () => {
        setIsNameModalOpen(false);
    };

    return (
        isNameModalOpen && (
            <div className="modal" {...rest}>
                <div className="modal-content">
                    <h2>{titleText}</h2>
                    <form onSubmit={handleNameFormSubmit}>
                        <input type="text" id="name-input" value={newName} onChange={handleNameInputChange} />
                        <button type="submit">{lang.Save}</button>
                        <button type="button" onClick={closeChangeNameModal}>
                            {lang.Cancel}
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default ChangeNameModal;