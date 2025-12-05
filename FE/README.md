# Nuxt 3 Project

this repository was migrated from version 2 to version 3, some remnants are possible.

For detailed explanation on how things work, check out the [Nuxt 3 documentation](https://nuxt.com/docs).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as stylesheets, images, or fonts. Assets in this directory are processed by build tools like Vite.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Nuxt automatically imports any components in this directory, so you don't need to manually import them in your pages or other components.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/components).

### `composables`

The composables directory contains your Vue composables that are auto-imported throughout your application. This is the recommended place to store reusable composition functions.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/composables).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically using file-based routing.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/pages).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js application. This is the place to add Vue plugins and to inject functions or constants.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/plugins).

### `public`

This directory contains your static files. Each file inside this directory is mapped to `/` and served as-is.

Example: `/public/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/public).

### `server`

The server directory contains API endpoints and server middleware. Nuxt automatically registers files in this directory to create API routes and server functionality.

More information about the usage of this directory in [the documentation](https://nuxt.com/docs/guide/directory-structure/server).

## State Management

Nuxt 3 no longer auto-activates Vuex. The recommended approach for state management is [Pinia](https://pinia.vuejs.org/). You can easily integrate Pinia using the `@pinia/nuxt` module.

More information in [the documentation](https://nuxt.com/docs/getting-started/state-management).