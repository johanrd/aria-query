/**
 * @flow
 */

import rolesMap from './rolesMap';

// Roles that are widget descendants but do not accept user input in practice.
const OVERRIDE_NON_INTERACTIVE: Array<string> = ['progressbar'];

// Roles that are not widget descendants but do accept user input in practice.
const OVERRIDE_INTERACTIVE: Array<string> = ['toolbar'];

const interactiveRoles: Array<string> = OVERRIDE_INTERACTIVE.slice();

for (const [name, def] of rolesMap.entries()) {
  if (
    !def.abstract &&
    OVERRIDE_NON_INTERACTIVE.indexOf(name) === -1 &&
    def.superClass.some((chain) => chain.indexOf('widget') !== -1)
  ) {
    interactiveRoles.push(name);
  }
}

export default function isInteractiveRole(role: string): boolean {
  return interactiveRoles.indexOf(role) !== -1;
}
