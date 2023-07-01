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

  base-url : ```bash https://encharet-server.onrender.com/api```<br><br>

  ### Endpoints<br><br>

  **User Endpoints**

| Endpoint           | Request Type | Headers                    | Body/ Param                                                     | Response                                                                   | URL                                     |
|--------------------|--------------|----------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| Signup             | POST         |                            | Body: (JSON) { fname, lname, email, phonenumber, password }     | { token, user, application[],  notification[], organization[], payment[] } | /signup                                 |
| Login              | POST         |                            | Body: (JSON) {email, phonenumber }                              | { token, user, application[],  notification[], organization[], payment[] } | /login                                  |
| GetProfile         | GET          | { x-auth-token: `$token` } |                                                                 | { user }                                                                   | /profile                                |
| CreateOrganization | POST         | { x-auth-token: `$token` } | Body: (JSON) { name, tin_number, type, location }               | { organization }                                                           | /create/org                             |
| GetFile            | GET          |                            | Param: file                                                     |                                                                            |                                         |
| GetNotifications   | GET          | { x-auth-token: `$token` } |                                                                 | [ notifications ]                                                          | /notifications                          | 
| GetWinner          | GET          | { x-auth-token: `$token` } | Params: bid_id                                                  | { message }                                                                | /winner                                 |
| VerifyAccount      | PUT          | { x-auth-token: `$token` } | Body: { code }                                                  | { user }                                                                   | /account/verify                         |
| ChangePassword     | PUT          | { x-auth-token: `$token` } | Body: { oldPassword, newPassword }                              | { message }                                                                | /change/password                        |
| ForgotPasswprd     | PUT          |                            | Body: { email, newPassword }                                    | { message }                                                                | /verify/password                        |
| GetAllWithdrawalRequests | GET          | { x-auth-token: `$token` } |                                                                 | [ requests ]                                                               | /user/requests                               |

<br><br>


  **Admin Endpoints**<br><br>
| Endpoint                 | Request Type | Headers                    | Body/ Param                                                     | Response                                                                   | URL                                     |
|--------------------------|--------------|----------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| Login                    | POST         |                            | Body: (JSON) {email, phonenumber }                              | { token, user, application[],  notification[], organization[], payment[] } | /admin/login                            |
| SuspendUser              | PUT          | { x-auth-token: `$token` } | Params: id                                                      | { message }                                                                | /suspend                                |
| RemoveBid                | DELETE       | { x-auth-token: `$token` } | Params: id                                                      | { message }                                                                | /bid/remove                             |
| GetAllUsers              | GET          | { x-auth-token: `$token` } |                                                                 | [ users ]                                                                  | /users                                  |
| GetAllWithdrawalRequests | GET          | { x-auth-token: `$token` } |                                                                 | [ requests ]                                                               | /requests                               |
| ApproveWithdrawalRequests| PUT          | { x-auth-token: `$token` } | Params: id                                                      | { request }                                                                | /approve/request                        |

<br><br>
  
  **Bid Endpoints**<br><br>

| Endpoint           | Request Type | Headers                    | Body/ Param                                                     | Response                                                                   | URL                                     |
|--------------------|--------------|----------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| CreateBid          | POST         | { x-auth-token: `$token` } | Body: (FormData) { files, title, description, cpo_amount, fee } | { bid }                                                                    | /create/bid                             |
| BrowseBids         | GET          |                            | Query: { tag?, max?, min?, date?, title? }                      | [ bid ]                                                                    | /bids                                   |
| GetClosedBids      | GET          | { x-auth-token: `$token` } |                                                                 | [ { bid, application[], payments[] } ]                                     | /bids/closed                            |
| GetOngoingBids     | GET          | { x-auth-token: `$token` } |                                                                 | [ { bid, application[], payments[] } ]                                     | /bids/ongoing                           |
| GetUpcomingBids    | GET          | { x-auth-token: `$token` } |                                                                 | [ { bid, application[], payments[] } ]                                     | /bids/upcoming                          |
| GetMyBids          | GET          | { x-auth-token: `$token` } |                                                                 | [ { bid, application[], payments[] } ]                                     | /mybids                                 |
| GetBidById         | GET          | { x-auth-token: `$token` } | Param: id                                                       | [ bid ]                                                                    | /bid/:id                                |

<br><br>

  **Application Endpoints**<br><br>
| Endpoint           | Request Type | Headers                    | Body/ Param                                                     | Response                                                                   | URL                                     |
|--------------------|--------------|----------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| Apply              | POST         | { x-auth-token: `$token` } | Body: (FormData) { files }  Query: bid_id                       | { application }                                                            | /apply?bid_id=id                        |
| AcceptApplication  | PUT          | { x-auth-token: `$token` } | Query: id, bid_id                                               | { bid }                                                                    | /accept/application?id=id&bid_id=bid_id |
  
  
  **Payment Endpoints**<br><br>
| Endpoint           | Request Type | Headers                    | Body/ Param                                                     | Response                                                                   | URL                                     |
|--------------------|--------------|----------------------------|-----------------------------------------------------------------|----------------------------------------------------------------------------|-----------------------------------------|
| Deposit            | POST         | { x-auth-token: `$token` } | Query: amount                                                   | { checkout_url, payment_data }                                             | /deposit?amount=amount                  |
| VerifyPayment      | PUT          | { x-auth-token: `$token` } | Param: id                                                       | { payment }                                                                | /verify/:id                             |
| GetPayments        | GET          | { x-auth-token: `$token` } |                                                                 | [ payment ]                                                                | /payments                               |
| RequestWithdraw    | POST         | { x-auth-token: `token`  } | Body: { bank_account, amount }                                  | { request }                                                                | /withdraw                               |