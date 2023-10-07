import React, { useState, useEffect, useRef } from 'react'

const TextOverflow = ({ text }) => {
    const [isOverflowing, setIsOverflowing] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        // Hàm kiểm tra sự tràn bộ
        const checkOverflow = () => {
            const container = containerRef.current
            if (container) {
                const lineHeight = document.createElement('div')
                lineHeight.style.visibility = 'hidden'
                lineHeight.style.fontSize = '2rem' // Điều chỉnh kích thước font chữ theo yêu cầu
                lineHeight.style.lineHeight = '1.75' // Điều chỉnh line-height theo yêu cầu
                lineHeight.innerHTML = 'A' // Một ký tự để đo chiều cao

                container.appendChild(lineHeight)

                const lineHeightHeight = lineHeight.clientHeight
                const containerHeight = container.clientHeight
                const textHeight = container.scrollHeight

                // Tính số dòng bằng cách chia chiều cao của văn bản cho chiều cao của mỗi dòng
                const numberOfLines = Math.floor(textHeight / lineHeightHeight)

                // Kiểm tra xem số dòng có vượt quá 4 không
                if (numberOfLines > 4) {
                    setIsOverflowing(true)
                } else {
                    setIsOverflowing(false)
                }

                // Loại bỏ div ẩn danh
                container.removeChild(lineHeight)
            }
        }

        // Gọi hàm kiểm tra sau khi component đã render
        checkOverflow()

        // Khi kích thước của nội dung thay đổi (VD: window thay đổi kích thước), kiểm tra lại tràn bộ
        window.addEventListener('resize', checkOverflow)

        // Cleanup listener khi component unmount
        return () => {
            window.removeEventListener('resize', checkOverflow)
        }
    }, [text])

    return (
        <div ref={containerRef} className={`${isOverflowing ? 'overflow' : ''}  txtOver `}>
            {text}
        </div>
    )
}

export default TextOverflow
