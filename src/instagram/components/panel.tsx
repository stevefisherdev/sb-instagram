import React, { useState } from 'react';
import { DataStructure } from 'src/types';
import { ControlPanelProps } from 'unbounce-smart-builder-sdk-types';

import { InputField, Label, Toggle } from 'config/global-dependencies/smart-builder-components';

import { useUIEvents } from '../../events';
import { getEmbedId } from '../../util/get-embed-id';
import { StyledFormControl, StyledToggleLabel, Info, Error } from './styled';

export const Panel = ({ data, dispatch }: ControlPanelProps<DataStructure>) => {
  const { src, showCaption } = data;
  const [tempSrc, setTempSrc] = useState(src);
  const { sendEvent } = useUIEvents();

  const onUrlChange = () => {
    dispatch((api) => {
      api.get('src').set(tempSrc);
    });

    sendEvent({
      eventName: 'SMART_BUILDER_SMART_APPS_INSTAGRAM_POST_URL_CHANGED',
      workflow: 'smart_builder_apps',
      eventData: { description: 'Post URL changed' },
    });
  };

  const onShowCaptionToggle = (value: boolean) => {
    dispatch((api) => {
      api.get('showCaption').set(value);
    });

    sendEvent({
      eventName: 'SMART_BUILDER_SMART_APPS_INSTAGRAM_SHOW_CAPTION_TOGGLED',
      workflow: 'smart_builder_apps',
      eventData: { description: 'Show caption toggled', value },
    });
  };

  const urlError = tempSrc && !getEmbedId(tempSrc);

  return (
    <>
      <StyledFormControl>
        <Label>Instagram Post URL</Label>
        <InputField
          type="text"
          id="instagram-post-input"
          value={tempSrc}
          onChange={({ currentTarget: { value } }) => setTempSrc(value)}
          onBlur={onUrlChange}
          placeholder="Enter an Instagram post URL..."
          minimal
        />
      </StyledFormControl>

      {urlError && <Error>Oops! That URL doesn&apos;t look right. Please check it is correct and try again.</Error>}

      <Info>Enter the URL for your Instagram post and we&apos;ll add it to your page here</Info>

      <StyledToggleLabel>
        Include caption
        <Toggle
          value={showCaption}
          onClick={() => onShowCaptionToggle(!showCaption)}
          data-testid="instagram-show-caption"
        />
      </StyledToggleLabel>
    </>
  );
};
