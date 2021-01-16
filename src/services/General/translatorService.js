const LanguageTranslatorV3 = require('ibm-watson/language-translator/v3');
const { IamAuthenticator } = require("ibm-watson/auth");

const languageTranslator = new LanguageTranslatorV3({

    version: '2018-05-01',
    authenticator: new IamAuthenticator({
        apikey: process.env.IBM_WATSON_KEY
    }),
    serviceUrl: 'https://api.us-south.language-translator.watson.cloud.ibm.com/instances/f14d36d9-3673-4dd1-badc-53b6ade02053'
});

/**
 * Try to translate the given text into english
 * @param {String} message
 */
async function translateTextToEnglish(message) {

    //get the first detected language from the message
    const lang = await getLanguage(message);

    //if lang is null, just return
    if (lang == null) {
        throw "Could not detect a language!";
    }

    //say that we think the message is already in english
    if(lang === "en"){
        throw "I think this is already in english...?";
    }
    //try to translate the text
    return { lang, translation: await translate({ text: message, modelId: `${lang}-en` })};
}

/**
 * Get the language of the given message
 */
async function getLanguage(message) {
    return await languageTranslator.identify({"text": message})
        .then(async (identifiedLanguages) => {
            return identifiedLanguages.result.languages[0].language;
        })
        .catch(err => {
            console.log('error:', err);
        });
}

/**
 * Translate the message and return the response as a string
 * @param {Object} params
 */
async function translate(params) {

    return await languageTranslator.translate(params)
        .then(translationResult => {
            return translationResult.result.translations[0].translation;
        })
        .catch(err => {
            console.log('error:', err);
        });
}

module.exports = {
    translateTextToEnglish
}
