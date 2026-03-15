import type { Schema, Struct } from '@strapi/strapi';

export interface ContentHeading extends Struct.ComponentSchema {
  collectionName: 'components_content_headings';
  info: {
    description: '';
    displayName: 'Heading';
    icon: 'heading';
  };
  attributes: {
    level: Schema.Attribute.Enumeration<['h1', 'h2', 'h3', 'h4']> &
      Schema.Attribute.DefaultTo<'h2'>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentHero extends Struct.ComponentSchema {
  collectionName: 'components_content_heroes';
  info: {
    description: '';
    displayName: 'Hero';
    icon: 'landscape';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    margin: Schema.Attribute.Enumeration<
      ['none', 'small', 'medium', 'large', 'xlarge']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ContentImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_image_blocks';
  info: {
    description: '';
    displayName: 'Image Block';
    icon: 'picture';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ContentParagraph extends Struct.ComponentSchema {
  collectionName: 'components_content_paragraphs';
  info: {
    description: '';
    displayName: 'Paragraph';
    icon: 'align-left';
  };
  attributes: {
    text: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'content.heading': ContentHeading;
      'content.hero': ContentHero;
      'content.image-block': ContentImageBlock;
      'content.paragraph': ContentParagraph;
    }
  }
}
