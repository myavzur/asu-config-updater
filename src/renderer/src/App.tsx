import { Button } from './components/button'
import { Layout } from './components/layout'

function App(): JSX.Element {
  const handleUpdateConfigFile = async (): Promise<void> => {
    const res = await window.electron.ipcRenderer.send("updateConfigFile")
    console.log(res)
  }

  return (
    <Layout>
      <h1 className="text-2xl mb-5">💖 Hello World!</h1>
      <p className="mb-5">Welcome to your Electron application.</p>

      <Button onClick={handleUpdateConfigFile}>Выберите файл конфигурации</Button>
    </Layout>
  )
}

export default App
