import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../../../axios-client'
const useFetchDetailBrand = () => {
    const { brandSlug } = useParams()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [brand, setBrand] = useState(null)

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const { data } = await axiosClient.get(`api/client/brands/${brandSlug}`)
                setBrand(data.data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (!brandSlug) {
            setError('Brand slug is required')
            setLoading(false)
            return
        }

        fetchBrand()
    }, [brandSlug])

    return { brand, loading, error }
}

export default useFetchDetailBrand