module.exports = {
  "base_url" : "http://lidar.salisbury.edu/ArcGIS/services/",
  "base_url_rest": "http://lidar.salisbury.edu/ArcGIS/rest/services/",
  "statewide": [
    {
      "name": "Statewide Shaded Relief",
      "service": "Statewide/MD_statewide_shadedRelief_m/MapServer",
      "identify": "DEM_m/MD_statewide_dem_m/ImageServer",
      "type": "elevation"
    },
    {
      "name": "Statewide Aspect",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_statewide_aspect_m/ImageServer",
      "type": "aspect"
    },
    {
      "name": "Statewide Slope",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_statewide_slope_m/ImageServer",
      "type": "slope"
    },
    {
      "name": "Statewide Hillshade",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
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
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_allegany_slope_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_annearundel_slope_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_baltimore_slope_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_baltimorecity_slope_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_calvert_slope_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_caroline_slope_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_carroll_slope_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_cecil_slope_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_charles_slope_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_dorchester_slope_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_frederick_slope_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_garrett_slope_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_harford_slope_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_howard_slope_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_kent_slope_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_montgomery_slope_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_princegeorges_slope_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_queenannes_slope_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_somerset_slope_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_stmarys_slope_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_talbot_slope_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_washington_slope_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_washingtonDC_slope_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_wicomico_slope_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Slope/MD_worcester_slope_m/ImageServer"
    }
  ],
  "aspect": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_allegany_aspect_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_annearundel_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_baltimore_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_baltimorecity_aspect_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_calvert_aspect_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_caroline_aspect_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_carroll_aspect_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_cecil_aspect_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_charles_aspect_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_dorchester_aspect_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_frederick_aspect_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_garrett_aspect_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_harford_aspect_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_howard_aspect_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_kent_aspect_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_montgomery_aspect_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_princegeorges_aspect_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_queenannes_aspect_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_somerset_aspect_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_stmarys_aspect_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_talbot_aspect_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_washington_aspect_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_washingtonDC_aspect_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_wicomico_aspect_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Aspect/MD_worcester_aspect_m/ImageServer"
    }
  ],
  "hillshade": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_allegany_hillshade_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_annearundel_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_baltimore_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_baltimorecity_hillshade_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_calvert_hillshade_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_caroline_hillshade_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_carroll_hillshade_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_cecil_hillshade_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_charles_hillshade_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_dorchester_hillshade_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_frederick_hillshade_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_garrett_hillshade_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_harford_hillshade_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_howard_hillshade_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_kent_hillshade_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_montgomery_hillshade_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_princegeorges_hillshade_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_queenannes_hillshade_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_somerset_hillshade_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_stmarys_hillshade_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_talbot_hillshade_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_washington_hillshade_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_washingtonDC_hillshade_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_wicomico_hillshade_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Hillshade/MD_worcester_hillshade_m/ImageServer"
    }
  ]
}
