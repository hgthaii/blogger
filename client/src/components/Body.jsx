import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { message, Tabs } from 'antd'
import Menu from './Menu'
import axios from 'axios'

const BodyComponent = () => {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = useState('du-lich')
    const [categorySlugName, setCategorySlugName] = useState('du-lich')
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)

    const onChange = (tabName) => {
        setActiveTab(tabName)
        setCategorySlugName(tabName)
    }

    const getMenuClass = (menuItem) => {
        return `menu-item ${activeTab === menuItem ? 'active-tab' : ''}`
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/blog/get/${categorySlugName}`)
                if (!response || !response.data) {
                    message.error('Không có dữ liệu')
                    return
                }

                setData(response.data)
            } catch (error) {
                message.error('Lỗi khi lấy dữ liệu')
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [categorySlugName])

    const menuData = [
        { key: 'du-lich', label: t('travel') },
        { key: 'cau-chuyen', label: t('story') },
        { key: 'ky-niem', label: t('memory') },
        { key: 'cam-nhan', label: t('feel') },
        { key: 'am-thuc', label: t('food') },
    ]

    const items = menuData.map((menuItem) => ({
        key: menuItem.key,
        label: menuItem.label,
        children: <Menu data={data} />,
    }))

    return (
        <div>
            <Tabs
                defaultActiveKey="du-lich"
                centered
                items={items}
                onChange={onChange}
                type="line"
                className="text-[#333332] mb-4 min-h-[60rem]"
                tabBarStyle={{ color: '#333332', fontWeight: 'bold' }}
            />
        </div>
    )
}

export default BodyComponent
