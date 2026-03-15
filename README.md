# NUXT + Strapi portfolio website

this is a basic nuxt and strapi portfolio boilerplate

Who is this for?
- anyone who would like to set up a quick artists portfolio, with extended ability to turn to multifunctional web.

What is inside?
- a pre-built system of categories and artworks that fits the needs of an artist who is making artworks in series or categories, but still needs a single URL for every each piece and possibility to add good looking notes and comments to the works.
- a pre-built system to create any custom page from a few basic component blocks.
- a pre-built CV pages, because that is soimething that usually every artist wants.
- a pre-built connection with Strapi CMS that allows self-management of the website.
- SEO best practices & open graph definitions for meta data.


# prerequisites

node 20

# install

1] add app keys for Strapi
2] add salt for Strapi
// follow the general rules for setting up strapi: -> https://docs.strapi.io/cms/quick-start
3] in both folders BE/FE use `yarn`
//when all steps are fine, yous hould be able to:
4 ]run strapi with `yarn develop` & run nuxt with `yarn dev` // or npm ...

the Front-end has  a few staticaly defined pages and then a set of components custom built for the 'work' (which is predesigned to fit artworks requirements) collection as this repository is supposed to be mainly an artist portfolio, so the biggest emphasis is given to presenting images of artists artworks.

# Build and CICD
is set up so far only for the Frontend, as the strapi might change its definitions of models while used on the remote, so it could get a bit messy or lead to data loss if CICD was pushing builds there.




TODO
- column layouts with nested components
- static builds
