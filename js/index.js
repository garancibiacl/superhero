

     //==================== Funciones Jquery ====================

$(document).ready(function () { // Funcion que Inicializa documuento una vez que este cargado los elementos
  function getInfo() { // Se crea funcion para capturar  el valor del input 
    let search = $("#search").val(); //  Id search se guarda en una variable
    let expresion = /^[0-9]+$/; // Expresion regular que se valida solamente numero

    if (expresion.test(search)) { // Peticion de la APi
      getData(search);
    } else {
      alert("Ingrese solo numeros");
      $(".result").hide(); // Se oculta resultados para la validacion de solamente numeros
    }
  }

    //==================== Funcion con Ajax hace referencia la peticion ====================

  function getData(id) { // Se crea funcion 
    $.ajax({ // Se crea peticion con ajax y se pasa objetos
      type: "GET", // tipo de peticion type
      dataType: "json",
      url: `https://www.superheroapi.com/api.php/3525635500807579/${id}`, // Url de la peticion y se le pasa id
      success(data) { // Se crea funcion success  y se pasa una respuesta data
        if (data.response === "error") {// Data.response es para validar
          $(".result").hide(); // Funcion que oculta resultados en caso de error
          alert("El ID no se encuentra.");
          return;// Se corta con un return
        }
        showData(data);// se llama funcion data para el contenido
        showChart(data);// se llama funcion data para el grafico
      },
      error(error) {
        console.log(error);
        $(".result").hide();// Se oculta resultados
        alert("Error al traer los datos.");
      }
    });
  }

  //==================== Se crea funcion data de la Api para traer el contenido nombre y descripcion ====================
  function showData(data) { 
    $("#name").html(data.name);
    $("#connection").html(data.connections["group-affiliation"]);
    $("#published").html(data.biography.publisher);
    $("#ocupation").html(data.work.occupation);
    $("#firstin").html(data.biography["first-appearance"]);
    $("#height").html(data.appearance.height.join(" - ")); // Se Crea metodo join para crea un arreglo en string -
    $("#weight").html(data.appearance.weight.join(" - ")); // Se Crea metodo join para crea un arreglo en string -
    $("#allies").html(data.biography.aliases.join(" ")); // Se Crea metodo join para creaun arreglo en string -
    $("#avatar").attr("src", data.image.url); // Se crea funcion jquery attr(setear atributos) trae valor deimagen por url 
    $(".result").show(); // Se Muestran  resultados
  }

    //==================== Se crea funcion para llamar al Grafico Canvas ====================
  function showChart(data) {
    var chart = new CanvasJS.Chart("chart", { // Se pasa la id de conenedor chart y recibe un objetos
      title: {
        text: `Estadísticas de poder para ${data.name}` // tipo texto se usa interpolacion para llamar al nombre super hero
      },
      legend: {
        maxWidth: 350,
        itemWidth: 120
      },
      data: [
        {
          type: "pie",
          showInLegend: true,
          legendText: "{indexLabel}",
          dataPoints: [
            { y: data.powerstats.intelligence, indexLabel: "Inteligencia" },// se crea valor para inteligencia
            { y: data.powerstats.strength, indexLabel: "Fuerza" },// se crea valor para fuerza
            { y: data.powerstats.speed, indexLabel: "Velocidad" },// se crea valor para velocidad
            { y: data.powerstats.durability, indexLabel: "Durabilidad" },//se crea valor para durabilidad
            { y: data.powerstats.power, indexLabel: "Poder" },//se crea valor para poder
            { y: data.powerstats.combat, indexLabel: "Combate" }//se crea valor para combate
          ]
        }
      ]
    });
    chart.render(); // se carga funcion para cargar grafico canvas
  }

  $("form").on("submit", function (event) { // Se Envia form
    event.preventDefault();

    getInfo(); // Se llama la función submit
  });
});
