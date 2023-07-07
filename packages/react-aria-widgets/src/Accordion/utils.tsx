/**
 * Gets the ID of an accordion panel based on the accordion's ID.
 */
export function getPanelId(id: string) {
  return `${id}-panel`;
}

export const VALID_PANEL_ELEMENTS = [ 'section', 'div' ] as const;
export const DEFAULT_PANEL_ELEMENT = VALID_PANEL_ELEMENTS[0];
