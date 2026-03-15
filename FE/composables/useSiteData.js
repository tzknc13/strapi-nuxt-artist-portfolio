export const useSiteData = () => {
  const artistName = useState('siteArtistName', () => '')
  const homepageData = useState('siteHomepageData', () => ({}))
  const defaultMetaDescription = useState('siteDefaultMetaDescription', () => '')
  const defaultMetaImageUrl = useState('siteDefaultMetaImageUrl', () => '')
  return { artistName, homepageData, defaultMetaDescription, defaultMetaImageUrl }
}
