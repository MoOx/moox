/* [@bs.module] external coverBlur : string = "../../../cover.blur.js"; */
[@react.component]
let make = () => {
  <Next.Head>
    <html lang="en" dir="ltr" />
    <meta charSet="utf-8" />
    /* analytics */
    <link rel="dns-prefetch" href="https://a.moox.fr" />
    <link rel="preconnect" href="https://a.moox.fr" />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type_="image/png"
      sizes="32x32"
      href="/favicon-32x32.png"
    />
    <link
      rel="icon"
      type_="image/png"
      sizes="16x16"
      href="/favicon-16x16.png"
    />
    <link rel="manifest" href="/site.webmanifest" />
    /* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000f2b" /> */
    <meta name="msapplication-TileColor" content="#fafcff" />
    <meta name="theme-color" content="#fafcff" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      {j|@-ms-viewport { width: device-width } @viewport { width: device-width }|j}
      ->React.string
    </style>
    <style>
      {j|
html {
  width: 100%;
  height: 100%;
  overflow-x:hidden;
  background: #fff;
}
body {
  min-width: 100%;
  height: 100%;
  overflow-x: hidden;
}
/* Force Next-generated DOM elements to fill their parent's height */
#__next {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

@supports(padding: max(0px)) {
  body {
    /* https://webkit.org/blog/7929/designing-websites-for-iphone-x/ */
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
    /* padding-left: max(12px, env(safe-area-inset-left)); */
    /* padding-right: max(12px, env(safe-area-inset-right)); */
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.BlurView {
  background-color: rgba(253, 255, 255, .98);
}
@supports ((-webkit-backdrop-filter: blur(14px)) or (backdrop-filter: blur(14px))) {
  .BlurView {
    background-color: rgba(245, 245, 245, .75);
    -webkit-backdrop-filter: saturate(200%) brightness(150%) grayscale(20%) blur(20px);
    backdrop-filter: saturate(200%) brightness(150%) grayscale(20%) blur(20px);
  }
}

@media (min-width: 500px) { .WindowSizeFilterSMax { display: none } }
@media (max-width: 501px) { .WindowSizeFilterMMin { display: none } }

.FixedBottom {
  pointer-events: none;
  z-index: 1;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.FixedBottom * {
  pointer-events: all;
}


.device,
.device::before,
.device::after,
.device > *,
.device > *::before,
.device > *::after {
  box-sizing: border-box;
  display: block;
}

.device {
  position: relative;
  transform: scale(1);
  z-index: 1;
}

.device .device-frame {
  z-index: 1;
}

.device .device-content {
  background-color: #fff;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  position: relative;
}

.device-iphone-x {
  height: 868px;
  width: 428px;
}

.device-iphone-x .device-frame {
  background: #222;
  border-radius: 68px;
  /*box-shadow: inset 0 0 2px 2px #c8cacb, inset 0 0 0 7px #e2e3e4;*/
  box-shadow: inset 0 0 2px 2px #6D6B6D, inset 0 0 0 7px #3A3A3A;
  height: 868px;
  padding: 28px;
  width: 428px;
}

.device-iphone-x .device-content {
  border-radius: 40px;
  height: 812px;
  width: 375px;
  overflow: hidden;
}

.device-iphone-x .device-stripe::after,
.device-iphone-x .device-stripe::before {
  border: solid rgba(51, 51, 51, .25);
  border-width: 0 7px;
  content: "";
  height: 7px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 9;
}

.device-iphone-x .device-stripe::after {
  top: 85px;
}

.device-iphone-x .device-stripe::before {
  bottom: 85px;
}

.device-iphone-x .device-header {
  background: #222;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 30px;
  left: 50%;
  margin-left: -102px;
  position: absolute;
  top: 28px;
  width: 204px;
}

.device-iphone-x .device-header::after,
.device-iphone-x .device-header::before {
  content: "";
  height: 10px;
  position: absolute;
  top: 0;
  width: 10px;
}

.device-iphone-x .device-header::after {
  background: radial-gradient(circle at bottom left, transparent 0, transparent 75%, #222 75%, #222 100%);
  left: -10px;
}

.device-iphone-x .device-header::before {
  background: radial-gradient(circle at bottom right, transparent 0, transparent 75%, #222 75%, #222 100%);
  right: -10px;
}

.device-iphone-x .device-sensors::after,
.device-iphone-x .device-sensors::before {
  background: #333;
  content: "";
  position: absolute;
}

.device-iphone-x .device-sensors::after {
  border-radius: 3px;
  height: 6px;
  left: 50%;
  margin-left: -25px;
  top: 32px;
  width: 50px;
}

.device-iphone-x .device-sensors::before {
  border-radius: 50%;
  height: 14px;
  left: 50%;
  margin-left: 40px;
  top: 28px;
  width: 14px;
}

.device-iphone-x .device-btns {
  background: #444142;
  height: 32px;
  left: -3px;
  position: absolute;
  top: 115px;
  width: 3px;
}

.device-iphone-x .device-btns::after,
.device-iphone-x .device-btns::before {
  background: #444142;
  content: "";
  height: 62px;
  left: 0;
  position: absolute;
  width: 3px;
}

.device-iphone-x .device-btns::after {
  top: 60px;
}

.device-iphone-x .device-btns::before {
  top: 140px;
}

.device-iphone-x .device-power {
  background: #444142;
  height: 100px;
  position: absolute;
  right: -3px;
  top: 200px;
  width: 3px;
}
  |j}
      ->React.string
    </style>
  </Next.Head>;
};
