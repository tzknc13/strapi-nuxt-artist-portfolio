export default defineNuxtPlugin(() => {
  const saved = localStorage.getItem('colorMode')
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isDark = saved ? saved === 'dark' : prefersDark

  const state = useState('colorMode', () => isDark)
  state.value = isDark
  document.documentElement.classList.toggle('dark', isDark)
})
