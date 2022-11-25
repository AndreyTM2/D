const axios = require('axios')

const Axios = async (accessToken) => {
    return axios.create({
      baseURL: `https://api.mercadopago.com`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
})
}

module.exports = Axios;
