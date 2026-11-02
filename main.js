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
      { word: "Yepá",      pronunciation: "ye-PÁ",      meaning: "Terra/Solo" },
      { word: "Akó",    pronunciation: "ar-KÓ",    meaning: "Água / Líquido" },
      { word: "Yokoá",      pronunciation: "ñor-ko-Ã",       meaning: "Estrelas" }, /* pág 231 ou 206*/
      { word: "Muhî-pu͂ u",     pronunciation: "mu-HĨ-Pu",     meaning: "Sol / Lua (Astro)" }, /*pág 237 */
      { word: "Akôro",   pronunciation: "ar-KÓ-ró",    meaning: "Chuva" },
      { word: "Mĩrĩ́kihi",   pronunciation: "mi-ri-KÊÃ",  meaning: "Passarinho" }
    ]
  },

  familia: {
    title: "Família",
    iconImg: "./sources/icon-familia.svg",
    words: [
      { word: "Pakó",   pronunciation: "par-KÓ",    meaning: "Mãe" }, /* pág 237*/
      { word: "Pakɨ",   pronunciation: "par-KV",    meaning: "Pai" },
      { word: "Wi'magɨ",  pronunciation: "wí-man-GV",  meaning: "Criança / Menino" }, /* ou trocar por caçula dɨ’sagí pág 220; A escrita fonética portuguesa brasileira do "u" em francês é representada como [v]. Essa transcrição é baseada nas normas do Alfabeto Fonético Internacional (AFI) */
      { word: "Ye͂kó",  pronunciation: "ñe-KÓ",  meaning: "Avó" },
      { word: "Mahsã", pronunciation: "mar-SÃ",  meaning: "Povo / Gente / Seres Humanos" },
      { word: "Mako",    pronunciation: "mar-KON",      meaning: "Filha" } /*pág 69 */
    ]
  },

  saudacoes: {
    title: "Conversa",
    iconImg: "./sources/icon-conversa.svg",
    words: [
      { word: "Ãyúti", pronunciation: "A-ñun-TÍ", meaning: "Tudo bem?" }, /*pág 240*/
      { word: "Ɨmîkoho", pronunciation: "V-mã-KÓ", meaning: "Dia" },/*pág 227 */
      { word: "Sãhâtya!", pronunciation: "SÃ-tiá", meaning: "Podem entrar!" },
      { word: "A’tiá", pronunciation: "Á-tiá", meaning: "Venha / Bem-vindo!" }, /* pág 9*/
      { word: "Ãyú", pronunciation: "A-ÑÚ", meaning: "Gratidão" },/*pág 10, mas a tradução é como "bom, bonito, bom de saúde"  */
      { word: "Ba'râtiã!", pronunciation: "báran-ti-Ã", meaning: "Vamos comer!" }
    ]
  },


  rituais: {
    title: "Rituais",
    iconImg: "./sources/icon-rituais.svg",
    words: [
      { word: "Bayâ",     pronunciation: "ba-IÁ",      meaning: "Canto de benzimento" }, /* pág 225 Basamo*/
      { word: "Bahsakewi'í",     pronunciation: "bar-SÁ-kê-uÍ",      meaning: "Casa de Cerimônias" },
      { word: "Pekâ-me'e",     pronunciation: "per-KÁ-me",      meaning: "Fogo" },
      { word: "Bahsesehé", pronunciation: "bar-sê-sé", meaning: "Benzimentos" }, /* Cura xamanística pág 70 benzer */
      { word: "Ya'sá",   pronunciation: "ña-SÃ",   meaning: "Maracá/ Chocalho" },
      { word: "Hori Huaya",  pronunciation: "ró-ri-HUÁ-ia", meaning: "Pintura corporal ancestral" }
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
