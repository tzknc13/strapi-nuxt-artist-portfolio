'use strict';

/**
 * readers-diary service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::readers-diary.readers-diary');