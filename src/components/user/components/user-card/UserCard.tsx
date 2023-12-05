import { useContext, useRef, useState } from 'react';
import './UserCard.css';
import ColorPickers from './components/color-pickers/ColorPickers';
import ChangeNameModal from './components/change-name-modal/ChangeNameModal';
import { ReactDuo } from '../../../../utils/react';
import { UserEntity } from '../../../../../ForFable-Domain';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../contexts/UserContext';
import { toast } from 'react-toastify';
import { CompressOrNot } from '../../../../../src/services/ImageUploaderService';
import { ConstantsContext } from '../../../../../src/contexts/ConstantsContext';
import { NO_USER_IMAGE } from '../../../../../src/utils/default';
import LoadingSpinner from '../../../../../src/components/utils/LoadingSpinner';
import { LanguageContext } from '../../../../contexts/LanguageContext';
import { ServicesContext } from 'src/contexts/ServicesContext';


interface UserCardProps {
  userDuo: ReactDuo<UserEntity>
  isUser: boolean;
}


const UserCard: React.FC<UserCardProps> = ({ userDuo, isUser }) => {
  const navigate = useNavigate()
  const [user, setUser] = userDuo
  const [,setUserContext] = useContext(UserContext)
  const { ImageService, UsersService } = useContext(ServicesContext)

  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameModalOpenDuo = useState(false);
  const nickNameModalOpenDuo = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = nameModalOpenDuo
  const [isNickNameModalOpen, setIsNickNameModalOpen] = nickNameModalOpenDuo
  const [constants] = useContext(ConstantsContext)
  const [isImageLoading, setIsImageLoading] = useState(false); // add isLoading state variable

  const [lang] = useContext(LanguageContext)


  const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsImageLoading(true)
    const file = event.target.files?.[0];
    if (file) {
      const response = await ImageService.updateUserImage(await CompressOrNot(
        user, file, constants?.maxImageBythesByNonPremium || 2000
      ))
      if(response.state=='Sucess'){
        setUser({...user, imageUrl: response.data})
      } else {
        toast.error(lang.ErrorWhenSavingImage)
      }
    }
    setIsImageLoading(false)
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
      if(primaryColorData[0] !== user.primaryColorHex || secondaryColorData[0] !== user.secondaryColorHex){
        const updateColorBody = { primaryColorHex: primaryColorData[0], secondaryColorHex: secondaryColorData[0] }
        await UsersService.update(user.id, updateColorBody)
      }
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
        <LoadingSpinner loading={isImageLoading} color={'#00000050'} />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          hidden
          onChange={handleFileInputChange}
        />
        <img
          src={user.imageUrl || NO_USER_IMAGE}
          alt="User"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = NO_USER_IMAGE
          }}
          onClick={() => isUser && fileInputRef.current?.click()}
          style={isImageLoading?{position: 'relative', top:'-100%', opacity: '50%'}:{}}
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
          {!user.emailVerified &&
            <i> {lang.NotVerified}</i>
          }
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
          <b>{lang.Score}:</b> {user.score}
        </div>
        {isUser ? (
          <div className="user-items">
            <b>{lang.Email}:</b> {user.email}
          </div>
        ) : (
          ''
        )}
        <div className="user-items">
          <b>{lang.Birthdate}:</b> {(new Date(String(user.birthDate))).toLocaleDateString(lang.LOCALE_DATE_STRING)}
        </div>
        <div className="user-items">
          <b>{lang.RegisterDate}:</b> {(new Date(String(user.createdAt))).toLocaleDateString(lang.LOCALE_DATE_STRING)}
        </div>
        <div className='button-group--user-panel'>
          {isUser && !user.isPremium ? (
            <button className="be-premium-button">{lang.BePremium}</button>
          ) : (
            ''
          )}
          {isUser &&
            <button onClick={logout} className="logout-button">{lang.Logout}</button>
          }
        </div>
      </div>
      {showColorPickers ? <ColorPickers primaryColorData={primaryColorData} secondaryColorData={secondaryColorData} /> : ''}
      <ChangeNameModal propKey='name' titleText={lang.ChangeName} className="change-name-modal" userDuo={userDuo} modalOpenDuo={nameModalOpenDuo} />
      <ChangeNameModal propKey='nickname' titleText={lang.ChangeNickname} className="change-name-modal" userDuo={userDuo} modalOpenDuo={nickNameModalOpenDuo} />
    </div>
  );
};

export default UserCard;