import { Given, When, Then, } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { expect } from '@playwright/test';
import { testData } from "../test_data/properties.json";
import * as dotenv from 'dotenv';
import { StaticFlowToChatbot } from '../pages/StaticFlowToChatBot';
dotenv.config();

Given('I am on the navigation bar', async function (this: CustomWorld) {
  await this.staticFlow.verifyNavigationBarVisible();
});

When('I click on the {string} option in the navigation bar', async function (this: CustomWorld, option: string) {
  await this.staticFlow.clickOnOption(option); // e.g., "Get Care"
});

Then('I select the {string} option', async function (this: CustomWorld, subOption: string) {
  await this.staticFlow.selectSubOption(subOption); // e.g., "Schedule Appointment"
});

Then('I click on the {string} card', async function (this: CustomWorld, cardName: string) {
  await this.staticFlow.clickOnCard(cardName); // e.g., "Primary Care"
});

Then('I should see the chatbot with a tooltip', async function (this: CustomWorld) {
  await this.staticFlow.verifyChatbotWithTooltip();
});

When('I click on the chatbot icon', async function (this: CustomWorld) {
  await this.staticFlow.clickOnChatbot();
});

Then('The chatbot window should open', async function (this: CustomWorld) {
  await this.staticFlow.verifyChatbotWindowOpened();
});

Then('I should see a toast message for emergency', async function (this: CustomWorld) {
  await this.staticFlow.verifyEmergencyToast();
});

Then('I should see a welcome message from the chat assistant', async function (this: CustomWorld) {
  await this.staticFlow.verifyWelcomeMessage();
});

Then('I should see the speaker and back buttons at the top', async function (this: CustomWorld) {
  await this.staticFlow.verifySpeakerAndBackButton();
});

Then('I should see an input field with a disabled mic icon', async function (this: CustomWorld) {
  await this.staticFlow.verifyDisabledMicInput();
});

When('I click on the information \\(i) button', async function (this: CustomWorld) {
  await this.staticFlow.clickOnInfoButton(); // i icon
});

Then('an overlay should appear with a message and a {string} button', async function (this: CustomWorld, buttonText: string) {
  await this.staticFlow.verifyOverlayAndButton(buttonText); // e.g., "Got It"
});