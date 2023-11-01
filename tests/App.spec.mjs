import { test, expect } from "@playwright/test";
import { username, password } from "../user.js";

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill(username);
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill(password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(page.locator("h2")).toHaveText("Мои курсы и профессии");
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[placeholder="Email"]').click();
  await page.locator('[placeholder="Email"]').fill("vasya@mail.com");
  await page.locator('[placeholder="Пароль"]').click();
  await page.locator('[placeholder="Пароль"]').fill("1");
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText(
    "Вы ввели неправильно логин или пароль"
  );
  await page.screenshot({ path: "screenshotError.png" });
});
