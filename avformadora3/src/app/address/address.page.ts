import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
function limpa_formulário_cep(): void {
  // Limpa valores do formulário de cep.
  (document.getElementById('rua') as HTMLInputElement).value = "";
  (document.getElementById('bairro') as HTMLInputElement).value = "";
  (document.getElementById('cidade') as HTMLInputElement).value = "";
  (document.getElementById('uf') as HTMLInputElement).value = "";
  (document.getElementById('ibge') as HTMLInputElement).value = "";
}

function meu_callback(conteudo: any): void {
  if (!("erro" in conteudo)) {
    // Atualiza os campos com os valores.
    (document.getElementById('rua') as HTMLInputElement).value = conteudo.logradouro;
    (document.getElementById('bairro') as HTMLInputElement).value = conteudo.bairro;
    (document.getElementById('cidade') as HTMLInputElement).value = conteudo.localidade;
    (document.getElementById('uf') as HTMLInputElement).value = conteudo.uf;
    (document.getElementById('ibge') as HTMLInputElement).value = conteudo.ibge;
  } else {
    // CEP não encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor: string): void {
  // Nova variável "cep" somente com dígitos.
  const cep = valor.replace(/\D/g, '');

  // Verifica se campo cep possui valor informado.
  if (cep !== "") {
    // Expressão regular para validar o CEP.
    const validacep = /^[0-9]{8}$/;

    // Valida o formato do CEP.
    if (validacep.test(cep)) {
      // Preenche os campos com "..." enquanto consulta o webservice.
      (document.getElementById('rua') as HTMLInputElement).value = "...";
      (document.getElementById('bairro') as HTMLInputElement).value = "...";
      (document.getElementById('cidade') as HTMLInputElement).value = "...";
      (document.getElementById('uf') as HTMLInputElement).value = "...";
      (document.getElementById('ibge') as HTMLInputElement).value = "...";

      // Cria um elemento JavaScript.
      const script = document.createElement('script');

      // Sincroniza com o callback.
      script.src = `https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`;

      // Insere o script no documento e carrega o conteúdo.
      document.body.appendChild(script);

    } else {
      // CEP inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } else {
    // CEP sem valor, limpa formulário.
    limpa_formulário_cep();
  }
}
(window as any).pesquisacep = pesquisacep;
(window as any).meu_callback = meu_callback;