var formulario = document.querySelector("form");

formulario.addEventListener("submit", function (e) {
  e.preventDefault(); // Para não atualizar a página

  let urlForm = "https://pokeapi.co/api/v2/pokemon/"; // URL da pesquisa

  let nome = document.getElementById("name"); // Valor do input name

  urlForm = urlForm + this.name.value; // Concatena a url com o inputname

  urlForm = urlForm.toLocaleLowerCase(); // Transforma em letras minúsculas

  let resposta = document.getElementById("content"); // id que vai entrar as informações sobre o Pokémon

  let imagem = document.getElementById("imgPokemon"); // id imgPokemon

  // Resposta em HTML
  let html = "";

  fetch(urlForm)
    .then((resposta) => resposta.json()) // tipo de dado que receberei
    .then(function (data) {
      console.log(data);
      html = "Nome: " + maiuscula(data.name) + "<br>";
      html = html + "Type: " + maiuscula(data.types[0].type.name);
      resposta.innerHTML = html;

      imagem.innerHTML =
        "<img src='" +
        data.sprites.front_default +
        "'><img src='" +
        data.sprites.back_default +
        "'>";
    })
    // Mostrar caso retorne algum erro
    .catch(function (err) {
      if (err == "SyntaxError: Unexpected token N in JSON at position 0") {
        html = "Pokémon não encontrado! 😢";
      } else {
        html = "Erro:" + err;
      }
      resposta.innerHTML = html;
    });
});

function maiuscula(val) {
  return val[0].toUpperCase() + val.substr(1); // Vai pegar o primeiro caracter da descrição do Pokémon e colocar em maiúscula e juntar com os outros caracteres minúsculos
}
