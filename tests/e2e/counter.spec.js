import { test, expect } from '@playwright/test'

test.describe('Counter E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080')
  })

  test('должен отображать начальное значение счетчика', async ({ page }) => {
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 0')
    await expect(page.locator('[data-testid="counter-value"]')).toContainText('Текущее значение: 0')
  })

  test('должен увеличивать счетчик при нажатии кнопки "+"', async ({ page }) => {
    const incrementBtn = page.locator('[data-testid="btn-increment"]')
    
    await incrementBtn.click()
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 1')
    
    await incrementBtn.click()
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 2')
  })

  test('должен уменьшать счетчик при нажатии кнопки "-"', async ({ page }) => {
    await page.locator('[data-testid="btn-increment"]').click()
    await page.locator('[data-testid="btn-increment"]').click()
    
    await page.locator('[data-testid="btn-decrement"]').click()
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 1')
  })

  test('должен сбрасывать счетчик при нажатии кнопки "Сбросить"', async ({ page }) => {
    await page.locator('[data-testid="btn-increment"]').click()
    await page.locator('[data-testid="btn-increment"]').click()
    await page.locator('[data-testid="btn-increment"]').click()
    
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 3')
    
    await page.locator('[data-testid="btn-reset"]').click()
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 0')
  })

  test('должен корректно работать с последовательными операциями', async ({ page }) => {
    const incrementBtn = page.locator('[data-testid="btn-increment"]')
    const decrementBtn = page.locator('[data-testid="btn-decrement"]')
    const resetBtn = page.locator('[data-testid="btn-reset"]')
    
    await incrementBtn.click()
    await incrementBtn.click()
    await incrementBtn.click()
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 3')
    
    await decrementBtn.click()
    await decrementBtn.click()
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 1')
    
    await resetBtn.click()
    await expect(page.locator('[data-testid="counter-title"]')).toContainText('Счетчик: 0')
  })
})

