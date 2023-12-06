//export default (some object) MAKE SURE TO RETURN SOMETHING, AND THAT THING DOESNT CONTAIN THE RESPONSE VARIABLE
//AND IT CANT RETURN SOMETHING DIRECTLY FROM THE API, or else it might get messed up if the api changes
//function that returns a file(json) (facade pattern)

require("dotenv").config()
const axios = require('axios');

const clientId = process.env.LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUri = 'http://localhost:' + (process.env.PORT || 3001) + '/';
const authorizationCode = 'code_received_after_user_authorization';

// Exchange authorization code for access token
// const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';
// const tokenParams = {
//   grant_type: 'authorization_code',
//   code: authorizationCode,
//   redirect_uri: redirectUri,
//   client_id: clientId,
//   client_secret: clientSecret,
// };



axios.post(tokenUrl, new URLSearchParams(tokenParams), {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})
  .then(tokenResponse => {
    const accessToken = 'AQW_1NOtVRuAQddHXXgjPtCCAASbc5YxHv0-BC3iVG08-UiE5hBqmY9oLeZ8WfLlwS4NBbQy6i_0yWUkvzIga3_msXbb95ZqQ7eENc_FFYrtkvR9_icisPS5xCMoMj7SYvQe4zXOO27w-30SOYt2AE5Im53mkipveWeR0DPaTX7lua5orC3nPXYK6Z5jZ_XHCtpgEkacVBZ9DJWQ-qQPokFY5WPl3hQdmeNkF_SvIkEl5UXpggpSIyiIOu4Fy4aOD9lzLytr76hcSgQG6X0VC1q6z2ajQaoGngW-ri9vmOjvQhtvIY2HOn3pyAqJkMqA3SGP9XSbzVHSCiSnVZwV6j1JlVs8KQ';

    // Make a request to a LinkedIn API endpoint
    const apiEndpoint = 'https://api.linkedin.com/v2/me';
    const headers = { Authorization: `Bearer ${accessToken}` };

    return axios.get(apiEndpoint, { headers });
  })
  .then(apiResponse => {
    // Process the API response
    console.log(apiResponse.data);
  })
  .catch(error => {
    console.error('Error:', error.response ? error.response.data : error.message);
  });





