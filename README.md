# BeTalent - Teste Técnico

Este projeto é uma API para o teste técnico da BeTalent, que permite o cadastro de usuários e o gerenciamento de clientes, produtos e vendas. O sistema foi desenvolvido usando AdonisJS e utiliza MySQL como banco de dados

## Como instalar e iniciar o projeto

<details>
<summary><b>⚠️ Pré-requisitos</b></summary>
Antes de executar o projeto você deve garantir que tem as seguintes tecnologias instaladas, juntamente a elas contêm a versão recomendada:

[Node.js](https://nodejs.org/pt): 20.15.1

[Docker](https://docs.docker.com/get-docker/): 27.0.3

[Docker-Compose](https://docs.docker.com/compose/install/)

</details>
<details>
<summary><b>🧑‍💻 Como iniciar</b></summary>
Antes de rodar o projeto você deve clonar este repositório:

```bash
git clone https://github.com/Brunobmendes/BeTalent-Tech-Test.git
```

entre no diretório:
```bash
cd BeTalent-Tech-Test
```

copie o arquivo .env.example para .env e configure suas variáveis de ambiente
```bash
# esta é sua chave para gerar o jwt
APP_KEY=secret

# estas são suas configurações do banco de dados, certifique-se que elas são iguais aqui e no seu docker-compose.yml
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_DATABASE=be-talent-db

# aqui configure a porta que deseja utilizar no seu localhost
PORT=3333
```

inicie o container:
```bash
docker-compose up -d
# ou
docker compose up -d
```

instale as dependências:
```bash
npm run startup
```

Inicie o projeto:
```bash
npm run dev
```
</details>

## Como Utilizar

### Endpoints Principais
* cada endpoint deve ser rodado na porta configurada em seu arquivo .env

* rotas com um 🔑 deve-se estar autenticado
- **Usuários:**
  - `POST /signup`
  - `POST /login`
  - `GET /user` 🔑
  - `PATCH /user` 🔑

- 🔑 **Clientes:**
  - `GET /customer`
  - `GET /customer/{id}`
  - `POST /customer`
  - `PATCH /customer/{id}`
  - `DELETE /customer/{id}`

- 🔑 **Produtos:**
  - `GET /product`
  - `GET /product/{id}`
  - `POST /product`
  - `PATCH /product/{id}`
  - `DELETE /product/{id}` (soft delete)

- 🔑 **Vendas:**
  - `POST /sale`
  - `GET /sale`
  - `GET /sale/{id}`
  - `PATCH /sale/{id}`
  - `PATCH /sale/{id}/finish`
  - `DELETE /sale/{id}`

### 🔑 Como logar no sistema
O primeiro passo para conseguir acessar as demais rotas é criar um usuário para si, é feito através do endpoint `POST /signup` com um body semelhante a:


```json
{
   "name": "nome",
   "password": "senha",
   "email": "test@test.com"
}
```
o próximo passo é fazer o login na rota `POST /login`:
```json
{
   "email": "test@test.com",
   "password": "123"
}


/* exemplo de retorno bem sucedido
{
   "type": "bearer",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcyMTU5ODgzM30.CgEycI6RjNmvZmYwKSQX85bk74iLVXeUXhznK4xlTJo"
}
*/

```
após isso é só colocar o token em um campo Authorization no header de suas requisições, o formato do token deve ser:

`Bearer {token}`

## Body's para suas requisições

### POST
aqui estão alguns body's de exemplo para te ajudar na utilização

`POST /signup`
```json
{
   "name": "nome",
   "password": "senha",
   "email": "test@test.com"
}
```
`POST /login`
```json
{
   "email": "test@test.com",
   "password": "123"
}
```
`POST /customer`
```json
{
  "fullname": "John Doe",
  "birth": "1990-01-01",
  "cpf": "12345678903", // este campo é único
  "phone": "+5511987654321", // este campo é gravado na tabela phones
  "address": { // os campos abaixo ficam na tabela addresses
    "street_address": "123 Main St",
    "street_line_2": "optional", // este campo é opcional
    "city": "São Paulo",
    "state": "SP",
    "postal_code": "01000-000",
    "country": "Brasil"
  }
}
```
`POST /product`
```json
{
    "name": "product 1",
    "description": "description 1",
    "price": 1.99
}
```
`POST /sale`
```json
{
  "customerId": 1,
  "productId": 1,
  "quantity": 2,
  "unitPrice": 10.00,
  "totalPrice": 20.00,
  "status": "finished" // as opções aceitas são 'finished', 'pending', 'canceled', 'refunded'
}
```
### PATCH
os endpoints `PATCH` podem ser chamados com os mesmos campos descritos nos `POST`, entretanto todos os campos se tornam opcionais.

_com exceção do endpoint `PATCH /sale/{id}/finish` que não pede nenhum body, pois é utilizado para finalizar uma compra_

### GET E GET{ID}
ja os endpoints `GET` sem um id podem ser utilizados para se ter as informações básicas do que esta armazenado, e adicionando o {id} na frente é possível ter as informações detalhadas de cada dado.

`GET /customer/{id}?month={monthNumber}&year={yearNumber}`
nesta rota temos a query opcional de month e year que servem para filtrar as vendas do cliente

### DELETE
estes endpoints são utilizados para deletar dados do banco, onde em alguns dados é feito um soft delete para que não se perca completamente os dados das informações