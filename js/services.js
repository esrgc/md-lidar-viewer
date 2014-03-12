module.exports = {
  "base_url" : "http://lidar.salisbury.edu/ArcGIS/services/",
  "base_url_rest": "http://lidar.salisbury.edu/ArcGIS/rest/services/",
  "statewide": [
    {
      "name": "Statewide Shaded Relief",
      "service": "Statewide/MD_statewide_shadedRelief_m/MapServer",
      "identify": "Elevation/MD_statewide_dem_m/ImageServer",
      "type": "elevation"
    },
    {
      "name": "Statewide Aspect",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_statewide_aspect_m/ImageServer",
      "type": "aspect"
    },
    {
      "name": "Statewide Slope",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_statewide_slope_m/ImageServer",
      "type": "slope"
    },
    {
      "name": "Statewide Hillshade",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_statewide_dem_m/ImageServer",
      "type": "hillshade"
    }
  ],
  "slope": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_allegany_slope_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_annearundel_slope_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_baltimore_slope_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_baltimorecity_slope_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_calvert_slope_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_caroline_slope_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_carroll_slope_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_cecil_slope_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_charles_slope_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_dorchester_slope_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_frederick_slope_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_garrett_slope_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_harford_slope_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_howard_slope_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_kent_slope_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_montgomery_slope_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_princegeorges_slope_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_queenannes_slope_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_somerset_slope_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_stmarys_slope_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_talbot_slope_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_washington_slope_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_washingtonDC_slope_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_wicomico_slope_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_worcester_slope_m/ImageServer"
    }
  ],
  "elevation": [
    {
      "name": "Allegany",
      "service": "ShadedRelief/MD_allegany_shadedRelief/MapServer",
      "identify": "Elevation/MD_allegany_dem_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "ShadedRelief/MD_annearundel_shadedRelief",
      "identify": "Elevation/MD_annearundel_demStretched_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "ShadedRelief/MD_baltimore_shadedRelief/MapServer",
      "identify": "Elevation/MD_baltimore_demStretched_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "ShadedRelief/MD_baltimorecity_shadedRelief/MapServer",
      "identify": "Elevation/MD_baltimorecity_demStretched_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "ShadedRelief/MD_calvert_shadedRelief/MapServer",
      "identify": "Elevation/MD_calvert_demStretched_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "ShadedRelief/MD_caroline_shadedRelief/MapServer",
      "identify": "Elevation/MD_caroline_demStretched_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "ShadedRelief/MD_carroll_shadedRelief/MapServer",
      "identify": "Elevation/MD_carroll_demStretched_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Elevation/MD_cecil_demStretched_m/ImageServer",
      "identify": "Elevation/MD_cecil_demStretched_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Elevation/MD_charles_demStretched_m/ImageServer",
      "identify": "Elevation/MD_charles_demStretched_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Elevation/MD_dorchester_demStretched_m/ImageServer",
      "identify": "Elevation/MD_dorchester_demStretched_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Elevation/MD_frederick_demStretched_m/ImageServer",
      "identify": "Elevation/MD_frederick_demStretched_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Elevation/MD_garrett_demStretched_m/ImageServer",
      "identify": "Elevation/MD_garrett_demStretched_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Elevation/MD_harford_demStretched_m/ImageServer",
      "identify": "Elevation/MD_harford_demStretched_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Elevation/MD_howard_demStretched_m/ImageServer",
      "identify": "Elevation/MD_howard_demStretched_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Elevation/MD_kent_demStretched_m/ImageServer",
      "identify": "Elevation/MD_kent_demStretched_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Elevation/MD_montgomery_demStretched_m/ImageServer",
      "identify": "Elevation/MD_montgomery_demStretched_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Elevation/MD_princegeorges_demStretched_m/ImageServer",
      "identify": "Elevation/MD_princegeorges_demStretched_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Elevation/MD_queenannes_demStretched_m/ImageServer",
      "identify": "Elevation/MD_queenannes_demStretched_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Elevation/MD_somerset_demStretched_m/ImageServer",
      "identify": "Elevation/MD_somerset_demStretched_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Elevation/MD_stmarys_demStretched_m/ImageServer",
      "identify": "Elevation/MD_stmarys_demStretched_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Elevation/MD_talbot_demStretched_m/ImageServer",
      "identify": "Elevation/MD_talbot_demStretched_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Elevation/MD_washington_demStretched_m/ImageServer",
      "identify": "Elevation/MD_washington_demStretched_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Elevation/MD_washingtonDC_demStretched_m/ImageServer",
      "identify": "Elevation/MD_washingtonDC_demStretched_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Elevation/MD_wicomico_demStretched_m/ImageServer",
      "identify": "Elevation/MD_wicomico_demStretched_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Elevation/MD_worcester_demStretched_m/ImageServer",
      "identify": "Elevation/MD_worcester_demStretched_m/ImageServer"
    }
  ],
  "aspect": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_allegany_aspect_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_annearundel_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_baltimore_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_baltimorecity_aspect_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_calvert_aspect_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_caroline_aspect_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_carroll_aspect_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_cecil_aspect_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_charles_aspect_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_dorchester_aspect_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_frederick_aspect_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_garrett_aspect_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_harford_aspect_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_howard_aspect_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_kent_aspect_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_montgomery_aspect_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_princegeorges_aspect_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_queenannes_aspect_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_somerset_aspect_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_stmarys_aspect_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_talbot_aspect_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_washington_aspect_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_washingtonDC_aspect_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_wicomico_aspect_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_worcester_aspect_m/ImageServer"
    }
  ],
  "hillshade": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_allegany_hillshade_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_annearundel_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_baltimore_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_baltimorecity_hillshade_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_calvert_hillshade_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_caroline_hillshade_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_carroll_hillshade_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_cecil_hillshade_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_charles_hillshade_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_dorchester_hillshade_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_frederick_hillshade_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_garrett_hillshade_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_harford_hillshade_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_howard_hillshade_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_kent_hillshade_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_montgomery_hillshade_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_princegeorges_hillshade_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_queenannes_hillshade_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_somerset_hillshade_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_stmarys_hillshade_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_talbot_hillshade_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_washington_hillshade_m/ImageServer"
    },
    {
      "name": "Washington, D.C.",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_washingtonDC_hillshade_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_wicomico_hillshade_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_worcester_hillshade_m/ImageServer"
    }
  ]
}
