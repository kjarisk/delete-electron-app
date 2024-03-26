const { ipcRenderer } = window

export const startDeletion = (directory: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('start-deletion', directory)

    ipcRenderer.on('deletion-complete', (event, arg) => {
      resolve(arg)
    })

    ipcRenderer.on('deletion-error', (event, arg) => {
      reject(arg)
    })
  })
}

