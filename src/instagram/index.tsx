import { component, Schema } from 'ub-shared';

import Instagram from './components/instagram';
import { migrations } from './migrations';

const schema = Schema.object({
  src: Schema.string().noControls(),
  showCaption: Schema.boolean().default(true).noControls(),
});

export const Component = component({
  componentTypeId: 'instagramPost',
  displayName: 'Instagram Post',
  tags: ['media', 'newControls', 'swappable', 'isFullWidth'],
  schema,
  Component: Instagram,
  version: migrations.length,
  migrations,
});
