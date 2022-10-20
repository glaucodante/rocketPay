import "./css/index.css"
// biblioteca de máscara
import IMask from "imask"
//cc = cartão de crédito
// querySelector = busque pelo seletor
// nth-child(1) = está pegando o 1º g do html
// child = filho
// Alterando as cores do cartão de acordo com as propriedades abaixo
const ccbgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const ccbgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
// Pegando a logo
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

// Estrutura de dados para as cores do cartão

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"],
  }
  ccbgColor01.setAttribute("fill", colors[type][0])
  ccbgColor02.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
// função que ativa a funcionalidade de mudar as cores e logo
// setCardType("default")
globalThis.setCardType = setCardType
// # = seletor do ID
// para o CVC = security code
// duas formas de fazer uma com getElementById e o nome do id
// não colocar # quando utilizar o getElementById
// const securityCode = document.getElementById("security-code")
const securityCode = document.querySelector("#security-code")
// criando o padrão da máscara
const securityCodePattern = {
  mask: "0000",
}
const securityCodeMasked = IMask(securityCode, securityCodePattern)

// validade do cartão
// para tranformar o ano atual em dois digitos
// string(new Date().getFullYear()).slice(2)
const expirationDate = document.querySelector("#expiration-date")
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
}
const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

// criando máscara para os núumeros dos cartões
const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2}\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  // função do IMask
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })
    // console.log(foundMask)

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)

const addButton = document.querySelector("#add-card")
addButton.addEventListener("click", () => {
  alert("Cartão adicionado.")
})

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault() //não recarregue a página
})
// ID = é selecionado com #
// CLASS = é selecionado com .
// Alterando o nome na imagem do cartão
const cardHolder = document.querySelector("#card-holder")
cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  // textContent => outra forma
  ccHolder.innerText =
    cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

// on = mesma lógica do addEventListener = escutador de eventos
// on = escutador de eventos
securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value")
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on("accept", () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector(".cc-number")
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on("accept", () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccexpiration = document.querySelector(".cc-extra .value")
  ccexpiration.innerText = date.length === 0 ? "02/32" : date
}
