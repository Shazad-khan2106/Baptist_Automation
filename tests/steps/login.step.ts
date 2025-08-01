import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../support/world";
import { StaticFlowToChatbot } from "../pages/StaticFlowToChatBot";
const { testData } = require('../test_data');



Given('I open the baptist login page', async function (this: CustomWorld) {
  this.staticFlow = new StaticFlowToChatbot(this);
  await this.staticFlow.gotoLogin();
});

When('I enter {string} and {string}', async function (this: CustomWorld, username: string, password: string) {
    await this.staticFlow.login(testData.USERNAME, testData.PASSWORD);
});
  

Then('I should see the homepage', async function (this: CustomWorld) {
  const staticFlow = await this.staticFlow.isHomepageVisible();
});
