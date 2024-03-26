import React, { useState } from 'react'
import { startDeletion } from '../electron/ipcMain'
const { ipcRenderer } = window
import './App.css'

function App() {
  const [directory, setDirectory] = useState('')
  const [message, setMessage] = useState<string>('')

  const handleDirectoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDirectory(event.target.value)
  }

  const deleteEmptyFolders = async () => {
    if (!directory) {
      setMessage('Please enter a directory.')
      return
    }

    try {
      setMessage('Deleting empty folders...')
      const response = await startDeletion(directory)
      setMessage(response)
      // @ts-expect-error mixup
    } catch (error: Error) {
      setMessage(error.message)
    }
  }

  const promptForDirectory = () => {
    const dialogConfig = {
      title: 'Select a file',
      buttonLabel: 'This one will do',
      properties: ['openFile']
    }
    ipcRenderer
      .openDialog('showOpenDialog', dialogConfig)
      .then((result) => console.log(result))
  }

  // Listen for response from main process
  window.ipcRenderer.on('selected-directory', (event, directoryPath) => {
    setDirectory(directoryPath)
  })

  return (
    <div className="App">
      <h1>Delete Empty Folders</h1>
      <div>
        <label htmlFor="directory">Directory:</label>
        <input
          type="text"
          id="directory"
          value={directory}
          onChange={handleDirectoryChange}
        />
        <button onClick={promptForDirectory}>Select Directory</button>
      </div>
      <button onClick={deleteEmptyFolders}>Delete Empty Folders</button>
      <div>{message}</div>
    </div>
  )
}

export default App
