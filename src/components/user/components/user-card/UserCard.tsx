import { useContext, useRef, useState } from 'react';
import './UserCard.css';
import ColorPickers from './components/color-pickers/ColorPickers';
import ChangeNameModal from './components/change-name-modal/ChangeNameModal';
import { ReactDuo } from '../../../../utils/react';
import { UserEntity, UsersController } from '@/ForFable-Domain';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext';


interface UserCardProps {
  userService: UsersController
  userDuo: ReactDuo<UserEntity>
  isUser: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ userDuo, isUser, userService }) => {
  const navigate = useNavigate()
  const [user, setUser] = userDuo
  const [,setUserContext] = useContext(UserContext)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameModalOpenDuo = useState(false);
  const nickNameModalOpenDuo = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = nameModalOpenDuo
  const [isNickNameModalOpen, setIsNickNameModalOpen] = nickNameModalOpenDuo

  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) { // @ DON'T SAVE IN BASE 64!!! FIND ANOTHER WAY
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const imageUrl = reader.result as string;
        setUser({...user, imageUrl: imageUrl})
        await userService.update(user.id, { imageUrl: imageUrl })
      };
    }
  };

  const openChangeNickNameModal = () => {
    if (!isUser || isNameModalOpen) {
      return;
    }
    setIsNickNameModalOpen(true);
  };

  
  const openChangeNameModal = () => {
    if (!isUser || isNickNameModalOpen) {
      return;
    }
    setIsNameModalOpen(true);
  };

  const primaryColorData = useState(user.primaryColorHex);
  const secondaryColorData = useState(user.secondaryColorHex);
  const [showColorPickers, setShowColorPickers] = useState(false);

  const regulateColorPicker = async () => {
    if (showColorPickers) {
      const updateColorBody = { primaryColorHex: primaryColorData[0], secondaryColorHex: secondaryColorData[0] }
      await userService.update(user.id, updateColorBody)
    }
    setShowColorPickers(!showColorPickers);
  };

  const [primaryColor] = primaryColorData;
  const [secondaryColor] = secondaryColorData;

  const getPremiumColorStyle = () => {
    return {
      color: primaryColor,
      WebkitTextStroke: '1px ' + secondaryColor,
    };
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUserContext(null)
    navigate("/");
  }

  return (
    <div className="user-card">
      <div className={`user-image ${isUser ? 'allow-change-image' : ''}`}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={handleFileInputChange}
        />
        <img
          src={user.imageUrl}
          alt="User"
          onClick={() => isUser && fileInputRef.current?.click()}
        />
      </div>
      <div className="user-details">
        <div className="user-name-group">
          {user.isPremium ? (
            <>
              <i className="fa-solid fa-crown"></i>
              <div
                className={`user-name ${isUser ? 'user-name-owner' : ''}`}
                style={getPremiumColorStyle()}
                onClick={openChangeNameModal}
              >
                {user.name}
              </div>
            </>
          ) : (
            <div className={`user-name ${isUser ? 'user-name-owner' : ''}`} onClick={openChangeNameModal}>{user.name}</div>
          )}
        </div>
        {user.isPremium ? (
          <>
            <div className={`nickname ${isUser ? 'user-name-owner' : ''}`} onClick={openChangeNickNameModal}>{user.nickname}</div>
            {isUser ? (
              <button className="change-color-button" onClick={regulateColorPicker}>
                <i className="fa-solid fa-palette rainbow_text_animated"></i>
              </button>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
        <div className="user-items">
          <b>Score:</b> {user.score}
        </div>
        {isUser ? (
          <div className="user-items">
            <b>Email:</b> {user.email}
          </div>
        ) : (
          ''
        )}
        <div className="user-items">
          <b>Birth Date:</b> {(new Date(String(user.birthDate))).toLocaleDateString('en-GB')}
        </div>
        <div className="user-items">
          <b>Register Date:</b> {(new Date(String(user.createdAt))).toLocaleDateString('en-GB')}
        </div>
        <div className='button-group--user-panel'>
          {isUser && !user.isPremium ? (
            <button className="be-premium-button">Be Premium!</button>
          ) : (
            ''
          )}
          {isUser &&
            <button onClick={logout} className="logout-button">Logout</button>
          }
        </div>
      </div>
      {showColorPickers ? <ColorPickers primaryColorData={primaryColorData} secondaryColorData={secondaryColorData} /> : ''}
      <ChangeNameModal isName={true} className="change-name-modal" userDuo={userDuo} modalOpenDuo={nameModalOpenDuo}/>
      <ChangeNameModal isName={false} className="change-name-modal" userDuo={userDuo} modalOpenDuo={nickNameModalOpenDuo}/>
    </div>
  );
};

export default UserCard;