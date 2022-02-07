import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './pages/Home'
import ListPage from './pages/List'
import LocationPage from './pages/Location'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path=":province/:city/*" element={<LocationPage />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept()
}
