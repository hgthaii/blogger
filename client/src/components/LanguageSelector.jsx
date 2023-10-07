import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../translation/i18n'
import { useSpring, animated } from 'react-spring'
import viLogo from '../assets/icons/flags/VN.png'
import enLogo from '../assets/icons/flags/US.png'

const LanguageSelect = () => {
    const { t } = useTranslation()
    const [currentLanguage, setCurrentLanguage] = useState('vi')

    const springProps = useSpring({
        transform: `rotate(${currentLanguage === 'vi' ? '0deg' : '360deg'})`,
        config: { tension: 350, friction: 80 },
    })

    const changeLanguage = (value) => {
        i18n.changeLanguage(value)
        setCurrentLanguage(value)
    }

    return (
        <div>
            <animated.img
                src={currentLanguage === 'vi' ? viLogo : enLogo}
                alt={currentLanguage === 'vi' ? 'Vietnamese Flag' : 'English Flag'}
                width={40}
                className="rounded-md"
                style={{ cursor: 'pointer', transform: springProps.transform }}
                onClick={() => changeLanguage(currentLanguage === 'vi' ? 'en' : 'vi')}
            />
        </div>
    )
}

export default LanguageSelect
