/**
 * Cross-Domain Navigation Validator Helper
 *
 * Provides utilities for validating multi-domain and multi-tab navigation scenarios
 *
 * @format
 */

/**
 * Validate that two URLs are on different domains
 * @param {string} sourceOrigin - The source domain origin
 * @param {string} targetOrigin - The target domain origin
 * @returns {void}
 */
export const validateCrossDomainNavigation = (sourceOrigin, targetOrigin) => {
  expect(targetOrigin).to.not.eq(sourceOrigin);
};

/**
 * Extract and validate a link's target domain
 * @param {string} href - The full URL from href attribute
 * @param {string} expectedDomain - The expected domain hostname
 * @returns {object} Object containing origin and hostname information
 */
export const validateLinkDomain = (href, expectedDomain = null) => {
  const targetUrl = new URL(href);
  const targetOrigin = targetUrl.origin;
  const hostname = targetUrl.hostname;

  if (expectedDomain) {
    expect(hostname).to.eq(expectedDomain);
  }

  return {
    origin: targetOrigin,
    hostname: hostname,
    url: href,
  };
};

/**
 * Validate link attributes for cross-domain navigation
 * @param {string} target - The target attribute value
 * @param {string} href - The href attribute value
 * @returns {void}
 */
export const validateLinkAttributesForCrossDomain = (target, href) => {
  expect(target).to.eq('_blank');
  expect(href).to.exist;
  expect(href).to.be.a('string');
};
