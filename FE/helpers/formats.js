// when type not specified it returns original url
export default function (baseUrl, imageObject, type = false) {

  // Get baseUrl from runtime config and override any passed baseUrl
  const config = useRuntimeConfig()
  baseUrl = config.public.baseUrl

  
  if (!imageObject) {
    console.error('no image ')
    return baseUrl
  }


  // hello strapi, how are you today?
  const imageData = imageObject.data?.attributes ? imageObject.data.attributes : imageObject.attributes ? imageObject.attributes : null

  const imageUrl = findFormat(imageData, type)
  return `${baseUrl}${imageUrl}`
}

function  findFormat(imgO, type) {
  if (!imgO.formats) {
    return imgO.url
  }

  if (imgO.formats && imgO.formats.large && type === 'large') {
    return imgO.formats.large.url
  } else if (imgO.formats && imgO.formats.medium && type === 'medium') {
    return imgO.formats.medium.url
  } else if (imgO.formats && imgO.formats.small && type === 'small') {
    return imgO.formats.small.url
  } else {
    return imgO.url
  }
}
