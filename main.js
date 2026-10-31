// =====================================================
// DADOS
//   word          -> a palavra em Tukano
//   pronunciation -> como se pronuncia (ex.: "ya-ê")
//   meaning       -> o significado em português
// Para adicionar mais palavras, copiar uma linha e colar no grupo desejado.
// =====================================================
const groups = {
  natureza: {
    title: "Natureza",
    iconImg: "./sources/icon-natureza.svg",
    words: [
      { word: "Yepá",      pronunciation: "yeh-PÁ",      meaning: "Terra/Solo" },
      { word: "Akó",    pronunciation: "ah-KÓ",    meaning: "Água / Líquido" },
      { word: "Ñokoá",      pronunciation: "ñoh-koh-Ã",       meaning: "Estrela" }, /* pág 231*/
      { word: "Muhî-pu͂ u",     pronunciation: "moo-hĩ-POO-oo",     meaning: "Sol / Lua (Astro)" }, /*pág 237 */
      { word: "Akôro",   pronunciation: "ah-KÔ-ro",    meaning: "Chuva" },
      { word: "Mĩrĩ́kihi",   pronunciation: "mee-ree-KEE-hee",  meaning: "Ave" }
    ]
  },

  familia: {
    title: "Família",
    iconImg: "./sources/icon-familia.svg",
    words: [
      { word: "Pakó",   pronunciation: "pah-KÓ",    meaning: "Mãe" }, /* pág 237*/
      { word: "Pakí",   pronunciation: "pah-KEE",    meaning: "Pai" },
      { word: "Wi'magɨ",  pronunciation: "wee-mah-GÜEE",  meaning: "Criança / Menino" }, /* ou trocar por caçula dɨ’sagí pág 220*/
      { word: "Ye͂kó",  pronunciation: "yeh-KÓ",  meaning: "Avó" },
      { word: "Mahsã", pronunciation: "mah-SÃ",  meaning: "Povo / Gente / Seres Humanos" },
      { word: "Makó",    pronunciation: "mah-KÓ",      meaning: "Filha" }
    ]
  },

  saudacoes: {
    title: "Conversa",
    iconImg: "./sources/icon-conversa.svg",
    words: [
      { word: "Neé! / Sôo!",             pronunciation: "ô-la",               meaning: "Olá" }, /*pág 240*/
      { word: "Ɨmîkoho",      pronunciation: "û-MÎ-ko-hô",      meaning: "Dia" },/*pág 227 */
      { word: "Sãhâya!",    pronunciation: "sã-HÂ-yah",   meaning: "Entre! / Pode entrar" },
      { word: "Pâtisehe",          pronunciation: "pah-TEE-seh-heh",           meaning: "Não" },
      { word: "Ãyuró",      pronunciation: "ã-yoo-RÓ",       meaning: "Muito bom / Obrigado" },
      { word: "Ba'âya!",       pronunciation: "bah-AH-yah",      meaning: "Coma! / Vamos comer" }
    ]
  },

  rituais: {
    title: "Rituais",
    iconImg: "./sources/icon-rituais.svg",
    words: [
      { word: "Basâ",     pronunciation: "bah-SÂ",      meaning: "Dança / Canto ritual" }, /* pág 225 Basamo*/
      { word: "Bahsakewi'í",     pronunciation: "bah-sah-keh-wee-EE",      meaning: "Casa de Cerimônias" },
      { word: "Pekâ-me'e",     pronunciation: "peh-KÂ-meh-eh",      meaning: "Fogo" },
      { word: "Baseé", pronunciation: "bah-SEH-eh", meaning: "Benzimento" }, /* Cura xamanística */
      { word: "Ya'sá",   pronunciation: "yah-SÁ",   meaning: "Maracá/ Chocalho" },
      { word: "Sõ'ô",  pronunciation: "sõ-Ô", meaning: "Pintura corporal" }
    ]
  }
};

// =====================================================
// VARIÁVEIS
// =====================================================
const screen1 = document.querySelector(".screen1")
const screen2 = document.querySelector(".screen2")
const groupButtons = document.querySelector("#groupButtons")
const cardsContainer = document.querySelector("#cards")
const groupTitle = document.querySelector("#groupTitle")
const hint = document.querySelector("#hint")
const btnShuffle = document.querySelector("#btnShuffle")
const btnBack = document.querySelector("#btnBack")

let currentGroup = null

// =====================================================
// EVENTOS
// =====================================================
btnShuffle.addEventListener('click', shuffleCards)
btnBack.addEventListener('click', backToGroups)

// =====================================================
// FUNÇÕES AUXILIARES
// =====================================================
function toggleScreen() {
  screen1.classList.toggle("hide")
  screen2.classList.toggle("hide")
}

function shuffle(array) {
  // Fisher-Yates: embaralha uma cópia do array
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

// =====================================================
// FUNÇÕES PRINCIPAIS
// =====================================================
function createGroupButtons() {
  Object.keys(groups).forEach(key => {
    const group = groups[key]
    const btn = document.createElement("button")
    btn.className = "group-btn"

    const iconHTML = group.iconImg
      ? `<img class="icon-img" src="${group.iconImg}" alt="Ilustração do grupo ${group.title}">`
      : `<span class="icon">${group.icon}</span>`

    btn.innerHTML = `${iconHTML}${group.title}`
    btn.addEventListener('click', () => openGroup(key))
    groupButtons.appendChild(btn)
  })
}

function openGroup(key) {
  currentGroup = key
  groupTitle.innerText = groups[key].title
  renderCards()
  toggleScreen()
}

function renderCards() {
  cardsContainer.innerHTML = ""
  const words = shuffle(groups[currentGroup].words)

  words.forEach(item => {
    const card = document.createElement("button")
    card.className = "card"
    card.setAttribute("aria-label", `Cartão: ${item.word}. Toque para ver o significado.`)

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <span class="word">${item.word}</span>
          <span class="pronunciation">/ ${item.pronunciation} /</span>
        </div>
        <div class="card-face card-back">
          <span class="label">Significa:</span>
          <span class="meaning">${item.meaning}</span>
        </div>
      </div>
    `

    card.addEventListener('click', () => flipCard(card))
    cardsContainer.appendChild(card)
  })

  hint.innerText = "Toque em um cartão para ver o significado."
}

function flipCard(card) {
  card.classList.toggle("flipped")

  // Quando todos os cartões foram virados, mostra uma mensagem
  const total = cardsContainer.querySelectorAll(".card").length
  const flipped = cardsContainer.querySelectorAll(".card.flipped").length

  if (flipped === total) {
    hint.innerText = "Parabéns! Você descobriu todas as palavras! Que tal embaralhar e tentar lembrar?"
  } else {
    hint.innerText = "Toque em um cartão para ver o significado."
  }
}

function shuffleCards() {
  renderCards()
}

function backToGroups() {
  toggleScreen()
}

// =====================================================
// INÍCIO
// =====================================================
createGroupButtons()
