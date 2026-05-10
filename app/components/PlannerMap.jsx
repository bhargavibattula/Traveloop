"use client";

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function PlannerMap({ itinerary = [], center, selectedId, onSelect }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      const mapCenter = center || [0, 0];
      const map = L.map(mapRef.current).setView(mapCenter, 13);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear existing markers and polyline
    Object.values(markersRef.current).forEach(marker => {
      map.removeLayer(marker);
    });
    markersRef.current = {};

    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    // Add markers
    itinerary.forEach((item, idx) => {
      if (!item.location?.lat || !item.location?.lng) return;

      const isActive = selectedId === item.id;
      const icon = L.divIcon({
        className: '',
        html: `<div class="numbered-pin ${isActive ? 'active' : ''}"><span>${idx + 1}</span></div>`,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([item.location.lat, item.location.lng], { 
        icon,
        zIndexOffset: isActive ? 1000 : 0
      }).addTo(map);
      
      const popupContent = document.createElement('div');
      popupContent.style.fontFamily = 'Outfit, sans-serif';
      popupContent.style.minWidth = '140px';
      popupContent.innerHTML = `
        <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px;">${item.title || ''}</div>
        <div style="font-size: 12px; color: #8d99ae;">${item.location.name || ''}</div>
        <div style="font-size: 11px; font-weight: 700; color: #ff6b6b; margin-top: 6px;">${item.cost || ''}</div>
      `;

      marker.bindPopup(popupContent);
      
      marker.on('click', () => {
        if (onSelect) onSelect(item);
      });

      markersRef.current[item.id] = marker;
    });

    // Add polyline
    const latlngs = itinerary
      .filter(item => item.location?.lat && item.location?.lng)
      .map(item => [item.location.lat, item.location.lng]);

    if (latlngs.length > 0) {
      polylineRef.current = L.polyline(latlngs, {
        color: '#ff6b6b',
        weight: 3,
        opacity: 0.35,
        dashArray: '8, 12'
      }).addTo(map);
    }

    // Handle selection change and bounds
    if (selectedId) {
      const selectedItem = itinerary.find(i => i.id === selectedId);
      if (selectedItem?.location?.lat && selectedItem?.location?.lng) {
        map.setView([selectedItem.location.lat, selectedItem.location.lng], 15, { animate: true });
        
        // Open popup for selected item
        const marker = markersRef.current[selectedId];
        if (marker && !marker.isPopupOpen()) {
           marker.openPopup();
        }
      }
    } else if (latlngs.length > 0) {
        // Automatically fit bounds if no item is selected
        const bounds = L.latLngBounds(latlngs);
        map.fitBounds(bounds, { padding: [50, 50] });
    }

  }, [itinerary, center, selectedId, onSelect]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .planner-map-root {
          height: 100%;
          width: 100%;
        }
        .numbered-pin {
          background: #ff6b6b;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          font-family: 'Outfit', sans-serif;
          border: 3px solid white;
          transform: rotate(-45deg);
          box-shadow: 0 4px 12px rgba(255,107,107,0.35);
          transition: transform 0.2s, background-color 0.2s;
        }
        .numbered-pin span {
          transform: rotate(45deg);
          display: block;
        }
        .numbered-pin.active {
          background: #2b2d42;
          transform: rotate(-45deg) scale(1.3);
          box-shadow: 0 6px 20px rgba(43,45,66,0.4);
        }
      `}} />
      <div ref={mapRef} className="planner-map-root" />
    </>
  );
}
