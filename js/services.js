module.exports = {
  "base_url" : "http://lidar.salisbury.edu/ArcGIS/services/",
  "base_url_rest": "http://lidar.salisbury.edu/ArcGIS/rest/services/",
  "statewide": [
    {
      "name": "Statewide Shaded Relief",
      "service": "ShadedRelief/MD_statewide_shadedRelief_m/MapServer",
      "identify": "DEM_m/MD_statewide_dem_m/ImageServer",
      "type": "elevation"
    },
    {
      "name": "Statewide Aspect",
      "service": "Aspect/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_statewide_aspect_m/ImageServer",
      "type": "aspect"
    },
    {
      "name": "Statewide Slope",
      "service": "Slope/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_statewide_slope_m/ImageServer",
      "type": "slope"
    },
    {
      "name": "Statewide Hillshade",
      "service": "Hillshade/MD_statewide_hillshade_m/MapServer",
      "identify": "DEM_m/MD_statewide_dem_m/ImageServer",
      "type": "hillshade"
    }
  ],
  "elevation": [
    {
      "name": "Allegany",
      "service": "ShadedRelief/MD_allegany_shadedRelief/MapServer",
      "identify": "DEM_m/MD_allegany_dem_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "ShadedRelief/MD_annearundel_shadedRelief/MapServer",
      "identify": "DEM_m/MD_annearundel_dem_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "ShadedRelief/MD_baltimore_shadedRelief/MapServer",
      "identify": "DEM_m/MD_baltimore_dem_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "ShadedRelief/MD_baltimorecity_shadedRelief/MapServer",
      "identify": "DEM_m/MD_baltimorecity_dem_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "ShadedRelief/MD_calvert_shadedRelief/MapServer",
      "identify": "DEM_m/MD_calvert_dem_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "ShadedRelief/MD_caroline_shadedRelief/MapServer",
      "identify": "DEM_m/MD_caroline_dem_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "ShadedRelief/MD_carroll_shadedRelief/MapServer",
      "identify": "DEM_m/MD_carroll_dem_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "ShadedRelief/MD_cecil_shadedRelief/MapServer",
      "identify": "DEM_m/MD_cecil_dem_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "ShadedRelief/MD_charles_shadedRelief/MapServer",
      "identify": "DEM_m/MD_charles_dem_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "ShadedRelief/MD_dorchester_shadedRelief/MapServer",
      "identify": "DEM_m/MD_dorchester_dem_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "ShadedRelief/MD_frederick_shadedRelief/MapServer",
      "identify": "DEM_m/MD_frederick_dem_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "ShadedRelief/MD_garrett_shadedRelief/MapServer",
      "identify": "DEM_m/MD_garrett_dem_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "ShadedRelief/MD_harford_shadedRelief/MapServer",
      "identify": "DEM_m/MD_harford_dem_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "ShadedRelief/MD_howard_shadedRelief/MapServer",
      "identify": "DEM_m/MD_howard_dem_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "ShadedRelief/MD_kent_shadedRelief/MapServer",
      "identify": "DEM_m/MD_kent_dem_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "ShadedRelief/MD_montgomery_shadedRelief/MapServer",
      "identify": "DEM_m/MD_montgomery_dem_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "ShadedRelief/MD_princegeorges_shadedRelief/MapServer",
      "identify": "DEM_m/MD_princegeorges_dem_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "ShadedRelief/MD_queenannes_shadedRelief/MapServer",
      "identify": "DEM_m/MD_queenannes_dem_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "ShadedRelief/MD_somerset_shadedRelief/MapServer",
      "identify": "DEM_m/MD_somerset_dem_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "ShadedRelief/MD_stmarys_shadedRelief/MapServer",
      "identify": "DEM_m/MD_stmarys_dem_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "ShadedRelief/MD_talbot_shadedRelief/MapServer",
      "identify": "DEM_m/MD_talbot_dem_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "ShadedRelief/MD_washington_shadedRelief/MapServer",
      "identify": "DEM_m/MD_washington_dem_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "ShadedRelief/MD_washingtonDC_shadedRelief/MapServer",
      "identify": "DEM_m/MD_washingtonDC_dem_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "ShadedRelief/MD_wicomico_shadedRelief/MapServer",
      "identify": "DEM_m/MD_wicomico_dem_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "ShadedRelief/MD_worcester_shadedRelief/MapServer",
      "identify": "DEM_m/MD_worcester_dem_m/ImageServer"
    }
  ],
  "slope": [
    {
      "name": "Allegany",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_allegany_slope_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_annearundel_slope_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_baltimore_slope_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_baltimorecity_slope_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_calvert_slope_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_caroline_slope_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_carroll_slope_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_cecil_slope_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_charles_slope_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_dorchester_slope_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_frederick_slope_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_garrett_slope_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_harford_slope_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_howard_slope_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_kent_slope_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_montgomery_slope_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_princegeorges_slope_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_queenannes_slope_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_somerset_slope_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_stmarys_slope_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_talbot_slope_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_washington_slope_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_washingtonDC_slope_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_wicomico_slope_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Slope/MD_statewide_slope_m/ImageServer",
      "identify": "Slope/MD_worcester_slope_m/ImageServer"
    }
  ],
  "aspect": [
    {
      "name": "Allegany",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_allegany_aspect_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_annearundel_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_baltimore_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_baltimorecity_aspect_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_calvert_aspect_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_caroline_aspect_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_carroll_aspect_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_cecil_aspect_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_charles_aspect_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_dorchester_aspect_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_frederick_aspect_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_garrett_aspect_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_harford_aspect_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_howard_aspect_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_kent_aspect_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_montgomery_aspect_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_princegeorges_aspect_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_queenannes_aspect_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_somerset_aspect_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_stmarys_aspect_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_talbot_aspect_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_washington_aspect_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_washingtonDC_aspect_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_wicomico_aspect_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Aspect/MD_statewide_aspect_m/ImageServer",
      "identify": "Aspect/MD_worcester_aspect_m/ImageServer"
    }
  ],
  "hillshade": [
    {
      "name": "Allegany",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_allegany_hillshade_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_annearundel_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_baltimore_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_baltimorecity_hillshade_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_calvert_hillshade_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_caroline_hillshade_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_carroll_hillshade_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_cecil_hillshade_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_charles_hillshade_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_dorchester_hillshade_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_frederick_hillshade_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_garrett_hillshade_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_harford_hillshade_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_howard_hillshade_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_kent_hillshade_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_montgomery_hillshade_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_princegeorges_hillshade_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_queenannes_hillshade_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_somerset_hillshade_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_stmarys_hillshade_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_talbot_hillshade_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_washington_hillshade_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_washingtonDC_hillshade_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_wicomico_hillshade_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Hillshade/MD_statewide_hillshade_m/ImageServer",
      "identify": "Hillshade/MD_worcester_hillshade_m/ImageServer"
    }
  ]
}
