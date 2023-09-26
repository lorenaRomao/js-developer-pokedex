
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')


const limit = 6;
let offset = 0;
const maxRecords = 151;

function pokemonInfo(pokemonData) {

    var modal = document.getElementById("myModal");
    var modalBody = modal.querySelector(".modal-body");
    var span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }

    modal.style.display = "block";

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    function createListWithSeparator1(array, separator) {
        return array.split(',').map(item => `<li class="item">${item}</li>`).join(separator);
    }

    function createListWithSeparator2(array, separator) {
        return array.split(',').map(item => `<li class="order">${item}</li>`).join(separator);
    }

    var pokemon = JSON.parse(pokemonData);
    var abilitiesList = createListWithSeparator1(pokemon.abilities[0], '');
    var typesList = createListWithSeparator1(pokemon.types[0], '');
    var statsList = createListWithSeparator2(pokemon.stats[0], '');
   

    modalBody.innerHTML = `
        
        <section class="headerBox">
            <img src="${pokemon.photo}" alt="${pokemon.name}">
                   
            <span class="numero">#${pokemon.numero}</span>
            <span class="name">${pokemon.name}</span>
               
                <div class="detail">
                    <ol class="types">
                        ${typesList}
                    </ol>
                </div>

                <h3 class="abilitiesBox"> --- Abilities ---
                ${abilitiesList}
                </h3> 
                
                <h3 class="statsBox">--- Stats ---
                ${statsList}
                </h3>
            
           
       
    `;
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-name='{"name": "${pokemon.name}", "numero": "${pokemon.numero}", 
        "stats": ["${pokemon.stats}"], "types": ["${pokemon.types}"], 
        "abilities": ["${pokemon.abilities}"], "photo": "${pokemon.photo}"}' onclick="pokemonInfo(this.dataset.name)">
        
            <span class="numero">#${pokemon.numero}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})


