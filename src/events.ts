import { createUIEventTracking } from 'smart-builder-sdk';

interface EventName {
  SMART_BUILDER_SMART_APPS_INSTAGRAM_POST_URL_CHANGED: 'Post URL changed';
  SMART_BUILDER_SMART_APPS_INSTAGRAM_SHOW_CAPTION_TOGGLED: 'Show caption toggled';
}

interface Workflow {
  smart_builder_apps: 'Apps interactions and flows';
}

export const { useUIEvents, UIEventProvider } = createUIEventTracking<EventName, Workflow>();
