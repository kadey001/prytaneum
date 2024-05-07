import { Browser, Locator, Page } from '@playwright/test';
import { Device, getIndexByDevice } from '@local/common/utils';

export class PlaywrightDashboardPage {
    readonly page: Page;
    readonly device: Device;

    readonly currentEventsSection: Locator;
    readonly upcomingEventsSection: Locator;
    readonly today: Date;

    constructor(page: Page, device: Device) {
        this.page = page;
        this.device = device;

        this.currentEventsSection = page.locator('[data-test-id="dashboard-current-events-header"]');
        this.upcomingEventsSection = page.locator('[data-test-id="dashboard-upcoming-events-header"]');
        this.today = new Date();
    }

    /**
     * Allows for the reuse of authentication for the dashboard page tests
     * From playwright docs https://playwright.dev/docs/test-auth#testing-multiple-roles-with-pom-fixtures
     * The Parallel Index is used to isolate context between workers
     * You can find more info about the Parallel Index here: https://playwright.dev/docs/api/class-testinfo#test-info-parallel-index
     */
    async createWithOrganizerContext(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const storageState = `./common/state/organizer${deviceIndex}StorageState.json`;
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState,
        });
        const page = await context.newPage();
        return new PlaywrightDashboardPage(page, this.device);
    }

    async createWithUserContext(browser: Browser) {
        const deviceIndex = getIndexByDevice(this.device);
        const storageState = `./common/state/user${deviceIndex}StorageState.json`;
        const context = await browser.newContext({
            baseURL: process.env.BASE_URL || 'http://localhost:8080',
            storageState: storageState,
        });
        const page = await context.newPage();
        return new PlaywrightDashboardPage(page, this.device);
    }

    async goto() {
        await this.page.goto('/dashboard');
    }

    async reload() {
        await this.page.reload();
    }

    async clickOnEvent(eventName: string, orgName: string, ongoing: boolean) {
        await this.page.locator(`[data-test-id="dashboard-event-list-item-${eventName}"]`).click({ force: true });
        await this.page.waitForTimeout(5000); // Using this over waitForNavigation because it was not working with firefox.
    }

    async clickOnJoinOngoingEventButton() {
        await this.page.locator('[data-test-id="dashboard-ongoing-event-join-button"]').first().click();
        await this.page.waitForTimeout(5000); // Using this over waitForNavigation because it was not working with firefox.
    }
}
