// variables
const carrito = document.getElementById('carrito')
const lista = document.getElementById('lista-cursos')
const listaCursos = document.querySelector('#lista-carrito tbody')
const vaciarCarrito = document.querySelector('#vaciar')

// listeners
cargarListeners()

function cargarListeners() {

    // dispara cuando agregamos
    lista.addEventListener('click', comprarCurso)

    // dispara cuando eliminamos
    carrito.addEventListener('click', eliminarCurso)

    // dispara al vaciar el carrito
    vaciarCarrito.addEventListener('click', vaciar)

    // al cargar debemos mostrar LS
    document.addEventListener('DOMContentLoaded', readLS)
}

// funciones
// add car
function comprarCurso(e) {

    e.preventDefault()
    if (e.target.classList.contains('boton')) {
        const curso = e.target.parentElement.parentElement
        readDataCurso(curso)
        alert('Curso agregado a el carrito')
    }
}

// leer data del curso
const readDataCurso = curso => {

    let infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio p').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertKar(infoCurso)
}

// mustra el curso en el carrito
const insertKar = curso => {

    const row = document.createElement('tr')
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}">
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="equis" data-id="${curso.id}">X</a>
        </td>
    `
    listaCursos.appendChild(row)
    insertLocalStorage(curso)
}

// elimina el curso en el carrito del DOM
function eliminarCurso(e) {

    e.preventDefault()

    let curso;
    let id

    if (e.target.classList.contains('equis')) {
        e.target.parentElement.parentElement.remove()
        curso = e.target.parentElement.parentElement
        id = curso.querySelector('a').getAttribute('data-id')
    }
    
    eliminarCursoLS(id)
}

// elimina todos los cursos del carrito en el DOM
function vaciar() {

    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild)
    }

    // vacias LS
    vaciarLS()
}

// insertamos en LS
const insertLocalStorage = curso => {

    // obtenemos el arreglo
    let cursos = obtenerLocalStorage()

    // agregar al arreglo
    cursos.push(curso)

    localStorage.setItem('cursos', JSON.stringify(cursos))
}

// leemos el LS y retornamos el arreglo
const obtenerLocalStorage = () => {

    let cursosLS
    // comprobamos que haya algo o no
    if (localStorage.getItem('cursos') === null) {
        cursosLS = []
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'))
    }

    return cursosLS
}

// leemos el LS y lo pintamos en el carrito
function readLS() {

    let cursosLS = obtenerLocalStorage()

    cursosLS.forEach((e) => {
        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${e.imagen}">
            </td>
            <td>${e.titulo}</td>
            <td>${e.precio}</td>
            <td>
                <a href="#" class="equis" data-id="${e.id}">X</a>
            </td>
        `
        listaCursos.appendChild(row)
    })
}

// elimina el curso por id en LS
const eliminarCursoLS = curso => {

    let cursosLS = obtenerLocalStorage()
    cursosLS.forEach((cursoLS, index) => {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1)
        }
    })

    localStorage.setItem('cursos', JSON.stringify(cursosLS))
}

// elimina todos los cursos de LS
const vaciarLS = () => {

    localStorage.clear()
}