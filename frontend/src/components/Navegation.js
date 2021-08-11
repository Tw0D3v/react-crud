import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class navegation extends Component {
    render() {
        return (
           <div className="nav-bar">
               <Link className="titulo" to="/">App Note </Link>
               <Link className="links" to="/create">Crear Nota</Link>
               <Link className="links" to="/edit/:id">Editar Nota</Link>
               <Link className="links" to="/user">Crear Usuario</Link>
               <button className="buttom-responsive">|||</button>
           </div>
           
        )
    }

    
}



