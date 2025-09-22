import { test, expect } from '@playwright/test'

test.describe('Counter E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://anstasiica.github.io/counter/')
  })

  test('должен отображать начальное значение счетчика', async ({ page }) => {
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 0')
  })
})
