import { useEffect, useState } from 'react';
import './App.css';
import { invoke } from '@tauri-apps/api';
import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material';

function App() {
  const [packagesInstalled, setPackagesInstalled] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState(0);

  useEffect(function() {
    invoke("get_installed_packages").then((packages: any) => {
      setPackagesInstalled(packages);
    }).catch(err => {
      console.log(err)
    })
  }, [])

  const packagesCards = packagesInstalled?.map((pkg: string) => {
      return (
        <p>
          {pkg}
        </p>
      )
  })

  return (
    <Box className="App">
      <Box display="flex">
        <Tabs
          orientation="vertical"
          color="white"
          value={currentTab}
          onChange={(_, newValue) => {setCurrentTab(newValue)}}
          sx={{
            backgroundColor: "#4b6383"
          }}
          TabIndicatorProps={{
            sx: {
              backgroundColor: "snow",
              height: "3px",
            }
          }}
        >
          <Tab label="Installés" value={0} color="white"/>
          <Tab label="Rechercher" value={1} />
        </Tabs>
        <Box padding="10px">
          <Box display="flex" borderBottom="solid black 2px">
            <h1 style={{fontSize: "1.5em"}}>Packages installed</h1>
          </Box>
          <Box overflow="auto">
            {packagesCards}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default App
