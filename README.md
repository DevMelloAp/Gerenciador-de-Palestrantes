Esse projeto foi realizado durante o curso de Desenvolvimento Web na Trybe, onde desenvolvi uma aplicação de cadastro de talkers (palestrantes), onde é possível cadastrar, visualizar, pesquisar, editar e excluir informações.

Orientações

Rodando no Docker vs Localmente

Com Docker

Rode o serviço node com o comando docker-compose up -d.

Esse serviço irá inicializar um container chamado talker_manager.
A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
Use o comando docker exec -it talker_manager bash.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
Instale as dependências [Caso existam] com npm install

De olho na dica:

A extensão Remote - Containers do VS Code (que estará na seção de extensões recomendadas do programa) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.


Sem Docker

Instale as dependências [Caso existam] com npm install

De olho nas dicas:

Para rodar o projeto desta forma, obrigatoriamente você deve ter o node instalado em seu computador.
O avaliador espera que a versão do node utilizada seja a 16.
