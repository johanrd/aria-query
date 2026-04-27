/**
 * @flow
 */

import rolesMap from './rolesMap';

// Roles that are widget descendants but do not accept user input in practice.
const OVERRIDE_NON_INTERACTIVE: Set<string> = new Set(['progressbar']);

// Roles that are not widget descendants but do accept user input in practice.
const interactiveRoles: Set<string> = new Set(['toolbar']);

for (const [name, def] of rolesMap.entries()) {
  if (
    !def.abstract &&
    !OVERRIDE_NON_INTERACTIVE.has(name) &&
    def.superClass.some((chain) => chain.indexOf('widget') !== -1)
  ) {
    interactiveRoles.add(name);
  }
}

export default function isInteractiveRole(role: string): boolean {
  return interactiveRoles.has(role);
}
