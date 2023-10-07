import { Route, Routes } from 'react-router-dom'
import { HomePage, DetailBlog, Login } from './pages'
import paths from './utils/paths'

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={`${paths.HOME}`} element={<HomePage />} />
                <Route path={`${paths.DETAIL_BLOG}`} element={<DetailBlog />} />
                <Route path={`${paths.LOGIN}`} element={<Login />} />
            </Routes>
        </div>
    )
}

export default App
