import { proyectos } from '../data/proyectos'
import styles from '../styles/Portada.module.css'
import { Snake } from './Snake'

const Portada = () => {
  $('#app').append(/*html*/`
    <div class="container-fluid bg-black text-white text-center position-relative">
      <div class="position-absolute rounded-circle bg-dark z-0 d-none d-md-block ${styles.circle}"></div>
      <div class="col-md-6 offset-md-3 py-5 position-relative z-1">
        <h1 class=${styles.titulo}>¡Bienvenido!</h1>
        <h5 class="pt-4">Esta es mi zona de juegos, en donde reúno proyectos pequeños para mostrarlos al 
          mundo y dejarlos a su disposición para que puedan entretenerse un poco con ellos. ¡Espero que 
          estos juegos te entretengan por un buen rato!</h5>
      </div>
      <div class="row justify-content-center pb-5" id="proyectos"></div>
    </div>
    ${Snake}
  `)
  $.each(proyectos, (_, proyecto) => {
    $('#proyectos').append(/*html*/`
      <div class="col-md-4 g-3">
        <img src=${proyecto.img} alt="Imagen del proyecto" class="w-100 rounded-3 ${styles.proyectoImg}">
        <h4>${proyecto.nombre}</h4>
        <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#${proyecto.id}">Jugar</button>
      </div>
    `)
  })
}

export default Portada