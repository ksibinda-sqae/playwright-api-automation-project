import { attachment } from 'allure-js-commons';

export class AllureHelper {
  static async attachScreenshot(screenshot: Buffer, name = 'Failure Screenshot'): Promise<void> {
    await attachment(name, screenshot, {
      contentType: 'image/png',
    });
  }

  static async attachText(name: string, value: string): Promise<void> {
    await attachment(name, value, 'text/plain');
  }

  static async attachJson(name: string, value: unknown): Promise<void> {
    await attachment(name, JSON.stringify(value, null, 2), 'application/json');
  }
}
