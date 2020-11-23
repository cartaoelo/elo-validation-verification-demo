# Configuração ambiente Google

Para realizar o login na plataforma Elo através da rede social Google, é necessário ter associado a rede **Google** a um novo usuário ou a um previamente cadastrado.

Esse procedimento está melhor descrito na documentação de Cadastro do Portador na seção [Usuário](https://hml-dev.elo.com.br/documentacao/cadastro-do-portador?lng=pt#cadastro-portador/usuario) nas chamadas ``createUser`` e ``addSocialNetworkToUser``.

## Configuração do ambiente Google Cloud
Para realizar esses procedimentos, é necessário ter uma conta Google.

### Acessando o Google Cloud Plataform
1. Com uma conta google previamente cadastrada, acesse o [console](https://console.cloud.google.com/).
2. Após acessar a *dashboard* inicial da plataforma, seu primeiro projeto já estará criado e funcionando.
3. Se desejar, altere o Nome do projeto através da opção `Acessar as configurações do projeto` na seção de **Informações do projeto**.

### Criando um app
1. No menu lateral esquerdo, selecione a opção `Tela de consentimento OAuth` na seção de menus **APIs e serviços**.
2. Selecione a opção `Externo` e realize a criação das suas credenciais através do botão `Criar`.
3. Faça a criação do seu app colocando as informações pedidas (obs: não é necessário habilitar nenhum domínio do app, apenas se necessário).
4. Continue seguindo pelas seções até a criação final do app e clique em `Voltar para o painel`.

### Criando e adicionando credenciais OAuth
1. Acesse a página de Credenciais, selecione a opção `Criar credenciais` e `ID do cliente do OAuth` para ativar a credencial OAuth.
2.  Escolha o tipo de aplicativo a ser utilizado (nesse caso, um **Aplicativo da Web**) e altere o nome para sua escolha.
3.  Na seção *Origens JavaScript autorizadas* e *URIs de redirecionamento autorizados* adicione os URLs que sua aplicação terá e crie o ID.
<br />
Ex: 
```
http://localhost:3000 e https://meu-app.com.br
```
4. Após todos os passos, você terá o **ID de cliente** da sua aplicação e a **Chave Secreta de cliente** disponíveis.


### Alterando na aplicação
Copie o ID fornecido e o substitua na propriedade [google_id](./../configs/api.ts) e pronto, sua aplicação já está disponível para realizar autenticações através do Google.

### Associando uma conta Google a um usuário Elo
1. Para associar uma rede social a um usuário Elo, execute a aplicação e realize login através do Google.
2. Seu usuário não estará associado a nenhuma rede social, dessa forma a aplicação lhe dará a opção de copiar o *token id* (*access token*) para realizar o cadastro da rede social ao seu usuário no portal Elo.
3. Após receber o *token id*, execute a mutation `createUser` ou `addSocialNetwork`, como descrito na primeira seção da documentação.
4. Pronto, seu usuário já está cadastrado com a rede social do Google.
