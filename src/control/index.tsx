import React, { useState } from 'react';
import { DataStructure } from 'src/types';
import styled from 'styled-components';
import { ComponentProps } from 'unbounce-smart-builder-sdk-types';

import { InputField, Label, Toggle } from 'config/global-dependencies/smart-builder-components';

import { useUIEvents } from '../events';
import { InstagramIcon } from '../shared/components/instagram-icon';
import { Info, Error } from './styled';
import { getEmbedId } from './util/get-embed-id';

const StyledFormControl = styled.div`
  margin-bottom: 10px;
`;

const StyledToggleLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 15px;
  color: #505050;
`;

export const Control = {
  controlId: 'instagramEmbedControl',
  Component: ({ data, dispatch }: ComponentProps<DataStructure>) => {
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
          />
        </StyledFormControl>

        {urlError && <Error>Oops! That URL doesn&apos;t look right. Please check it is correct and try again.</Error>}

        <StyledToggleLabel>
          Include caption
          <Toggle
            value={showCaption}
            onClick={() => onShowCaptionToggle(!showCaption)}
            data-testid="instagram-show-caption"
          />
        </StyledToggleLabel>

        <Info>Enter the URL for your Instagram post and we&apos;ll add it to your page here</Info>
      </>
    );
  },
  options: { icon: <InstagramIcon />, label: 'Add Instagram Post' },
};
