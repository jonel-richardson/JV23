import { test, expect } from '@playwright/test'

test.describe('/work category filter', () => {
  test('filters projects by category and resets with All', async ({ page }) => {
    await page.goto('/work')
    await page.waitForLoadState('networkidle')

    await expect(page.getByRole('heading', { name: 'THE WORK' })).toBeVisible()

    const cards = page.locator('[data-testid="project-card"]')

    await expect(cards).toHaveCount(5)

    await page.getByRole('tab', { name: 'Brand' }).click()
    await expect(cards).toHaveCount(1)

    await page.getByRole('tab', { name: 'Music' }).click()
    await expect(cards).toHaveCount(1)

    await page.getByRole('tab', { name: 'All' }).click()
    await expect(cards).toHaveCount(5)
  })
})
