export const useColorMode = () => {
  const isDark = useState('colorMode', () => false)

  if (import.meta.client) {
    watchEffect(() => {
      document.documentElement.classList.toggle('dark', isDark.value)
    })
  }

  const toggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem('colorMode', isDark.value ? 'dark' : 'light')
  }

  return { isDark, toggle }
}
