module.exports = {
  // "base_url" : "http://lidar.salisbury.edu/ArcGIS/services/",
  // "base_url_rest": "http://lidar.salisbury.edu/ArcGIS/rest/services/",
  "base_url" : "http://lidar.geodata.md.gov/imap/services/",
  "base_url_rest": "http://lidar.geodata.md.gov/imap/rest/services/",
  "statewide": [
    {
      "name": "Statewide Shaded Relief",
      "service": "Statewide/MD_statewide_shadedRelief_RGB/ImageServer",
      "identify": "Statewide/MD_statewide_dem_m/ImageServer",
      "type": "elevation"
    },
    {
      "name": "Statewide Aspect",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Statewide/MD_statewide_aspect_m/ImageServer",
      "type": "aspect"
    },
    {
      "name": "Statewide Slope",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Statewide/MD_statewide_slope_m/ImageServer",
      "type": "slope"
    },
    {
      "name": "Statewide Hillshade",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Statewide/MD_statewide_dem_m/ImageServer",
      "type": "hillshade" 
    }
  ],
  "elevation": [
    {
      "name": "Allegany",
      "service": "Allegany/MD_allegany_shadedRelief_RGB/ImageServer",
      // "identify": "Allegany/MD_allegany_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"

    },
    {
      "name": "Anne Arundel",
      "service": "AnneArundel/MD_annearundel_shadedRelief_RGB/ImageServer",
      // "identify": "AnneArundel/MD_annearundel_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Baltimore/MD_baltimore_shadedRelief_RGB/ImageServer",
      // "identify": "Baltimore/MD_baltimore_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "BaltimoreCity/MD_baltimorecity_shadedRelief_RGB/ImageServer",
      // "identify": "BaltimoreCity/MD_baltimorecity_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Calvert/MD_calvert_shadedRelief_RGB/ImageServer",
      // "identify": "Calvert/MD_calvert_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Caroline/MD_caroline_shadedRelief_RGB/ImageServer",
      // "identify": "Caroline/MD_caroline_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Carroll/MD_carroll_shadedRelief_RGB/ImageServer",
      // "identify": "Carroll/MD_carroll_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Cecil/MD_cecil_shadedRelief_RGB/ImageServer",
      // "identify": "Cecil/MD_cecil_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Charles/MD_charles_shadedRelief_RGB/ImageServer",
      // "identify": "Charles/MD_charles_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Dorchester/MD_dorchester_shadedRelief_RGB/ImageServer",
      // "identify": "Dorchester/MD_dorchester_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Frederick/MD_frederick_shadedRelief_RGB/ImageServer",
      // "identify": "Frederick/MD_frederick_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Garrett/MD_garrett_shadedRelief_RGB/ImageServer",
      // "identify": "Garrett/MD_garrett_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Harford/MD_harford_shadedRelief_RGB/ImageServer",
      // "identify": "Harford/MD_harford_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Howard/MD_howard_shadedRelief_RGB/ImageServer",
      // "identify": "Howard/MD_howard_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Kent/MD_kent_shadedRelief_RGB/ImageServer",
      // "identify": "Kent/MD_kent_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Montgomery/MD_montgomery_shadedRelief_RGB/ImageServer",
      // "identify": "Montgomery/MD_montgomery_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "PrinceGeorges/MD_princegeorges_shadedRelief_RGB/ImageServer",
      // "identify": "PrinceGeorges/MD_princegeorges_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "QueenAnnes/MD_queenannes_shadedRelief_RGB/ImageServer",
      // "identify": "QueenAnnes/MD_queenannes_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Somerset/MD_somerset_shadedRelief_RGB/ImageServer",
      // "identify": "Somerset/MD_somerset_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "StMarys/MD_stmarys_shadedRelief_RGB/ImageServer",
      // "identify": "StMarys/MD_stmarys_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Talbot/MD_talbot_shadedRelief_RGB/ImageServer",
      // "identify": "Talbot/MD_talbot_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Washington/MD_washington_shadedRelief_RGB/ImageServer",
      // "identify": "Washington/MD_washington_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "WashingtonDC/MD_washingtonDC_shadedRelief_RGB/ImageServer",
      // "identify": "WashingtonDC/MD_washingtonDC_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Wicomico/MD_wicomico_shadedRelief_RGB/ImageServer",
      // "identify": "Wicomico/MD_wicomico_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Worcester/MD_worcester_shadedRelief_RGB/ImageServer",
      // "identify": "Worcester/MD_worcester_dem_m/ImageServer"
      "identify": "Statewide/MD_statewide_dem_m/ImageServer"
    }
  ],
  "slope": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Allegany/MD_allegany_slope_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "AnneArundel/MD_annearundel_slope_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Baltimore/MD_baltimore_slope_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "BaltimoreCity/MD_baltimorecity_slope_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Calvert/MD_calvert_slope_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Caroline/MD_caroline_slope_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Carroll/MD_carroll_slope_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Cecil/MD_cecil_slope_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Charles/MD_charles_slope_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Dorchester/MD_dorchester_slope_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Frederick/MD_frederick_slope_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Garrett/MD_garrett_slope_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Harford/MD_harford_slope_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Howard/MD_howard_slope_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Kent/MD_kent_slope_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Montgomery/MD_montgomery_slope_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "PrinceGeorges/MD_princegeorges_slope_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "QueenAnnes/MD_queenannes_slope_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Somerset/MD_somerset_slope_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "StMarys/MD_stmarys_slope_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Talbot/MD_talbot_slope_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Washington/MD_washington_slope_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "WashingtonDC/MD_washingtonDC_slope_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Wicomico/MD_wicomico_slope_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_slope_RGB/ImageServer",
      "identify": "Worcester/MD_worcester_slope_m/ImageServer"
    }
  ],
  "aspect": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Allegany/MD_allegany_aspect_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "AnneArundel/MD_annearundel_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Baltimore/MD_baltimore_aspect_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "BaltimoreCity/MD_statewide_aspect_RGB/ImageServer",
      "identify": "BaltimoreCity/MD_baltimorecity_aspect_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Calvert/MD_calvert_aspect_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Caroline/MD_caroline_aspect_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Carroll/MD_carroll_aspect_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Cecil/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Cecil/MD_cecil_aspect_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Charles/MD_charles_aspect_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Dorchester/MD_dorchester_aspect_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Frederick/MD_frederick_aspect_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Garrett/MD_garrett_aspect_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Harford/MD_harford_aspect_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Howard/MD_howard_aspect_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Kent/MD_kent_aspect_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Montgomery/MD_montgomery_aspect_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "PrinceGeorges/MD_princegeorges_aspect_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "QueenAnnes/MD_queenannes_aspect_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Somerset/MD_somerset_aspect_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "StMarys/MD_stmarys_aspect_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Talbot/MD_talbot_aspect_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Washington/MD_washington_aspect_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Washington/MD_washingtonDC_aspect_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Wicomico/MD_wicomico_aspect_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_aspect_RGB/ImageServer",
      "identify": "Worcester/MD_worcester_aspect_m/ImageServer"
    }
  ],
  "hillshade": [
    {
      "name": "Allegany",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Allegany/MD_allegany_hillshade_m/ImageServer"
    },
    {
      "name": "Anne Arundel",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Anne Arundel/MD_annearundel_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Baltimore/MD_baltimore_hillshade_m/ImageServer"
    },
    {
      "name": "Baltimore City",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "BaltimoreCity/MD_baltimorecity_hillshade_m/ImageServer"
    },
    {
      "name": "Calvert",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Calvert/MD_calvert_hillshade_m/ImageServer"
    },
    {
      "name": "Caroline",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Caroline/MD_caroline_hillshade_m/ImageServer"
    },
    {
      "name": "Carroll",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Carroll/MD_carroll_hillshade_m/ImageServer"
    },
    {
      "name": "Cecil",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Cecil/MD_cecil_hillshade_m/ImageServer"
    },
    {
      "name": "Charles",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Charles/MD_charles_hillshade_m/ImageServer"
    },
    {
      "name": "Dorchester",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Dorchester/MD_dorchester_hillshade_m/ImageServer"
    },
    {
      "name": "Frederick",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Frederick/MD_frederick_hillshade_m/ImageServer"
    },
    {
      "name": "Garrett",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Garrett/MD_garrett_hillshade_m/ImageServer"
    },
    {
      "name": "Harford",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Harford/MD_harford_hillshade_m/ImageServer"
    },
    {
      "name": "Howard",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Howard/MD_howard_hillshade_m/ImageServer"
    },
    {
      "name": "Kent",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Kent/MD_kent_hillshade_m/ImageServer"
    },
    {
      "name": "Montgomery",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Montgomery/MD_montgomery_hillshade_m/ImageServer"
    },
    {
      "name": "Prince George's",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "PrinceGeorges/MD_princegeorges_hillshade_m/ImageServer"
    },
    {
      "name": "Queen Anne's",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "QueenAnnes/MD_queenannes_hillshade_m/ImageServer"
    },
    {
      "name": "Somerset",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Somerset/MD_somerset_hillshade_m/ImageServer"
    },
    {
      "name": "St. Mary's",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "StMarys/MD_stmarys_hillshade_m/ImageServer"
    },
    {
      "name": "Talbot",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Talbot/MD_talbot_hillshade_m/ImageServer"
    },
    {
      "name": "Washington",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Washington/MD_washington_hillshade_m/ImageServer"
    },
    {
      "name": "Washington D.C.",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "WashingtonDC/MD_washingtonDC_hillshade_m/ImageServer"
    },
    {
      "name": "Wicomico",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Wicomico/MD_wicomico_hillshade_m/ImageServer"
    },
    {
      "name": "Worcester",
      "service": "Statewide/MD_statewide_hillshade_m/ImageServer",
      "identify": "Worcester/MD_worcester_hillshade_m/ImageServer"
    }
  ]
}
