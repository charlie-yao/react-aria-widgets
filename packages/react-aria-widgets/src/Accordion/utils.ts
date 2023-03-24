/**
 * Gets the ID of an accordion panel based on the accordion's ID.
 *
 * @param {string} id
 * @returns {string}
 */
export function getPanelId(id: string): string {
  return `${id}-panel`;
}
