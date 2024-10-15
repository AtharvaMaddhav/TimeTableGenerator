import { useState } from 'react'
import './App.css'
import Footer from './components/Footer'
import Form from './components/Form'
import Header from './components/Header'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Result from './components/Result'

function App() {
  const [data, setData] = useState([]);
  return (
    <BrowserRouter>
      <div className='flex flex-col grow'>
      <Routes>
        <Route path='/' element={<Form data={data} setData={setData} />} /> 
        <Route path='/result' element={<Result data={data} />} /> 
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
