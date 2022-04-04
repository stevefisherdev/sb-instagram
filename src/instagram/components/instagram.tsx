import React, { useEffect, useMemo } from 'react';
import { WithControls, Script } from 'smart-builder-sdk';
import { ComponentProps, WithStylesProps } from 'unbounce-smart-builder-sdk-types';

import { getEmbedId } from '../../control/util/get-embed-id';
import { DataStructure } from '../../types';
import { Embed } from './embed';
import { Placeholder } from './placeholder';
import { Overlay } from './styled';

const reloadEmbeds = () => {
  const win = window as any;
  win.instgrm && win.instgrm.Embeds.process();
};

const instagram_embed_url = {
  scriptId: 'instagramEmbed',
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

export default WithControls(Instagram, []);
