import * as React from 'react'

export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  loadingValue: T = defaultValue,
  serializer: (value: T) => string = jsonSerializer<T>,
  deserializer: (saved: string) => T = jsonDeserializer<T>
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = React.useState<T>(loadingValue);
  
  React.useEffect(() => {
    const storageValue = getStorageValue(key, defaultValue, deserializer)
    setValue(storageValue)
  }, [key, defaultValue, deserializer]);

  React.useEffect(() => {
    if (value !== loadingValue && value !== defaultValue) {
      localStorage.setItem(key, serializer(value));
    }
  }, [key, value, defaultValue, loadingValue, serializer]);

  return [value, setValue]
}

function getStorageValue<T>(
  key: string,
  defaultValue: T,
  deserializer: (saved: string) => T
) {
  const saved = localStorage.getItem(key)
  if (saved) {
    return deserializer(saved)
  }
  return defaultValue
}

function jsonSerializer<T>(value: T) {
  return JSON.stringify(value)
}

function jsonDeserializer<T>(saved: string) {
  return JSON.parse(saved) as T
}
