import React from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from './LanguageSelector'
import { SearchOutlined } from '@ant-design/icons'
import { Switch } from 'antd'

const HeaderComponent = () => {
    const { t } = useTranslation()
    const [darkMode, setDarkMode] = React.useState(false)
    const [searchText, setSearchText] = React.useState('')
    const handleSearch = (value) => {
        console.log('Đã tìm kiếm:', value)
        // Thực hiện tìm kiếm hoặc các xử lý khác ở đây
    }
    const handleDarkModeChange = (checked) => {
        setDarkMode(checked)
        // Thực hiện chuyển đổi chế độ Dark Mode ở đây
    }
    return (
        <header className="header shadow">
            <LanguageSelector />
            <Switch checked={darkMode} onChange={handleDarkModeChange} className="bg-[violet]" />
            <div className="flex items-center">
                <div className="relative w-[200px]">
                    <input
                        type="text"
                        placeholder={t('search')}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className="outline-none w-full h-[30px] pl-2 rounded-xl"
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="bg-[#fff] absolute right-0 top-0 h-full flex items-center justify-center px-2 rounded-r-xl"
                        style={{ cursor: 'pointer' }}
                    >
                        <SearchOutlined className="text-[#717171] text-[20px]" />
                    </button>
                </div>
            </div>
        </header>
    )
}
export default HeaderComponent
