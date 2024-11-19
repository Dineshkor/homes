'use client'
import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface MapProps {
  center: google.maps.LatLngLiteral
  zoom: number
  markers?: Array<{
    position: google.maps.LatLngLiteral
    title: string
  }>
}

export default function Map({ center, zoom, markers }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map>()

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: 'weekly'
    })

    loader.load().then(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        markers?.forEach(marker => {
          new google.maps.Marker({
            position: marker.position,
            map: mapInstanceRef.current,
            title: marker.title,
            animation: google.maps.Animation.DROP
          })
        })
      }
    })
  }, [center, zoom, markers])

  return <div ref={mapRef} className="w-full h-full" />
} 