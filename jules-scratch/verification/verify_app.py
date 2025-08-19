import re
from playwright.sync_api import sync_playwright, Page, expect

def verify_app(page: Page):
    """
    This script verifies the entire application by:
    1. Logging in.
    2. Taking a screenshot of the dashboard.
    3. Navigating to the qualifications page and taking a screenshot.
    """

    # 1. Login
    page.goto("http://localhost:5174/login")

    # Take a screenshot immediately to debug the page content
    page.screenshot(path="jules-scratch/verification/debug_login_page.png")

    # Wait for the page to be ready
    page.wait_for_load_state('domcontentloaded')

    # Expect the heading to be visible before interacting with inputs
    expect(page.get_by_role("heading", name="Login")).to_be_visible()

    # Fill in credentials using a more specific locator
    page.locator('input[id="email"]').fill("admin@example.com")
    page.locator('input[id="password"]').fill("password123")

    # Click login button
    page.get_by_role("button", name="Entrar").click()

    # 2. Verify Dashboard and take screenshot
    # Wait for the dashboard heading to be visible
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()

    # Check if the user email is displayed in the header
    expect(page.get_by_text("admin@example.com")).to_be_visible()

    page.screenshot(path="jules-scratch/verification/dashboard.png")

    # 3. Navigate to Qualifications and take screenshot
    # Click on the "Qualificações" link in the sidebar
    page.get_by_role("link", name="Qualificações").click()

    # Wait for the qualifications heading to be visible
    expect(page.get_by_role("heading", name="Qualificações")).to_be_visible()

    page.screenshot(path="jules-scratch/verification/qualifications.png")

# Boilerplate to run the script
if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        verify_app(page)
        browser.close()
