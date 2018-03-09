import { post, get } from './Ajax'

function login(user, password) {

fetch('https://api-staging.latipay.net/org/account/login', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'yourValue',
    password: 'yourOtherValue',
  })
})

}