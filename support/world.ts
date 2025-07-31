import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, Page, BrowserContext } from 'playwright';
import { BaptistTranscription } from '../tests/pages/BaptistTranscription';
import { StaticFlowToChatbot } from '../tests/pages/StaticFlowToChatBot';
import { Expect } from 'playwright/test';


export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  baptistPage!: BaptistTranscription;
  staticFlow!: StaticFlowToChatbot
  logs: string[] = [];
  expect!: Expect;

  addLog(message: string) {
    const timestamp = new Date().toISOString();
    this.logs.push(`[${timestamp}] ${message}`);
  }
}

setWorldConstructor(CustomWorld);
