import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { expect } from '@playwright/test';
import { BaptistTranscription } from '../pages/BaptistTranscription'
import * as dotenv from 'dotenv';
dotenv.config();


Then('I click on the chatbot', async function (this: CustomWorld) {
  this.baptistPage = new BaptistTranscription(this);
  await this.baptistPage.openChatbot();
});

Then('I click on the mic icon', async function (this: CustomWorld) {
  await this.baptistPage.getWebSocketURL()
  await this.baptistPage.clickOnMicIcon();

});

Then('I speak {string}', async function (this: CustomWorld, speechText: string) {
  await this.baptistPage.simulateSpeech(speechText);
});

Then('I should see {string} in the input bar', async function (this: CustomWorld, expectedText: string) {
  await this.baptistPage.verifyTranscription(expectedText)
});
