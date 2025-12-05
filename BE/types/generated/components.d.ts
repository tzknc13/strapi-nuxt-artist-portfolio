import type { Attribute, Schema } from '@strapi/strapi';

export interface TextlistsPress extends Schema.Component {
  collectionName: 'components_textlists_presses';
  info: {
    description: '';
    displayName: 'text_with_header';
    icon: 'align-left';
  };
  attributes: {
    header: Attribute.String;
    richtext: Attribute.RichText;
  };
}

export interface TextlistsTextList extends Schema.Component {
  collectionName: 'components_textlists_text_lists';
  info: {
    description: '';
    displayName: 'text_list';
    icon: 'align-center';
  };
  attributes: {
    header: Attribute.String;
    text: Attribute.Component<'textlists.press', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'textlists.press': TextlistsPress;
      'textlists.text-list': TextlistsTextList;
    }
  }
}
