import { useState } from 'react'
import NavTabs from './NavTabs'
import { data } from '../utils/data'
import Card from './Card'

export default function GalleryProducts({products}) {
  const [value, setValue] = useState(products)
 if(!value) return null
  return (
    <>
      <div className="container py-5">
        <h2 className="text-center mb-5">Nuestros Productos</h2>
        <NavTabs setTab={e => setValue(e)} />
        <div className='gallery'>
          {
            value.map(data => <Card key={data.alt} id={data.id} url={data.image} title={data.title} text={data.description} precio={data.price} />)
          }
        </div>
      </div>
      <div className="container py-5 d-flex jusJSON.stringify(newProductos));fy-content-center">
      </div>
    </>
  )
}
