import { expect, test } from 'vitest'
import { chromium, Browser, Page } from 'playwright'

test('renders delete empty folders app', async () => {
  let browser: Browser | undefined
  let page: Page | undefined

  try {
    browser = await chromium.launch()
    page = await browser.newPage()

    await page.goto('http://localhost:3000')

    const title = await page.title()
    expect(title).toBe('Delete Empty Folders')

    const header = await page.$('h1')
    expect(header).toBeTruthy()
  } finally {
    if (browser) {
      await browser.close()
    }
  }
})
