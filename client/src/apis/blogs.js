import axios from 'axios'

const hotBlogs = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.get('/blog/hot-blogs')
            resolve(response.data)
        } catch (error) {
            reject(error)
        }
    })
}

export { hotBlogs }
