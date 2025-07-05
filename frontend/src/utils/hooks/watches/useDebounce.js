import React from 'react'
import { useEffect, useState } from 'react'
const useDebounce = ({ key, delay }) => {
    const [debouncedValue, setDebouncedValue] = useState(key)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(key)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [key, delay])

    return debouncedValue
}

export default useDebounce