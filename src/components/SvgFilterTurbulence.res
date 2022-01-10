@react.component
let make = (
  ~id,
  ~baseFrequency="0.05 0.05",
  ~numOctaves="2",
  ~seed="2",
  ~saturate="10",
  ~scale="5",
) => {
  <svg width="0" height="0">
    <filter id>
      <feTurbulence
        type_="turbulence" baseFrequency numOctaves seed stitchTiles="stitch" result="turbulence"
      />
      <feColorMatrix type_="saturate" values={saturate} in_="turbulence" result="colormatrix" />
      <feComposite in_="SourceGraphic" in2="colormatrix" operator="in" result="composite" />
      <feDisplacementMap
        in_="SourceGraphic"
        in2="colormatrix"
        scale
        xChannelSelector="R"
        yChannelSelector="A"
        result="displacementMap"
      />
    </filter>
  </svg>
}
