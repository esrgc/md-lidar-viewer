module.exports = {
  "base_url" : "http://lidar.salisbury.edu/ArcGIS/services/",
  "base_url_rest": "http://lidar.salisbury.edu/ArcGIS/rest/services/",
  "statewide": [
    {
      "name": "Statewide Shaded Relief",
      "service": "Statewide/MD_statewide_shadedRelief_m/MapServer",
      "identify": "Elevation/MD_statewide_demStretched_m/ImageServer"
    },
    {
      "name": "Statewide Aspect",
      "service": "Statewide/MD_statewide_aspect_m/MapServer",
      "identify": "Elevation/MD_statewide_aspect_m/ImageServer"
    },
    {
      "name": "Statewide Slope",
      "service": "Statewide/MD_statewide_slope_m/MapServer",
      "identify": "Elevation/MD_statewide_slope_m/ImageServer"
    },
    {
      "name": "Statewide Hillshade",
      "service": "Statewide/MD_statewide_hillshade_m/MapServer",
      "identify": "Elevation/MD_statewide_demStretched_m/ImageServer"
    }
  ],
  "slope": [
    {"name": "Allegany", "service": "Elevation/MD_allegany_slope_m/ImageServer"},
    {"name": "Anne Arundel", "service": "Elevation/MD_annearundel_slope_m/ImageServer"},
    {"name": "Baltimore", "service": "Elevation/MD_baltimore_slope_m/ImageServer"},
    {"name": "Baltimore City", "service": "Elevation/MD_baltimorecity_slope_m/ImageServer"},
    {"name": "Calvert", "service": "Elevation/MD_calvert_slope_m/ImageServer"},
    {"name": "Caroline", "service": "Elevation/MD_caroline_slope_m/ImageServer"},
    {"name": "Carroll", "service": "Elevation/MD_carroll_slope_m/ImageServer"},
    {"name": "Cecil", "service": "Elevation/MD_cecil_slope_m/ImageServer"},
    {"name": "Charles", "service": "Elevation/MD_charles_slope_m/ImageServer"},
    {"name": "Dorchester", "service": "Elevation/MD_dorchester_slope_m/ImageServer"},
    {"name": "Frederick", "service": "Elevation/MD_frederick_slope_m/ImageServer"},
    {"name": "Garrett", "service": "Elevation/MD_garrett_slope_m/ImageServer"},
    {"name": "Harford", "service": "Elevation/MD_harford_slope_m/ImageServer"},
    {"name": "Howard", "service": "Elevation/MD_howard_slope_m/ImageServer"},
    {"name": "Kent", "service": "Elevation/MD_kent_slope_m/ImageServer"},
    {"name": "Montgomery", "service": "Elevation/MD_montgomery_slope_m/ImageServer"},
    {"name": "Prince George's", "service": "Elevation/MD_princegeorges_slope_m/ImageServer"},
    {"name": "Queen Anne's", "service": "Elevation/MD_queenannes_slope_m/ImageServer"},
    {"name": "Somerset", "service": "Elevation/MD_somerset_slope_m/ImageServer"},
    {"name": "St. Mary's", "service": "Elevation/MD_stmarys_slope_m/ImageServer"},
    {"name": "Talbot", "service": "Elevation/MD_talbot_slope_m/ImageServer"},
    {"name": "Washington", "service": "Elevation/MD_washington_slope_m/ImageServer"},
    {"name": "Washington, D.C.", "service": "Elevation/MD_washingtonDC_slope_m/ImageServer"},
    {"name": "Wicomico", "service": "Elevation/MD_wicomico_slope_m/ImageServer"},
    {"name": "Worcester", "service": "Elevation/MD_worcester_slope_m/ImageServer"}
  ],
  "stretched": [
    {"name": "Allegany", "service": "Elevation/MD_allegany_demStretched_m/ImageServer"},
    {"name": "Anne Arundel", "service": "Elevation/MD_annearundel_demStretched_m/ImageServer"},
    {"name": "Baltimore", "service": "Elevation/MD_baltimore_demStretched_m/ImageServer"},
    {"name": "Baltimore City", "service": "Elevation/MD_baltimorecity_demStretched_m/ImageServer"},
    {"name": "Calvert", "service": "Elevation/MD_calvert_demStretched_m/ImageServer"},
    {"name": "Caroline", "service": "Elevation/MD_caroline_demStretched_m/ImageServer"},
    {"name": "Carroll", "service": "Elevation/MD_carroll_demStretched_m/ImageServer"},
    {"name": "Cecil", "service": "Elevation/MD_cecil_demStretched_m/ImageServer"},
    {"name": "Charles", "service": "Elevation/MD_charles_demStretched_m/ImageServer"},
    {"name": "Dorchester", "service": "Elevation/MD_dorchester_demStretched_m/ImageServer"},
    {"name": "Frederick", "service": "Elevation/MD_frederick_demStretched_m/ImageServer"},
    {"name": "Garrett", "service": "Elevation/MD_garrett_demStretched_m/ImageServer"},
    {"name": "Harford", "service": "Elevation/MD_harford_demStretched_m/ImageServer"},
    {"name": "Howard", "service": "Elevation/MD_howard_demStretched_m/ImageServer"},
    {"name": "Kent", "service": "Elevation/MD_kent_demStretched_m/ImageServer"},
    {"name": "Montgomery", "service": "Elevation/MD_montgomery_demStretched_m/ImageServer"},
    {"name": "Prince George's", "service": "Elevation/MD_princegeorges_demStretched_m/ImageServer"},
    {"name": "Queen Anne's", "service": "Elevation/MD_queenannes_demStretched_m/ImageServer"},
    {"name": "Somerset", "service": "Elevation/MD_somerset_demStretched_m/ImageServer"},
    {"name": "St. Mary's", "service": "Elevation/MD_stmarys_demStretched_m/ImageServer"},
    {"name": "Talbot", "service": "Elevation/MD_talbot_demStretched_m/ImageServer"},
    {"name": "Washington", "service": "Elevation/MD_washington_demStretched_m/ImageServer"},
    {"name": "Washington, D.C.", "service": "Elevation/MD_washingtonDC_demStretched_m/ImageServer"},
    {"name": "Wicomico", "service": "Elevation/MD_wicomico_demStretched_m/ImageServer"},
    {"name": "Worcester", "service": "Elevation/MD_worcester_demStretched_m/ImageServer"}
  ]
}
