const materias = [
  // PRIMER AÑO - Anuales (sin previaturas)
  { nombre: "Microbiología General", anio: 1, semestre: "anual", previaturas: [] },
  { nombre: "Fisicoquímica", anio: 1, semestre: "anual", previaturas: [] },
  { nombre: "Química Analítica 1", anio: 1, semestre: "anual", previaturas: [] },
  { nombre: "Int. Química Industrial", anio: 1, semestre: "anual", previaturas: [] },
  { nombre: "Inglés 1", anio: 1, semestre: "anual", previaturas: [] },

  // PRIMER AÑO - Primer semestre (sin previaturas)
  { nombre: "Economía", anio: 1, semestre: 1, previaturas: [] },
  { nombre: "Estadística", anio: 1, semestre: 1, previaturas: [] },

  // PRIMER AÑO - Segundo semestre
  { nombre: "Legislación Laboral", anio: 1, semestre: 2, previaturas: [] },
  { nombre: "Control de Calidad", anio: 1, semestre: 2, previaturas: ["Estadística"] },
  { nombre: "Análisis de Aguas (optativa)", anio: 1, semestre: 2, previaturas: [] },

  // SEGUNDO AÑO - Anuales
  { nombre: "Análisis Microbiológico", anio: 2, semestre: "anual", previaturas: ["Microbiología General", "Química Analítica 1"] },
  { nombre: "Química Analítica 2", anio: 2, semestre: "anual", previaturas: ["Química Analítica 1", "Estadística"] },
  { nombre: "Gestión Ambiental y Ecología", anio: 2, semestre: "anual", previaturas: ["Int. Química Industrial"] },
  { nombre: "Inglés 2", anio: 2, semestre: "anual", previaturas: ["Inglés 1"] },

  // SEGUNDO AÑO - Primer semestre
  { nombre: "Gestión de Calidad", anio: 2, semestre: 1, previaturas: ["Control de Calidad"] },
  { nombre: "Seguridad Industrial", anio: 2, semestre: 1, previaturas: ["Int. Química Industrial"] },
  { nombre: "Int. Industria Farmacéutica (optativa)", anio: 2, semestre: 1, previaturas: ["Microbiología General", "Int. Química Industrial"] },

  // SEGUNDO AÑO - Segundo semestre
  { nombre: "Higiene Industrial", anio: 2, semestre: 2, previaturas: ["Int. Química Industrial"] },

  // TERCER AÑO - Primer semestre
  { nombre: "Control de Calidad en Industria Farmacéutica (optativa)", anio: 3, semestre: 1, previaturas: ["Química Analítica 1", "Química Analítica 2", "Control de Calidad", "Int. Industria Farmacéutica (optativa)"] },

  // TERCER AÑO - Segundo semestre
  { nombre: "Pasantía", anio: 3, semestre: 2, previaturas: [] },
];

let aprobadas = [];

function crearMalla() {
  const container = document.getElementById("malla-container");

  // Limpiar contenido para recargar
  container.innerHTML = "";

  // Agrupar por año y semestre para mostrar
  for (let anio = 1; anio <= 3; anio++) {
    const tituloAnio = document.createElement("div");
    tituloAnio.className = "año";
    tituloAnio.textContent = `Año ${anio}`;
    container.appendChild(tituloAnio);

    // Mostrar materias anuales
    materias
      .filter(m => m.anio === anio && m.semestre === "anual")
      .forEach(materia => {
        const div = crearDivMateria(materia);
        container.appendChild(div);
      });

    // Mostrar materias primer semestre
    const materiasPrimerSem = materias.filter(m => m.anio === anio && m.semestre === 1);
    if (materiasPrimerSem.length > 0) {
      const tituloSem1 = document.createElement("div");
      tituloSem1.className = "semestre";
      tituloSem1.textContent = "Primer Semestre";
      container.appendChild(tituloSem1);

      materiasPrimerSem.forEach(materia => {
        const div = crearDivMateria(materia);
        container.appendChild(div);
      });
    }

    // Mostrar materias segundo semestre
    const materiasSegundoSem = materias.filter(m => m.anio === anio && m.semestre === 2);
    if (materiasSegundoSem.length > 0) {
      const tituloSem2 = document.createElement("div");
      tituloSem2.className = "semestre";
      tituloSem2.textContent = "Segundo Semestre";
      container.appendChild(tituloSem2);

      materiasSegundoSem.forEach(materia => {
        const div = crearDivMateria(materia);
        container.appendChild(div);
      });
    }
  }

  actualizarEstado();
}

function crearDivMateria(materia) {
  const div = document.createElement("div");
  div.className = "materia bloqueada";
  div.textContent = materia.nombre;
  div.onclick = () => toggleMateria(materia.nombre, div);
  return div;
}

function toggleMateria(nombre, div) {
  if (!div.classList.contains("desbloqueada")) return;

  if (aprobadas.includes(nombre)) {
    aprobadas = aprobadas.filter(m => m !== nombre);
  } else {
    aprobadas.push(nombre);
  }

  actualizarEstado();
}

function actualizarEstado() {
  const bloques = document.getElementsByClassName("materia");

  Array.from(bloques).forEach(b => {
    const nombre = b.textContent;
    const mat = materias.find(m => m.nombre === nombre);

    // Materias desbloqueadas si todas sus previaturas están aprobadas
    const desbloqueada = mat.previaturas.every(p => aprobadas.includes(p));
    b.className = "materia " + (desbloqueada ? "desbloqueada" : "bloqueada");

    if (aprobadas.includes(nombre)) {
      b.style.backgroundColor = "#c8e6c9"; // verde claro para aprobadas
    } else {
      b.style.backgroundColor = "";
    }
  });
}

crearMalla();
