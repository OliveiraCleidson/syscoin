# Requisitos

## Funcionais

Eu como usuário, gostaria de realizar login com o usuário "syscoin" e a senha "meEscolhe".

Eu como usuário, gostaria de receber a mensagem "Meu nome completo é xxx. Eu quero essa vaga!" ao realizar login.

Eu como usuário, gostaria de saber se as credenciais não estão corretas recebendo a mensagem "Credenciais erradas."

## Não Funcionais

Deve receber por query o `user` e a `password` através de um endpoint [POST] `/provasyscoin`

Deve retornar a resposta em JSON utilizando a propriedade `mensagem`.
