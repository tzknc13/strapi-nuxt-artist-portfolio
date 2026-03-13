import type { Attribute, Schema } from '@strapi/strapi';

export interface ContentHeading extends Schema.Component {
  collectionName: 'components_content_headings';
  info: {
    description: '';
    displayName: 'Heading';
    icon: 'heading';
  };
  attributes: {
    level: Attribute.Enumeration<['h1', 'h2', 'h3', 'h4']> &
      Attribute.DefaultTo<'h2'>;
    text: Attribute.String & Attribute.Required;
  };
}

export interface ContentImageBlock extends Schema.Component {
  collectionName: 'components_content_image_blocks';
  info: {
    description: '';
    displayName: 'Image Block';
    icon: 'picture';
  };
  attributes: {
    caption: Attribute.String;
    image: Attribute.Media<'images'>;
  };
}

export interface ContentParagraph extends Schema.Component {
  collectionName: 'components_content_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
    icon: 'align-left';
  };
  attributes: {
    text: Attribute.RichText;
  };
}

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
      'content.heading': ContentHeading;
      'content.image-block': ContentImageBlock;
      'content.paragraph': ContentParagraph;
      'textlists.press': TextlistsPress;
      'textlists.text-list': TextlistsTextList;
    }
  }
}
