import { registerComponent, registerControl } from 'ub-shared';

import { Control } from './control';
import { Component } from './instagram';

/**
 * Feel free to register whatever you need to export.
 * IMPORTANT: Registration ordering is important.
 */
registerControl(Control);
registerComponent(Component);
