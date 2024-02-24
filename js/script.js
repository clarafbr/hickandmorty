const page = 4;
const baseUrl = 'https://rickandmortyapi.com/api'

const loadCharacter = async () => {
    const res = await fetch (`${baseUrl}/character?page=${page}`);
    const data = await res.json();
    const limitData = data.results.slice(0,9)
    return {results: limitData}
}

const loadLocation = async () => {
    const res = await fetch (`${baseUrl}/location`)
    return await res.json()
}

const loadEpisode = async () => {
    const res = await fetch (`${baseUrl}/episode`)
    return await res.json()
}

const loadAllWhithPromiseAll = async () => {
    const [character, location, episode] = await Promise.all([
        loadCharacter(),
        loadLocation(),
        loadEpisode()
    ])
    console.log(character)
    showCharacter(character.results)
    console.log("Location: ",location.results)
    console.log("Episode: ",episode.results)
}

loadAllWhithPromiseAll()

function showCharacter(characters){
    const characterContainer = document.getElementById("character-container");
    characters.map((character)=>{
        const divCharacter = document.createElement('div')
        divCharacter.innerHTML=`
            <img src="${character.image}" alt="Imagem do personagem"/>

            <article class="character-info">
                <h3>${character.name}</h3>
                <span>${character.status} - ${character.species}</span>
                
                <span class="location">Last known location:</span>
                <a href="${character.location.url}">${character.location.name}</a>

                <span class="origin">First seen in:</span>
                <a href="${character.origin.url}">${character.origin.name}</a>
            </article>
        `;
        divCharacter.classList.add('character-box')
        characterContainer.appendChild(divCharacter)
    })

}

//async: ela espera o resultado para executar a const, e vem acompanhado de um await
