export const useWorks = () => {
  const works = useState('worksData', () => [])
  const series = useState('seriesData', () => [])
  const isWorksLoaded = useState('isWorksLoaded', () => false)
  const isCatsLoaded = useState('isCatsLoaded', () => false)
  return { works, series, isWorksLoaded, isCatsLoaded }
}
