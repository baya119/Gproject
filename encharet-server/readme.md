# Encharet-server

Backend app for [Encharet]() made by using [nodejs](https://nodejs.org/en/), [express](https://expressjs.com/), [prisma](https://www.prisma.io/) and [mysql](https://www.mysql.com/).

## Installation

1. Clonning the repo
   
   ```bash
    git clone https://github.com/Besufikad17/encharet-server.git
   ```

2. Installing npm packages
   
   ```bash
    cd encharet-server && npm install
    ```
3. Adding configurations
   
   ```bash
   // creaing .env file
   touch .env
   ```
   ```.env
   // storing configs in .env file
   DATABASE_URL = "DB URL"
   JWT_SECRET = "JWT SECRET WORD"
   CHAPA_URL="https://api.chapa.co/v1/transaction/initialize"
   CHAPA_AUTH="CHAPA SECRET KEY"
   ```
4. Building 

    ```bash
    npm run build
    ```

5. Running
    ```bash 
    npm start
    ```

## Usage

  base-url : ```bash https://encharet-server.onrender.com```

  ### Endpoints

| Endpoint           | Request Type | Headers                    | Body/ Param                                                     | Response                                                                   | URL                                     |
|--------------------|--------------|----------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| Signup             | POST         |                            | Body: (JSON) { fname, lname, email, phonenumber, password }     | { token, user, application[],  notification[], organization[], payment[] } | /signup                                 |
| Login              | POST         |                            | Body: (JSON) {email, phonenumber }                              | { token, user, application[],  notification[], organization[], payment[] } | /login                                  |
| GetProfile         | GET          | { x-auth-token: `$token` } |                                                                 | { user }                                                                   | /profile                                |
| CreateOrganization | POST         | { x-auth-token: `$token` } | Body: (JSON) { name, tin_number, type, location }               | { organization }                                                           | /create/org                             |
| CreateBid          | POST         | { x-auth-token: `$token` } | Body: (FormData) { files, title, description, cpo_amount, fee } | { bid }                                                                    | /create/bid                             |
| Apply              | POST         | { x-auth-token: `$token` } | Body: (FormData) { files }  Query: bid_id                       | { application }                                                            | /apply?bid_id=id                        |
| Deposit            | POST         | { x-auth-token: `$token` } | Query: amount                                                   | { checkout_url, payment_data }                                             | /deposit?amount=amount                  |
| BrowseBids         | GET          |                            | Query: { cpo_min?, cpo_max?, max?, min?, orderBy?, title? }     | [ bid ]                                                                    | /bids                                   |
| GetBids            | GET          | { x-auth-token: `$token` } | Query: { cpo_min?, cpo_max?, max?, min?, orderBy?, title? }     | [ { bid, application[], payments[] } ]                                     | /org/bids                               |
| GetBidById         | GET          | { x-auth-token: `$token` } | Param: id                                                       | [ bid ]                                                                    | /bid/:id                                |
| GetFile            | GET          |                            | Param: file                                                     | file                                                                       | /user/:file                             |
| AcceptApplication  | PUT          | { x-auth-token: `$token` } | Query: id, bid_id                                               | { bid }                                                                    | /accept/application?id=id&bid_id=bid_id |
| VerifyPayment      | PUT          | { x-auth-token: `$token` } | Param: id                                                       | { payment }                                                                | /verify/:id                             |
| GetPayments        | GET          | { x-auth-token: `$token` } |                                                                 | [ payment ]                                                                | /payments                             |