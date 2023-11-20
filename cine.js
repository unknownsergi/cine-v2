// Capturar elementos del dom

const contenidor = document.querySelector(".contenidor");
const seients = document.querySelectorAll(".fila .seient:not(.ocupat)");
const contador = document.getElementById("contador");
const total = document.getElementById("total");
const peliculaSelect = document.getElementById("pelicula");

let preuDelTicket = +peliculaSelect.value;

ompleUI();
// Funciones

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

function actualitzaSeleccioSeients() {
    const seientsSeleccionats = document.querySelectorAll(".fila .seient.seleccionat");

    // const seientsIndex = [...seientsSeleccionats].map((seient) => {
    //     return [...seients].indexOf(seient);
    // });

    const seientsIndex = [...seientsSeleccionats].map((seient) => [...seients].indexOf(seient));
    console.log(seientsIndex);

    localStorage.setItem("seientsSeleccionats", JSON.stringify(seientsIndex));
    const contadorSeientsSeleccionats = seientsSeleccionats.length;

    contador.innerHTML = contadorSeientsSeleccionats;
    total.innerHTML = contadorSeientsSeleccionats * preuDelTicket;
}

function ompleUI() {
    const seientsSeleccionats = JSON.parse(localStorage.getItem("seientsSeleccionats"));

    // Siempre comparar on NULL, porque si no CASCA (DEAD)
    if (seientsSeleccionats !== null && seientsSeleccionats.length > 0) {
        seients.forEach((seient, index) => {
            console.log("seient " + seient);
            console.log("index " + index);
            console.log("----");
            if (seientsSeleccionats.indexOf(index) > -1) {
                seient.classList.add("seleccionat");
            }
        });
    }

    const indexPeliculaSeleccionada = localStorage.getItem(selectedMovieIndex);
}

contenidor.addEventListener("click", (e) => {
    if (e.target.classList.contains("seient") && !e.target.classList.contains("ocupat")) {
        e.target.classList.toggle("seleccionat");
        actualitzaSeleccioSeients();
    }
});

peliculaSelect.addEventListener("change", (e) => {
    preuDelTicket = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);
});
