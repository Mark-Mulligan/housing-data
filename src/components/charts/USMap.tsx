// React
import React from "react";

// Next
import { useRouter } from "next/router";

// D3-Geo
import { geoCentroid } from "d3-geo";

// React Simple Maps
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

// Utils
import { allStates } from "../../utils/USMap";
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets: any = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const MapChart = () => {
  const router = useRouter();

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => (
              <Geography
                onClick={() => {
                  const selectedState = allStates.find((s) => s.val === geo.id);
                  if (selectedState) {
                    router.push(
                      {
                        pathname: "/state",
                        query: {
                          id: selectedState.id.toLowerCase(),
                          val: selectedState.val,
                        },
                      },
                      undefined,
                      { shallow: true }
                    );
                  }
                }}
                key={geo.rsmKey}
                stroke="#FFF"
                geography={geo}
                fill={
                  router?.query.val === geo.id.toLowerCase()
                    ? "grey"
                    : "#D3D3D3"
                }
                style={{
                  default: { outline: "none" },
                  hover: {
                    outline: "none",
                    fill:
                      router?.query.val === geo.id.toLowerCase()
                        ? "grey"
                        : "#e0e0e0",
                  },
                  pressed: { outline: "none" },
                }}
              />
            ))}
            {geographies.map((geo) => {
              const centroid = geoCentroid(geo);
              const cur = allStates.find((s) => s.val === geo.id);
              return (
                <g key={geo.rsmKey + "-name"}>
                  {cur &&
                    centroid[0] > -160 &&
                    centroid[0] < -67 &&
                    (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                      <Marker coordinates={centroid}>
                        <text y="2" fontSize={14} textAnchor="middle">
                          {cur.id}
                        </text>
                      </Marker>
                    ) : (
                      <Annotation
                        subject={centroid}
                        dx={offsets[cur.id][0]}
                        dy={offsets[cur.id][1]}
                        style={{ fill: "white", color: "white" }}
                      >
                        <text x={4} fontSize={14} alignmentBaseline="middle">
                          {cur.id}
                        </text>
                      </Annotation>
                    ))}
                </g>
              );
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
