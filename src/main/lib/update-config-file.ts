/* eslint-disable @typescript-eslint/no-explicit-any */
import { dialog } from 'electron'
import fse from 'fs-extra'
import path from 'path'

import { UpdateConfigFile } from '../../shared/interfaces'

export const readConfigFile = async (filePath: string): Promise<any> => {
  try {
    const config = await fse.readJson(filePath)
    return config
  } catch (error) {
    console.error(error)
  }
}

const updateConfig = (config: any): Promise<any> => {
  if (!config.displays) {
    console.error("Неправильный файл конфигурации. Отсутствует поле 'displays'")
  }

  config.displays = config.displays.map((display: any) => {
    if (!display.elements) return display

    display.elements = display.elements.map((element: any) => {
      if (!element.arraySrc) return element

      element.presets = element.arraySrc.map((src: string, idx: number) => ({
        id: idx + 1,
        name: `${element.name}_${idx + 1}`,
        src,
        type: 'img'
      }))

      delete element.arraySrc

      return element
    })

    return display
  })

  return config;
}

export const updateConfigFile: UpdateConfigFile = async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Файлы конфигурации ASU', extensions: ['json'] }]
  })

  if (result.canceled) return

  const filePath = result.filePaths[0]
  const fileExtension = path.extname(filePath)
  const fileName = path.basename(filePath, fileExtension)

  if (fileExtension !== '.json') return

  const config = (await readConfigFile(filePath)) as any
  const newConfig = await updateConfig(config)

  const saveResult = await dialog.showSaveDialog({
    title: 'Сохранить обновленный файл конфигурации',
    defaultPath: `${fileName} (v2).json`
  })

  if (saveResult.canceled) return

  const outputFilePath = saveResult.filePath

  try {
    return await fse.writeJson(outputFilePath, newConfig)
  } catch (error) {
    console.error(error)
  }
}
