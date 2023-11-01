import { UserEntity } from '../../../../for-fable-domain';
import './UserInteractions.css';

interface UserInteractionsProps {
  user: UserEntity;
}

const UserInteractions: React.FC<UserInteractionsProps> = ({ user }) => {
  return (
    <div className="user-interaction-card">
      {user.name}<br/>
      @Lista de Interações@
    </div>
  );
};

export default UserInteractions;