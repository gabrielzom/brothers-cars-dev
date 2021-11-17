//Destacando a nav Catalogo

// VARIÁVEIS DE CONTROLE 

const activeNav = document.querySelectorAll(".nav-link")[1];
activeNav.style.filter = " brightness(100%)";

const btnNovo = document.getElementById("btnNovo")
const btnUsado = document.getElementById("btnUsado")

btnNovo.addEventListener("click", btnNovoActive)
btnUsado.addEventListener("click", btnUsadoActive)

function btnUsadoActive(){
    btnUsado.setAttribute("class" , "btnBusca activeBusca")
    btnNovo.setAttribute("class", "btnBusca")
}

function btnNovoActive(){
    btnNovo.setAttribute("class" , "btnBusca activeBusca")
    btnUsado.setAttribute("class", "btnBusca")
}

const checkBox = document.querySelectorAll(".check").forEach( check => {
    let ativo = false
    check.onclick = () =>{
        const divs = document.querySelectorAll('div')
        divs.forEach((div, index) => {
            if(div == check.parentElement){
                const input1 = divs[index + 1].children[0].children[0]
                const input2 = divs[index + 1].children[1].children[0]
                if(ativo){
                    input1.setAttribute('disabled','disabled')
                    input2.setAttribute('disabled','disabled')
                    check.setAttribute('value', 0)
                    ativo = false
                }else{
                    check.setAttribute('value', 1)
                    input1.removeAttribute('disabled')
                    input2.removeAttribute('disabled')
                    ativo = true
                }
            }
        })
    }
})
