import React, { useEffect, useMemo } from 'react';
import { WithControls, Script, ControlButton } from 'smart-builder-sdk';
import { ComponentProps, WithStylesProps } from 'unbounce-smart-builder-sdk-types';

import { CogIcon } from '../../icons/cog-icon';
import { DataStructure } from '../../types';
import { getEmbedId } from '../../util/get-embed-id';
import { Embed } from './embed';
import { Panel } from './panel';
import { Placeholder } from './placeholder';
import { Overlay } from './styled';

const reloadEmbeds = () => {
  const win = window as any;
  win.instgrm && win.instgrm.Embeds.process();
};

const instagram_embed_url = {
  scriptId: 'instagramPost',
  src: '//www.instagram.com/embed.js',
  onloadMethod: 'window.instgrm && window.instgrm.Embeds.process()',
  condition: true,
};

const Instagram = ({ data, mode, className }: ComponentProps<DataStructure, WithStylesProps>) => {
  const { src, showCaption } = data;
  const postId = useMemo(() => getEmbedId(src), [src]);
  useEffect(() => reloadEmbeds, [postId, showCaption]);

  return (
    <div data-testid="instagram-content" className={className}>
      {mode.type === 'edit' && <Overlay />}
      {postId ? (
        <>
          <Embed postId={postId} showCaption={showCaption} />
          <Script mode={mode.type} externalScript={instagram_embed_url} dependencies={[]} />
        </>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

const label = 'Add Instagram Post';

export default WithControls(Instagram, [
  {
    id: 'instagram-embed-control',
    label,
    Button: (props) => (
      <ControlButton label={label} active={false} {...props}>
        <CogIcon />
      </ControlButton>
    ),
    Panel,
    type: 'dropdown',
  },
]);
