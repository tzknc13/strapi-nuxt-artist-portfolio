import type { Attribute, Schema } from '@strapi/strapi';

export interface ContentColumn extends Schema.Component {
  collectionName: 'components_content_columns';
  info: {
    description: '';
    displayName: 'Column';
    icon: 'layout';
  };
  attributes: {
    heading: Attribute.Component<'content.heading'>;
    image: Attribute.Component<'content.image-block'>;
    paragraph: Attribute.Component<'content.paragraph'>;
  };
}

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

export interface ContentHero extends Schema.Component {
  collectionName: 'components_content_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'landscape';
  };
  attributes: {
    image: Attribute.Media<'images'>;
    margin: Attribute.Enumeration<
      ['none', 'small', 'medium', 'large', 'xlarge']
    > &
      Attribute.DefaultTo<'medium'>;
    subtitle: Attribute.String;
    title: Attribute.String;
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

export interface ContentThreeColumns extends Schema.Component {
  collectionName: 'components_content_three_columns';
  info: {
    description: '';
    displayName: 'Three Columns';
    icon: 'layout';
  };
  attributes: {
    center: Attribute.Component<'content.column'>;
    left: Attribute.Component<'content.column'>;
    right: Attribute.Component<'content.column'>;
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
      'content.column': ContentColumn;
      'content.heading': ContentHeading;
      'content.hero': ContentHero;
      'content.image-block': ContentImageBlock;
      'content.paragraph': ContentParagraph;
      'content.three-columns': ContentThreeColumns;
      'textlists.press': TextlistsPress;
      'textlists.text-list': TextlistsTextList;
    }
  }
}
