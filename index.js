/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

/* this is where the facts live do not use any punctuation or you'll ruin my very bad code*/

const languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'Its a day ending with y.',
                'its somebodys birthday somewhere in the world and it would be rude not to celebrate.',
                'you are a good person and youre trying your best and you deserve a treat.',
                'you have won a one-way ticket to flavourtown with your name on it.',
                'its International Eat Something Delicious day. We made that up, but it should be a holiday.',
                'death will come for us all and we must seize happiness and joy when and where we can.',
                'you may have a life-threatening deliciousness deficiency that can only be treated with crunchy mouth-watering Pringles.',
                'you have a taste for the spicy things in life and love to get heated with Hot and Spicy Pringles.',
                'youre one cheesy nacho lover and a can of Nacho Cheese Pringles would be heaven right now.',
                'we think youre a bit of a smokeshow so you should nosh on some Paprika Pringles.',
                'theres only one person like you in the whole entire world, youre a real original, so you should nibble on Original Pringles.',
            ],
            SKILL_NAME: 'Reasons to Eat Pringles',
            GET_FACT_MESSAGE: "Because: ",
            HELP_MESSAGE: 'You can say give me a reason to eat Pringles, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];

        // Create speech output
        const speechOutput = this.t('GET_FACT_MESSAGE') + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
