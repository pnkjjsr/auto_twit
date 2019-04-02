const twitterize = require("twitterize");

module.exports = async (req, res, twitCont) => {

    const credentials = {
        api_key: process.env.api_key,
        api_secret_key: process.env.api_secret_key,
        access_token: process.env.access_token,
        access_token_secret: process.env.access_token_secret
    };

    const twit = {
        requestMethod: "POST",
        endpoint: "/statuses/update.json",
        bodyParams: {
            status: `${twitCont.title} ${twitCont.url}`
        },
        oauthOptions: credentials
    };

    await twitterize(twit)
        .then(data => {
            return res.status(200).send(data);
        })
        .catch(e => console.log(e));
}