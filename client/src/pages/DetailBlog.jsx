import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { FooterComponent } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendarDays, faTags, faFileLines, faComments } from '@fortawesome/free-solid-svg-icons'
import { gmt7Time } from '../utils/convertTime'
import { SearchOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ApiContext } from '../components/ApiContext'

function DetailBlog() {
    const { t } = useTranslation()
    const { slug } = useParams()
    const [blogData, setBlogData] = useState(null)
    const [searchText, setSearchText] = useState('')
    const { hotBlogs } = useContext(ApiContext)

    useEffect(() => {
        const fetchData = async () => {
            // Gọi API để lấy nội dung bài blog dựa trên slug
            await axios
                .get(`${process.env.REACT_APP_API_URL}/blog/get/detail/${slug}`)
                .then((response) => {
                    // Xử lý dữ liệu từ API
                    const data = response.data
                    console.log(data)
                    setBlogData(data)
                })
                .catch((error) => {
                    console.error('Error fetching blog data:', error)
                })
        }
        fetchData()
    }, [slug])

    // const incrementView = async () => {
    //     try {
    //         await axios
    //             .get(`${process.env.REACT_APP_API_URL}/blog/increment-view/${slug}`)
    //             .then((response) => {
    //                 // Xử lý dữ liệu từ API
    //                 const viewCount = response.data
    //                 console.log(viewCount)
    //                 setBlogData((data) => ({ ...data, views: viewCount }))
    //             })
    //             .catch((error) => {
    //                 console.error('Error fetching blog data:', error)
    //             })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleSearch = (value) => {
        console.log('Đã tìm kiếm:', value)
        // Thực hiện tìm kiếm hoặc các xử lý khác ở đây
    }

    return (
        <div>
            {blogData ? (
                <div className="mx-[6rem]">
                    <div className="container flex flex-row mt-4 mb-2">
                        <div className="w-3/4 bg-gray-200 px-16 pt-1 pb-4">
                            <div>
                                <h1 className="text-[36px] leading-[1.3] text-title">
                                    {blogData.title || 'Không có tiêu đề'}
                                </h1>
                                <div className="mb-4">
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
                                            {/* <p>{blogData.category[0].name}</p> */}
                                        </div>
                                        <div className="flex flex-row items-center text-placeholder text-[1.4rem]">
                                            <FontAwesomeIcon icon={faComments} className="text-[1.6rem] pr-1" />
                                            <p>5 phản hồi</p>
                                        </div>
                                        <div className="flex flex-row items-center text-placeholder text-[1.4rem]">
                                            <FontAwesomeIcon icon={faFileLines} className="text-[1.6rem] pr-1" />
                                            <p>{blogData.estimatedReadTime} phút đọc</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4 mt-2">
                                <p className="text-[20px] leading-[1.3] text-text text-justify">{blogData.content}</p>
                            </div>
                        </div>

                        <div className="w-1/4 flex items-center flex-col pl-6">
                            <div className="">
                                <div className="my-10">
                                    <div className="relative w-[200px]">
                                        <p className="text-[20px] leading-[1.3] text-title font-bold">{t('search')}</p>
                                        <input
                                            type="text"
                                            placeholder={t('placeholder_search')}
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                            className="outline-none w-full h-[30px] pl-2 rounded-xl border-[1px] border-placeholder text-[14px] my-2"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleSearch}
                                            className="bg-primary h-full items-center justify-center rounded-xl text-white px-[10px] py-[4px] text-[12px] hover:opacity-90 active:bg-primary"
                                        >
                                            {t('search')}
                                            {/* <SearchOutlined className="text- text-[20px]" /> */}
                                        </button>
                                    </div>
                                </div>
                                {/* <div
                                    className="fb-page"
                                    data-href="https://www.facebook.com/trangcuatrangdai"
                                    data-tabs="timeline"
                                    data-width="200"
                                    data-height="70"
                                    data-small-header="false"
                                    data-adapt-container-width="true"
                                    data-hide-cover="false"
                                    data-show-facepile="true"
                                >
                                    <blockquote
                                        cite="https://www.facebook.com/trangcuatrangdai"
                                        className="fb-xfbml-parse-ignore"
                                    >
                                        <Link to="https://www.facebook.com/trangcuatrangdai">Trangg</Link>
                                    </blockquote>
                                </div> */}

                                <div className="">
                                    <div>
                                        <p className="text-[20px] leading-[1.3] text-title font-bold">
                                            {t('many_view')}
                                        </p>
                                    </div>
                                    <div>
                                        {hotBlogs && hotBlogs.length > 0 ? (
                                            hotBlogs.map((item, index) => {
                                                return (
                                                    <Link to={`/${item.slug}`} key={index}>
                                                        <div>
                                                            <p className="text-[16px] leading-[1.3] text-link hover:underline hover:text-link-hover break-words my-2">
                                                                {item.title || 'Không có tiêu đề'}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                )
                                            })
                                        ) : (
                                            <p>Loading...</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <FooterComponent />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default DetailBlog
