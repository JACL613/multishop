import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default function Register() {
    const navigate = useNavigate()
const handleSubmit = (e) => {
    e.preventDefault()

    let name = document.querySelector('#name').value
    let email = document.querySelector('#email').value
    let password = document.querySelector('#password').value

    let Users = JSON.parse(localStorage.getItem('users')) || []
    let isUserRegistered = Users.find(user => user.email === email)

    if(isUserRegistered) {
        Swal.fire({
            icon: 'error',
            title: 'Error de datos',
            text: 'El correo ya se encuentra en uso, usa otro diferente'
        })
        return
    }
    Users.push({name, email, password})
    localStorage.setItem('users' , JSON.stringify(Users))
    Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu registro se ha realizado con éxito'
    }).then(() => {
        navigate('/login')
    })
}
  return (
    
    
    <div>
        
      <section>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} id="signupForm">
        <span className='user'><User size={48} strokeWidth={3} /></span>
            
            <div className="input-group">
              <span ><Mail size={48} strokeWidth={3} /></span>
              <input type="email" placeholder="Ej: juanita@gmail.com" id="email" required autoFocus />
            </div>
            <div className="input-group">
              <span ><Lock size={48} strokeWidth={3} /></span>
              <input type="password" placeholder="" id="password" required />
            </div>
            <button type="submit" className="submit-button">Registrar</button>
        </form>
        <p>Ya tienes una cuenta? <Link to='/login'>Inicio</Link></p>
    </section>
    </div>
  )
}
