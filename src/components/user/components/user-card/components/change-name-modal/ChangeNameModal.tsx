import { useState } from 'react';
import './ChangeNameModal.css';
import { UserEntity } from '@/ForFable-Domain';
import { ReactDuo } from '../../../../../../utils/react';
import { toast } from 'react-toastify';

interface ChangeNameModalProps extends React.HTMLAttributes<HTMLDivElement> {
    isName: boolean
    userDuo: ReactDuo<UserEntity>
    modalOpenDuo: ReactDuo<boolean>
}

const ChangeNameModal: React.FC<ChangeNameModalProps> = ({ isName, userDuo, modalOpenDuo, ...rest }) => {
    const [user, setUser] = userDuo
    const titleText = isName ? 'Change Name' : 'Change Nickname'
    const [newName, setNewName] = useState(isName ? user.name : user.nickname);
    const [isNameModalOpen, setIsNameModalOpen] = modalOpenDuo;

    const handleNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewName(event.target.value);
    };

    const handleNameFormSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sucess = await true // @ make request to try change name (if it's nickname, there is no colision error)
        if (!sucess) {
            toast.error(sucess)
            return;
        } else {
            toast.success('Nome trocado com sucesso')
            const result: UserEntity = isName ? {...user, name: newName} : {...user, nickname: newName }
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
                        <button type="submit">Save</button>
                        <button type="button" onClick={closeChangeNameModal}>
                            Cancel
                        </button>
                    </form>
                </div>
            </div>
        )
    );
};

export default ChangeNameModal;