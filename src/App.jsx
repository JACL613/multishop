import { Route, Routes } from 'react-router-dom'
import './App.css'
import Banner from './assets/components/Banner'
import FormContact from './assets/components/FormContact'
import Nav from './assets/components/Nav'
import img1 from './assets/images/desktop/img1.jpg'
import img2 from './assets/images/desktop/img2.jpg'
import img3 from './assets/images/desktop/img3.jpg'
import img2M from './assets/images/mobile/img2.jpg'
import img1M from './assets/images/mobile/img1.jpg'
import img3M from './assets/images/mobile/img3.jpg'
import GalleryProducts from './assets/components/GalleryProducts'
import Login from './assets/components/Login'
import Register from './assets/components/Register'
import Table from './assets/components/TableCarrito'
function App() {

  const desktop = [
    {
     src: img1,
     title: 'Bienvenido a Tech Gamer Store',
     description: 'Preparate para unirte al mundo gamer' 
    },
    {
      src: img2,
     title: 'Conectaté y se el mejor',
      description: 'Un mundo entero espera por ti' 
     },
     {
      src: img3,
     title: 'Productos de alta calidad',
      description: 'Y como nos gusta, al mejor precio' 
     },]
  const mobile = [
    {
     src: img1M,
     title: 'Bienvenido a Tech Gamer Store',
     description: 'Preparate para unirte al mundo gamer' 
    },
    {
      src: img2M,
     title: 'Conectaté y se el mejor',
      description: 'Un mundo entero espera por ti' 
     },
     {
      src: img3M,
     title: 'Productos de alta calidad',
      description: 'Y como nos gusta, al mejor precio' 
     },]
  return (
    <div className='flex-column justify-content-center main'>
      <Nav/>
      <Routes>
        <Route path='/' element={
          <Banner desktopImages={desktop} mobileImages={mobile}/>
        }/>
        <Route path='/productos' element={
          <>
          <GalleryProducts />
          </>
        }/>
        <Route path='/contacto' element={
          <FormContact />
        }/>
        <Route path='/login' element={
          <Login/>
        }/>
        <Route path='/register' element={
          <Register />
        } />

        <Route path='/carrito' element={
          <Table/>
        } />
      </Routes>
      
    </div>
  )
}

export default App
