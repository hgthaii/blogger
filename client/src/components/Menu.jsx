import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarDays, faTags, faFileLines, faComments } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { gmt7Time } from '../utils/convertTime'

const Menu = ({ data }) => {
    const LimitWords = ({ str, limit }) => {
        const words = str.split(' ') // Chia chuỗi thành các từ bằng khoảng trắng
        if (words.length <= limit) {
            return str // Nếu có đủ số từ hoặc ít hơn, không cần giới hạn nữa.
        } else {
            const truncatedWords = words.slice(0, limit) // Chọn số từ tối đa
            const truncatedStr = truncatedWords.join(' ') // Kết hợp các từ lại với nhau bằng khoảng trắng
            return truncatedStr + '...' // Thêm '...' vào cuối chuỗi đã giới hạn.
        }
    }
    return (
        <div className="my-1 mx-16">
            {data &&
                data.map((item, index) => {
                    return (
                        <Link to={`/${item.slug}`}>
                            <div key={index}>
                                <div>
                                    <div>
                                        <p className="text-[36px] leading-[1.3] text-title">
                                            {item.title || 'Không có tiêu đề'}
                                        </p>
                                    </div>
                                    <div className="mb-4 mt-2">
                                        <p className="text-[20px] leading-[1.3] txtOver text-text text-justify">
                                            {<LimitWords str={item.content} limit={66} /> || 'Không có nội dung'}
                                        </p>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="flex flex-row gap-10">
                                        <div className="flex flex-row items-center text-placeholder text-[1.4rem]">
                                            <FontAwesomeIcon icon={faUser} className="text-[1.6rem] pr-1" />
                                            <p>Thái đẹp trai</p>
                                        </div>
                                        <div className="flex flex-row items-center text-placeholder text-[1.4rem]">
                                            <FontAwesomeIcon icon={faCalendarDays} className="text-[1.6rem] pr-1" />
                                            <p>{gmt7Time}</p>
                                        </div>
                                        <div className="flex flex-row items-center text-placeholder text-[1.4rem]">
                                            <FontAwesomeIcon icon={faTags} className="text-[1.6rem] pr-1" />
                                            <p>{item.category[0].name}</p>
                                        </div>
                                        <div className="flex flex-row items-center text-placeholder text-[1.4rem]">
                                            <FontAwesomeIcon icon={faComments} className="text-[1.6rem] pr-1" />
                                            <p>5 phản hồi</p>
                                        </div>
                                        <div className="flex flex-row items-center text-placeholder text-[1.4rem]">
                                            <FontAwesomeIcon icon={faFileLines} className="text-[1.6rem] pr-1" />
                                            <p>{item.estimatedReadTime} phút đọc</p>
                                        </div>
                                    </div>
                                    <article className="my-8 border-b-[1px] w-full border-[#f0f0f0]" />
                                </div>
                            </div>
                        </Link>
                    )
                })}
        </div>
    )
}

export default Menu
