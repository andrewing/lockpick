// 1. import `NextUIProvider` component
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { Switch, useTheme } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useTheme as useNextTheme } from 'next-themes'


function MyApp({ Component, pageProps }) {
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const darkTheme = createTheme({
    type: 'dark',
  })
  setTheme("dark")
  return (
    <NextThemesProvider
      defaultTheme="dark"
      attribute="class"
      value={{
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;