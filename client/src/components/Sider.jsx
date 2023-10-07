import React from 'react'
import Roo from '../assets/images/roo.jpg'
import Facebook from '../assets/icons/socials/Facebook.png'
import Instagram from '../assets/icons/socials/Instagram.png'
import Gmail from '../assets/icons/socials/Gmail.png'
import Spotify from '../assets/icons/socials/Spotify.png'

const SiderComponent = () => {
    return (
        <div>
            <div className="flex justify-center my-6">
                <img src={Roo} alt="Roo" width={200} height={200} className="rounded-xl" />
            </div>
            <div className="flex flex-col items-center">
                <div>
                    <p className="text-[#333332] text-[2rem] font-bold">Nguyễn Trang Đài</p>
                </div>
                <div className="flex flex-row gap-4">
                    <img src={Facebook} alt="Facebook" width={20} />
                    <img src={Instagram} alt="Instagram" width={20} />
                    <img src={Gmail} alt="Gmail" width={20} />
                    <img src={Spotify} alt="Spotify" width={20} />
                </div>
            </div>
        </div>
    )
}
export default SiderComponent
