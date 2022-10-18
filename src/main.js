import "./css/index.css"
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
setCardType("mastercard")
// globalThis.setCardType = setCardType
