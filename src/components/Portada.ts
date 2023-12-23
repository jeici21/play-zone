import $ from 'jquery'
import { proyectos } from '../data/proyectos'
import styles from '../styles/Portada.module.css'

const Portada = () => {
  $('#app').append(/*html*/`
    <div class="container-fluid text-bg-dark text-center">
      <div class="col-md-6 offset-md-3 py-5">
        <h1 class=${styles.titulo}>¡Bienvenido!</h1>
        <h5 class="pt-4">Esta es mi zona de juegos, en donde reúno proyectos pequeños para mostrarlos al mundo y
          dejarlos a su disposición para que puedan entretenerse un poco con ellos. ¡Espero que estos
          juegos te entretengan por un rato!</h5>
      </div>
      <div class="row justify-content-center pb-5" id="proyectos"></div>
    </div>
  `)
  $.each(proyectos, (_, proyecto) => {
    $('#proyectos').append(/*html*/`
      <div class="col-md-4 g-3">
        <img src=${proyecto.img} alt="Imagen del proyecto" class="w-100 rounded-3 ${styles.proyectoImg}">
        <h4>${proyecto.nombre}</h4>
        <a href=${proyecto.url} class="btn btn-secondary">Jugar</a>
      </div>
    `)
  })
}

export default Portada