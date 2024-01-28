"use client"

import { Loader } from '@googlemaps/js-api-loader';
import React, { useEffect } from 'react';

export default function Map() {

    const mapRef = React.useRef<HTMLDivElement>(null)

    useEffect(() => {
        const initMap = async () => {

            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly"
            })

            const { Map } = await loader.importLibrary('maps') as google.maps.MapsLibrary
            // init a marker
            const { Marker } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary
            
            const position = {
                lat: 13.731145858764648,
                lng: 100.78111267089844
            }

            // map options
            const mapOptions = google.maps.MapOptions = {
                center: position,
                zoom: 17,
                mapId: 'DEMO_MAP_ID'
            }

            // setup the map
            const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

            // put up the marker
            const marker = new Marker({
                map: map,
                position: position,
                title: 'IT FACULTY',
            })
        }

        initMap()
    }, [])

    return (
        <div style={{height: '500px'}} ref={mapRef}></div>
    )
}