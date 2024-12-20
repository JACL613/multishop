import { useState, useEffect } from 'react';

import Swal from 'sweetalert2'; // Importa SweetAlert2
import Card from './Card';
import iconoTesoro from '../../assets/images/tesoro.png';

export default function GalleryProducts() {
  const [value, setValue] = useState([]); // Productos filtrados a mostrar
  const [allProducts, setAllProducts] = useState([]); // Todos los productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const [search, setSearch] = useState(''); // Estado del input de búsqueda
  const [activeFilter, setActiveFilter] = useState('Todos'); // Filtro activo

  const [hiddenTreasures, setHiddenTreasures] = useState([]); // Tesoros ocultos
  const [foundTreasures, setFoundTreasures] = useState(0); // Tesoros encontrados
  const treasuresToFind = 7; // Número total de tesoros a encontrar
  const [isGameActive, setIsGameActive] = useState(false); // Indica si el juego está activo
  const [timeLeft, setTimeLeft] = useState(0); // Tiempo restante en segundos

  useEffect(() => {
    const apiURL = 'https://multishopapi.onrender.com/api/productos';

    const fetchProducts = async () => {
      try {
        const response = await fetch(apiURL);
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        const result = await response.json();
        setAllProducts(result.data); // Guardar todos los productos desde la API
        setValue(result.data); // Mostrar todos los productos inicialmente
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Terminar la carga
      }
    };

    fetchProducts();
  }, []);
  const handleTreasureClick = (productId) => {
    if (hiddenTreasures.includes(productId)) {
      setFoundTreasures((prev) => {
        const newCount = prev + 1;
        if (newCount === treasuresToFind && timeLeft > 0) {
          // Mostrar alerta con el código promocional
          Swal.fire({
            title: '¡Felicidades!',
            html: `
              <p>¡Has encontrado todos los tesoros y ganado un cupón!</p>
              <p><strong>Código: <span id="couponCode">TR02024</span></strong></p>
              <button id="copyButton" class="swal2-confirm swal2-styled" style="background-color: #3085d6; color: white;">
                Copiar código
              </button>
            `,
            icon: 'success',
            showConfirmButton: false,
          });
  
          // Agregar funcionalidad al botón de copiar
          setTimeout(() => {
            const copyButton = document.getElementById('copyButton');
            const couponCode = document.getElementById('couponCode').innerText;
  
            copyButton.addEventListener('click', () => {
              navigator.clipboard.writeText(couponCode).then(() => {
                Swal.fire({
                  title: '¡Copiado!',
                  text: 'El código ha sido copiado al portapapeles.',
                  icon: 'success',
                  timer: 2000,
                  showConfirmButton: false,
                });
              });
            });
          }, 100);
  
          // Reiniciar el estado del juego
          setIsGameActive(false);
          setHiddenTreasures([]); // Limpiar los tesoros ocultos
          setTimeLeft(0); // Finalizar el tiempo
          setFoundTreasures(0); // Reiniciar contador de tesoros
        }
        return newCount;
      });
  
      // Eliminar el tesoro encontrado de la lista de tesoros ocultos
      setHiddenTreasures(hiddenTreasures.filter((id) => id !== productId));
    }
  };
  
  const startGame = () => {
    const getRandomItems = (arr, count) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const treasures = getRandomItems(value, treasuresToFind).map((product) => product._id);
    setHiddenTreasures(treasures);
    setIsGameActive(true);
    setTimeLeft(30);
    setFoundTreasures(0);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filteredProducts = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setValue(filteredProducts);
  };

  const handleFilterChange = (category) => {
    setActiveFilter(category);

    if (category === 'Todos') {
      setValue(allProducts); // Mostrar todos los productos si selecciona "Todos"
    } else {
      const filteredProducts = allProducts.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
      setValue(filteredProducts);
    }
  };

  if (loading) return <p className="text-center">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger">Error: {error}</p>;

  return (
    <>
      <div className="container py-5">
        <h2 className="text-center mb-5">Nuestros Productos</h2>

        {/* Input de búsqueda */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="form-control"
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Filtros */}
        <div className="filters d-flex justify-content-center mb-4">
          {['Todos', 'Ropa', 'Accesorio', 'Maquillaje', 'Hogar', 'Tecnología'].map((filter) => (
            <button
              key={filter}
              className={`btn mx-2 ${activeFilter === filter ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleFilterChange(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Juego de búsqueda del tesoro */}
        <p className="text-center">
          Encuentra los {treasuresToFind} tesoros ocultos entre los productos y gana puntos.
        </p>
        <p className="text-center">
          Tesoros encontrados: {foundTreasures}/{treasuresToFind}
        </p>

        {!isGameActive && (
          <div className="text-center mb-4">
            <button className="btn btn-primary" onClick={startGame}>
              ¡Iniciar Búsqueda del Tesoro!
            </button>
          </div>
        )}

        {isGameActive && (
          <div className="text-center mb-4">
            <h3>Tiempo restante: {timeLeft} segundos</h3>
          </div>
        )}

        {/* Galería de productos */}
        <div className="gallery">
          {value.map((product) => (
            <div
              key={product._id}
              onClick={() => handleTreasureClick(product._id)}
              style={{ position: 'relative' }}
            >
              <Card
                id={product._id}
                url={product.image}
                title={product.title}
                text={product.description}
                precio={product.price}
              />
              {isGameActive && hiddenTreasures.includes(product._id) && (
                <img
                  src={iconoTesoro}
                  alt="Tesoro oculto"
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '50px',
                    cursor: 'pointer',
                  }}
                  title="¡Haz clic para reclamar el tesoro!"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
