/**
 * Task 1: Multi-Tab and Multi-Domain Navigation
 *
 * Note:
 * The provided "Click Here" link opens a new browser tab but remains within
 * the same domain (the-internet.herokuapp.com). This makes it a multi-window
 * scenario rather than a true multi-domain navigation flow.
 *
 * To demonstrate cross-domain handling, the "Elemental Selenium" link was used
 * instead. This link opens a new browser tab and navigates to a different
 * domain (elementalselenium.com), allowing validation of both new-tab behavior
 * and cross-origin navigation.
 *
 * @format
 */

import WindowsPage from '../pages/WindowsPage';
import {
  validateCrossDomainNavigation,
  validateLinkDomain,
} from '../support/helpers/crossDomainValidator';

const windowsPage = new WindowsPage();

describe('Task 1 — New 1: Tab Navigation (Same & Cross Domain)', () => {
  beforeEach(() => {
    windowsPage.visit();
  });

  /**
   * Test 1: Multi-tab navigation on same domain
   *
   * "Click here" opens a new tab on the same domain.
   */
  it('Should navigate to new window page when clicking "Click here" link', () => {
    windowsPage.clickOnClickHereLink();
    windowsPage.verifyNewWindowPage();
  });

  /**
   * Test 2: Cross-domain link validation
   *
   * "Elemental Selenium" opens a new tab on a different domain.
   */
  it('Should validate Elemental Selenium link opens in a new tab and points to a different domain', () => {
    const sourceOrigin = 'https://the-internet.herokuapp.com';

    windowsPage.getElementalSeleniumLinkHref().then((href) => {
      const linkInfo = validateLinkDomain(href, 'elementalselenium.com');

      validateCrossDomainNavigation(sourceOrigin, linkInfo.origin);
    });
  });
});
