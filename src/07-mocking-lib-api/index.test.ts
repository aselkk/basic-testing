// Uncomment the code below and write your tests
import axios, { AxiosInstance } from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllTimers()
  })

  jest.mock('axios')
  
  test('should create instance with provided base url', async () => {
    const mockAxiosInstance = { get: jest.fn() } as unknown as AxiosInstance 
    axios.create = jest.fn(() => mockAxiosInstance)

  const mockResponse = { data: 'mocked data' };
  (mockAxiosInstance.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockResponse))

    await throttledGetDataFromApi('/')

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })
  });

  test('should perform request to correct provided url', async () => {
    const mockAxiosInstance = { get: jest.fn() } as unknown as AxiosInstance;
    axios.create = jest.fn(() => mockAxiosInstance);

    const mockResponse = { data: 'mocked data' };
    (mockAxiosInstance.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockResponse));

    await throttledGetDataFromApi('/');

    throttledGetDataFromApi.flush();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/');
  });

  test('should return response data', async () => {
    const mockAxiosInstance = { get: jest.fn() } as unknown as AxiosInstance;
    axios.create = jest.fn(() => mockAxiosInstance);

    const mockResponseData = 'mocked data';
    const mockResponse = { data: mockResponseData };
    (mockAxiosInstance.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockResponse));

    const result = await throttledGetDataFromApi('/');

    expect(result).toEqual(mockResponseData);
  });
});
