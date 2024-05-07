import { test, expect } from '@local/common/utils/fixtures';

export default function userTests() {
    test.fixme('I can see an event I created in the dashboard', async ({ dashboardPageUser }) => {
        await dashboardPageUser.goto();
        await expect(dashboardPageUser.page).toHaveURL('/dashboard');
    });
    // TODO: add more tests here
}
