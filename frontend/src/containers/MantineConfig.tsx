import React, { ReactNode } from 'react'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useDarkMode } from 'usehooks-ts'

interface Props {
  children: ReactNode
}

function MantineConfig(props: Props) {
  const theme = useDarkMode()
  const colorScheme = theme.isDarkMode ? 'dark' : 'light'

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={theme.toggle}>
      <MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles>
        {props.children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default MantineConfig
