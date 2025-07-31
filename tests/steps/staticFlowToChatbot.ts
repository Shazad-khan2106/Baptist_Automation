import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';
import { expect } from '@playwright/test';
import { testData } from "../test_data/properties.json";
import * as dotenv from 'dotenv';
import { StaticFlowToChatbot } from '../pages/StaticFlowToChatBot';
dotenv.config();

When('I see the navigation bar', async function (this: CustomWorld) {
  await this.staticFlow.verifyNavigationBarVisible();
});

Then('I click on {string} option', async function (this: CustomWorld, option: string) {
  await this.staticFlow.clickOnOption(option); // e.g., "Get Care"
});

Then('I select {string} option', async function (this: CustomWorld, subOption: string) {
  await this.staticFlow.selectSubOption(subOption); // e.g., "Schedule Appointment"
});

Then('I click on {string} card', async function (this: CustomWorld, cardName: string) {
  await this.staticFlow.clickOnCard(cardName); // e.g., "Primary Care"
});

Then('I can see the chatbot with tooltip', async function (this: CustomWorld) {
  await this.staticFlow.verifyChatbotWithTooltip();
});

Then('I click on the chatbot icon', async function (this: CustomWorld) {
  await this.staticFlow.clickOnChatbot();
});

Then('chatbot window is open', async function (this: CustomWorld) {
  await this.staticFlow.verifyChatbotWindowOpened();
});

Then('I can see a toast message for emergency', async function (this: CustomWorld) {
  await this.staticFlow.verifyEmergencyToast();
});

Then('A welcome message from chat assistant', async function (this: CustomWorld) {
  await this.staticFlow.verifyWelcomeMessage();
});

Then('speaker and back button at the top', async function (this: CustomWorld) {
  await this.staticFlow.verifySpeakerAndBackButton();
});

Then('An input element with disabled mic icon', async function (this: CustomWorld) {
  await this.staticFlow.verifyDisabledMicInput();
});

Then('I click on i button', async function (this: CustomWorld) {
  await this.staticFlow.clickOnInfoButton(); // i icon
});

Then('A overlay gets open with a message and {string} button', async function (this: CustomWorld, buttonText: string) {
  await this.staticFlow.verifyOverlayAndButton(buttonText); // e.g., "Got It"
});