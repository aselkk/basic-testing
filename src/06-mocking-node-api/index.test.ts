// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn()
    const timeout = 1000

    doStuffByTimeout(callback, timeout)

    jest.advanceTimersByTime(timeout)

    expect(callback).toHaveBeenCalled()
  })

  test('should call callback only after timeout', () => {
    const callback = jest.fn()
    const timeout = 1000

    doStuffByTimeout(callback, timeout)

    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(timeout)

    expect(callback).toBeCalled()
  })
})

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  test('should set interval with provided callback and interval', () => {
    const callback = jest.fn()
    const interval = 1000

    doStuffByInterval(callback, interval)

    jest.advanceTimersByTime(interval)

    expect(callback).toHaveBeenCalledTimes(1)
  })

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn()
    const interval = 1000

    doStuffByInterval(callback, interval)

    expect(callback).not.toBeCalled()

    jest.advanceTimersByTime(interval)
    expect(callback).toHaveBeenCalledTimes(1)

    jest.advanceTimersByTime(interval)
    expect(callback).toHaveBeenCalledTimes(2)
  })
})

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(require('path'), 'join')
    const pathToFile = 'testFile.txt'

    await readFileAsynchronously(pathToFile)

    expect(joinSpy).toHaveBeenCalledWith(expect.stringContaining(__dirname), pathToFile)
  })

  test('should return null if file does not exist', async () => {
    const pathToFile = 'nonexistentFile.txt'

    const result = await readFileAsynchronously(pathToFile)

    expect(result).toBeNull()
  })

  test('should return file content if file exists', async () => {
    const pathToFile = 'existingFile.txt'
    const fileContent = 'This is the content of the file'

    jest.spyOn(require('fs'), 'existsSync').mockReturnValue(true)
    jest.spyOn(require('fs').promises, 'readFile').mockResolvedValue(Buffer.from(fileContent))

    const result = await readFileAsynchronously(pathToFile)

    expect(result).toEqual(fileContent)
  });
});
