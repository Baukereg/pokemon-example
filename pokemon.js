// Local filters.
let search = ""
let typeFilters = []

// Derived data.
const allTypes = pokedex.reduce((allTypes, entry) => {
  entry.type.forEach((type) => {
    if (!allTypes.includes(type)) {
      allTypes.push(type)
    }
  })
  return allTypes
}, []).sort()

const sortByName = function(a, b) {
  return a.name.english.localeCompare(b.name.english)
}

const updateList = function() {
  // Copy pokedex.
  let pokemon = [...pokedex]

  // Search.
  if (search) {
    pokemon = pokemon.filter((entry) => entry.name.english.toLowerCase().includes(search))
  }

  // Filter on types.
  if (typeFilters.length > 0) {
    pokemon = pokemon.filter((entry) => entry.type.some((type) => typeFilters.includes(type)))
  }

  // Sort.
  pokemon.sort(sortByName)

  document.getElementById("pokemon-cards-count").innerText = pokemon.length

  // Render list in DOM.
  document.getElementById("pokemon-cards").innerHTML = pokemon.reduce((output, entry) => {
    output += `<article class="pokemon-card">
      <h3>${entry.name.english}</h3>
      <ul class="types">
        ${entry.type.map((type) => `<li>${type}</li>`).join('')}
      </ul>
      <dl class="base">
        <dt>HP</dt> <dd>${entry.base.HP}</dd>
        <dt>Attack</dt> <dd>${entry.base.Attack}</dd>
        <dt>Defense</dt> <dd>${entry.base.Defense}</dd>
        <dt>Sp. Attack</dt> <dd>${entry.base['Sp. Attack']}</dd>
        <dt>Sp. Defense</dt> <dd>${entry.base['Sp. Defense']}</dd>
        <dt>Speed</dt> <dd>${entry.base.Speed}</dd>
      </dl>
    </article>`
    return output
  }, "")
}

// Set filters form.
document.getElementById("filter-types").innerHTML = allTypes.reduce((typeFilters, type) => {
  const elementId = `filter-type-${type}`
  typeFilters += `
    <input type="checkbox" id="${elementId}" name="filter-type" data-type="${type}" />
    <label for="${elementId}">${type}</label>
  `
  return typeFilters
}, "")

// Bind filters form.
document.getElementById("filters").onsubmit = (e) => {
  e.preventDefault()
  search = document.getElementById("input-search").value.toLowerCase().trim()
  typeFilters = [...document.querySelectorAll("input[name=filter-type]:checked")].map((checkbox) => checkbox.getAttribute("data-type"))
  updateList()
}

updateList()