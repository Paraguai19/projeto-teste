alert('Seja bem vindo!!');
let numeroMaximo = 5000;
let numeroSecreto = parseInt(Math.random() * numeroMaximo +1);
console.log(numeroSecreto);
let chute;
let tentativas = 1;

// enquanto o chute não for igual ao n.s.
while (chute != numeroSecreto) {
    chute = prompt (`Escolha um número entre 1 e ${numeroMaximo}`);
    // se o chute for igual ao numero secreto
    if (chute == numeroSecreto) {
        break;
    } else {
       if (chute > numeroSecreto) {
        alert(`O numero secreto é menor que ${chute}`);
    } else {
        alert(`O numero secreto é maior que ${chute}`);
    }
    // tentativas = tentativas + 1;
    tentativas++;
}
}

let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
alert(`Isso ai! Você descobriu... O numero secreto é ${numeroSecreto} com ${tentativas} ${palavraTentativa}.`);

//if (tentativas > 1) {
//    alert(`Isso ai! Você descobriu... O numero secreto é ${numeroSecreto} com ${tentativas} tentativas.`);
//} else{
//    alert(`Isso ai! Você descobriu... O numero secreto é ${numeroSecreto} com ${tentativas} tentativa.`);
//}
