import React, { createContext, useState, useEffect } from 'react'
import * as apis from '../apis'

// Khởi tạo Context API
const ApiContext = createContext()

const Provider = ({ children }) => {
    const [blogData, setBlogData] = useState(null)
    const [searchText, setSearchText] = useState('')
    const [hotBlogs, setHotBlogs] = useState([])

    const fetchHotBlogs = async () => {
        const response = await apis.hotBlogs()
        setHotBlogs(response.data.data)
    }

    useEffect(() => {
        fetchHotBlogs()
    }, [])

    return (
        <ApiContext.Provider
            value={{
                hotBlogs,
            }}
        >
            {children}
        </ApiContext.Provider>
    )
}

export { ApiContext, Provider }
