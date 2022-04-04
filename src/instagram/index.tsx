import { component, Schema } from 'ub-shared';

import Instagram from './components/instagram';
import { migrations } from './migrations';

const schema = Schema.object({
  src: Schema.string().noControls(),
  showCaption: Schema.boolean().default(true).noControls(),
}).withControl('instagramEmbedControl');

export const Component = component({
  componentTypeId: 'instagramEmbed',
  displayName: 'Instagram',
  tags: ['media', 'newControls', 'swappable'],
  schema,
  Component: Instagram,
  version: migrations.length,
  migrations,
});
