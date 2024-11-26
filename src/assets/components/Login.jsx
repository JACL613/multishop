import { Link, useNavigate } from 'react-router-dom'
import '../styles/Forms.style.css'
import Swal from 'sweetalert2'
import { Lock, User } from 'lucide-react'
import { Mail } from 'lucide-react'
export default function Login() {
    const navigate = useNavigate()
const handleSubmit = (e) => {
    e.preventDefault()

    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    let Users = JSON.parse(localStorage.getItem('users')) || []
    let validUser = Users.find(user => user.email === email && user.password === password)

    if(!validUser){
        return Swal.fire({
            icon: 'error',
            title: 'Error de Datos',
            text: 'El usuario y/o contraseña son incorrectos'
        })
        
    }
    Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesion Exitoso',
        text: `Bienvenido ${validUser.name}`
    })
    localStorage.setItem('login_success' , true)
    window.dispatchEvent(new Event('storage'))

    navigate('/')}
  return (
   
    
    <div className="login-container">
        <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
     <div className="login-subcontainer">
     <div className="welcome-section">
        <h1>¡Bienvenido!</h1>
        
      </div>
    
      <div className="form-section">
      
        <div className="menu">
          <button>Inicio</button>
          <button>Registrar</button>
        </div>
        
        <form onSubmit={handleSubmit} id="loginForm">
        
        <div className='user'>
            <User size={48} strokeWidth={3} />
            </div>
            
          <div className="input-group">
            <span ><Mail size={32} strokeWidth={3} /></span>
            <input type="email" placeholder="Ej: juanita@gmail.com" id="email" required autoFocus />
          </div>
          <div className="input-group">
            <span ><Lock size={32} strokeWidth={3} /></span>
            <input type="password" placeholder="" id="password" required />
          </div>
          <p class="password"> <Link to='/register'>Olvidé mi contraseña</Link></p>
          <button type="submit" className="submit-button">Enviar</button>
          <div class="social">
          <div class="go"><i class="fab fa-google"></i>  Google</div>
          <div class="fb"><i class="fab fa-facebook"></i>  Facebook</div>
        </div>
        
        </form>
      </div>
     </div>
    </div>
  )
};



    // <div className="login-container">
    //     <div className="login-subcontainer" >
    //     <div class="welcome-text">
    //   Bienvenido!
    // </div>
    // <div className="form-section">
    //     <div className="menu">
    //       <button>Inicio</button>
    //       <button>Registrar</button>
    //     </div>
    
    //     <div className="login-box">
            
    //         </div>
            
    //         <div className='user'>
    //         <User size={48} strokeWidth={3} />
    //         </div>
    //         <form onSubmit={handleSubmit} id="loginForm">
    //             <div className="input-group">
    //                 <label htmlFor="email">E-mail</label>
    //                 <input type="email" placeholder="Ej: juanita@gmail.com" id="email" required autoFocus />
    //                 <div className="mail">
    //                 <Mail size={48} strokeWidth={3} />
    //                 </div>
    //             </div>
    //             <div className="input-group">
    //                 <label htmlFor="password">Contraseña</label>
    //                 <input type="password" placeholder="" id="password" required />
    //                <div className="pass">
    //                <Lock size={48} strokeWidth={3} />
    //                </div>
    //             </div>
    //             <p class="password"> <Link to='/register'>Olvidé mi contraseña</Link></p>
    //             <input type="submit" value="Ingresar" />
    //         </form>
    //     </div>
    //     </div>
        
    // </div>

