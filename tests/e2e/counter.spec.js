import { test, expect } from '@playwright/test'

test.describe('Counter E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080')
  })

  test('должен отображать начальное значение счетчика', async ({ page }) => {
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 0')
    await expect(page.locator('[data-qa="counter-value"]')).toContainText('Текущее значение: 0')
  })

  test('должен увеличивать счетчик при нажатии кнопки "+"', async ({ page }) => {
    const incrementBtn = page.locator('[data-qa="btn-increment"]')
    
    await incrementBtn.click()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 1')
    
    await incrementBtn.click()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 2')
  })

  test('должен уменьшать счетчик при нажатии кнопки "-"', async ({ page }) => {
    await page.locator('[data-qa="btn-increment"]').click()
    await page.locator('[data-qa="btn-increment"]').click()
    
    await page.locator('[data-qa="btn-decrement"]').click()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 1')
  })

  test('должен сбрасывать счетчик при нажатии кнопки "Сбросить"', async ({ page }) => {
    await page.locator('[data-qa="btn-increment"]').click()
    await page.locator('[data-qa="btn-increment"]').click()
    await page.locator('[data-qa="btn-increment"]').click()
    
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 3')
    
    await page.locator('[data-qa="btn-reset"]').click()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 0')
  })

  test('должен корректно работать с последовательными операциями', async ({ page }) => {
    const incrementBtn = page.locator('[data-qa="btn-increment"]')
    const decrementBtn = page.locator('[data-qa="btn-decrement"]')
    const resetBtn = page.locator('[data-qa="btn-reset"]')
    
    await incrementBtn.click()
    await incrementBtn.click()
    await incrementBtn.click()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 3')
    
    await decrementBtn.click()
    await decrementBtn.click()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 1')
    
    await resetBtn.click()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 0')
  })

  test('должен показывать правильное сообщение при граничном значении максимума', async ({ page }) => {
    const incrementBtn = page.locator('[data-qa="btn-increment"]')

    await expect(page.locator('[data-qa="min-message"]')).not.toBeVisible()
    await expect(page.locator('[data-qa="max-message"]')).not.toBeVisible()
    
    for (let i = 0; i < 12; i++) {
      await incrementBtn.click()
    }

    await expect(page.locator('[data-qa="max-message"]')).toBeVisible()
    await expect(page.locator('[data-qa="min-message"]')).not.toBeVisible()
  })

  test('должен показывать правильное сообщение при граничном значении минимума', async ({ page }) => {
    const decrementBtn = page.locator('[data-qa="btn-decrement"]')
    const resetBtn = page.locator('[data-qa="btn-reset"]')
    
    await resetBtn.click()
    
    await expect(page.locator('[data-qa="min-message"]')).not.toBeVisible()
    await expect(page.locator('[data-qa="max-message"]')).not.toBeVisible()

    for (let i = 0; i < 10; i++) {
      await decrementBtn.click()
    }
    
    await expect(page.locator('[data-qa="min-message"]')).toBeVisible()
    await expect(page.locator('[data-qa="max-message"]')).not.toBeVisible()
  })

  test('должен блокировать кнопку "+" при достижении максимума', async ({ page }) => {
    const incrementBtn = page.locator('[data-qa="btn-increment"]')
    const resetBtn = page.locator('[data-qa="btn-reset"]')
    
    await resetBtn.click()
    
    for (let i = 0; i < 12; i++) {
      await incrementBtn.click()
    }
    
    await expect(incrementBtn).toBeDisabled()
    await expect(page.locator('[data-qa="counter-title"]')).toContainText('Счетчик: 12')
    await expect(page.locator('[data-qa="max-message"]')).toBeVisible()
  })

  test('должен блокировать кнопку "-" при достижении минимума', async ({ page }) => {
    const decrementBtn = page.locator('[data-qa="btn-decrement"]')
    const resetBtn = page.locator('[data-qa="btn-reset"]')
    
    await resetBtn.click()
    
    for (let i = 0; i < 10; i++) {
      await decrementBtn.click()
    }

    await expect(decrementBtn).toBeDisabled()
    await expect(page.locator('[data-qa="min-message"]')).toBeVisible()
  })
})

