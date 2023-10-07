import { HeaderComponent, BodyComponent, FooterComponent, SiderComponent } from '../components'
import { useTranslation } from 'react-i18next'

const HomePage = () => {
    const { t } = useTranslation()
    return (
        <div className="home-page flex flex-col min-h-screen">
            <div className="mx-[6rem]">
                <HeaderComponent />

                <div className="container mx-auto flex flex-row">
                    <div className="w-3/4 bg-gray-200">
                        <BodyComponent></BodyComponent>
                    </div>

                    <div className="w-1/4 bg-red-500">
                        <SiderComponent></SiderComponent>
                    </div>
                </div>

                <FooterComponent></FooterComponent>
            </div>
        </div>
    )
}

export default HomePage
