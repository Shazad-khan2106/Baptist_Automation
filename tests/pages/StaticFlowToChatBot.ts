import * as dotenv from 'dotenv';
dotenv.config();
const { testData } = require('../test_data');
import { CustomWorld } from '../../support/world'; 
import { baptistLocators, loginLocators } from '../locator/locators'; 
import { expect } from 'playwright/test';

export class StaticFlowToChatbot {
  private wsUrl?: string;
  constructor(private world: CustomWorld) {}

  private get page() {
    return this.world.page;
  }
  private get expect(){
    return this.world.expect;
  }
  async gotoLogin() {
    this.world.addLog('Navigating to login page');
    await this.page.goto(testData.URL); // replace with real URL
  }

  async login(username: string, password: string) {
    this.world.addLog(`Logging in with user: ${username}`);
    await this.page.fill(loginLocators.username, username);
    await this.page.fill(loginLocators.password, password);
    await this.page.click(loginLocators.submitButton);
  }

  async isHomepageVisible() {
    const visible = await this.page.locator(baptistLocators.homepage).isVisible();
    this.world.addLog(`Homepage visibility: ${visible}`);
    return visible;
  }
async verifyNavigationBarVisible() {
    await expect(this.page.locator(baptistLocators.navigationBar)).toBeVisible(); 
    await this.page.locator(baptistLocators.navigationBar).click(); 
    
  }

  async clickOnOption(option: string) {
    await this.page.getByText(option).first().click(); // e.g., "Get Care"
  }

  async selectSubOption(subOption: string) {
    await this.page.getByText(subOption).first().click(); // e.g., "Schedule Appointment"
  }

  async clickOnCard(cardName: string) {
    await this.page.getByText(cardName).first().click(); // e.g., "Primary Care"
  }

  async verifyChatbotWithTooltip() {
    await expect(this.page.locator(baptistLocators.toolTip).isVisible).toBeTruthy();
    await expect(this.page.locator(baptistLocators.chatBotIcon).isVisible).toBeTruthy(); // Replace with actual tooltip locator
  }

  async clickOnChatbot() {
    await this.page.locator(baptistLocators.chatBotIcon).click(); // Replace with chatbot icon locator
  }

  async verifyChatbotWindowOpened() {
    await expect(this.page.locator(baptistLocators.chatBotWindow).isVisible).toBeTruthy(); // Replace with actual chatbot window locator
  }

  async verifyEmergencyToast() {
    await expect(this.page.locator(baptistLocators.emergencyToastMessage).isVisible).toBeTruthy(); // Replace with actual toast locator
  }

  async verifyWelcomeMessage() {
    await expect(this.page.locator(baptistLocators.welcomeMessage)).toContainText(/Welcome/i); // Replace with message locator
  }

  async verifySpeakerAndBackButton() {
    await expect(this.page.locator(baptistLocators.backButton)).toBeTruthy();
    await expect(this.page.locator(baptistLocators.speakerButton).isVisible).toBeTruthy();
  }

  async verifyDisabledMicInput() {
    await expect(this.page.locator(baptistLocators.micIcon).isVisible).toBeTruthy();
  }

  async clickOnInfoButton() {
    await this.page.locator(baptistLocators.infoIcon).click(); // "i" button locator
  }

  async verifyOverlayAndButton(buttonText: string) {
    await expect(this.page.locator(baptistLocators.overLay)).toBeVisible();
    await expect(this.page.getByText(buttonText).first().isVisible).toBeTruthy(); // e.g., "Got It"
  }
}
