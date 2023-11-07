import { HexColorPicker } from 'react-colorful';
import './ColorPickers.css'
import { ReactDuo } from '@/src/utils/react';


interface ColorPickersProps {
    primaryColorData: ReactDuo<string>
    secondaryColorData: ReactDuo<string>
}

const ColorPickers: React.FC<ColorPickersProps> = ({ primaryColorData, secondaryColorData }) => {
    const [primaryColor, setPrimaryColor] = primaryColorData
    const [secondaryColor, setSecondaryColor] = secondaryColorData
  
    return (
        <>
            <HexColorPicker className='separation' style={{width: '10rem'}} color={primaryColor} onChange={setPrimaryColor} />
            <HexColorPicker style={{width: '10rem'}} color={secondaryColor} onChange={setSecondaryColor} />
        </>
    )
}


export default ColorPickers