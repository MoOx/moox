import Head from "next/head";

const LifeTimeApp = () => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>LifeTime</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" href="icon.png" />
        <link rel="icon" type="image/png" href="icon.png" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
        * {
            box-sizing: border-box;
            position: relative;
            margin: 0;
            padding: 0;
        }

        .View {
            display: flex;
            flex-direction: column;
        }

        html {
            height: 100%;

            /* system font https://medium.com/designing-medium/system-shock-6b1dc6d6596f */
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
            color: #fff;
        }

        body {
          height: 100%;
        }
  
        #__next {
          min-height: 100%;
          padding: 1em;
        }
  
        @media (min-width: 800px) {
          #__next {
            padding: 10vh 0;
          }
        }

        .background {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: #5497d0;
            background: url(/apps/lifetime/background.jpg) 50% 50% / cover;
            /*filter: grayscale(100%); blur(8px);*/
            filter: grayscale(80%);
        }

        .background-mask {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            background: #5497d0;
            background: linear-gradient(
            120deg,
            rgba(84, 151, 208, 0.8),
            rgba(104, 33, 175, 0.6)
            );
        }

        p {
            margin: 0;
        }

        .wrapper {
        }

        .content {
            justify-content: center;
            align-items: center;
        }

        .header {
            width: 100%;
            align-items: center;
            padding: 1em;
            background: #5497d0;
            background: linear-gradient(
            120deg,
            rgba(84, 151, 208, 0.8),
            rgba(104, 33, 175, 0.6)
            );
        }

        @media (min-width: 800px) {
            .header {
            width: auto;
            padding: 1em;
            position: absolute;
            top: 0;
            left: 0;
            }
        }

        .icon-preview {
            width: 64px;
            height: 64px;
            border-radius: 12px;
        }

        .spacer {
            width: 1em;
            height: 1em;
        }

        .flex-row {
            flex-direction: row;
            /*margin: auto;*/
            justify-content: center;
            /*align-items: center;*/
        }

        .blahblah {
            padding: 0 1em;
            font-size: 18px;
            font-weight: 300;
            line-height: 1.4em;
        }

        @media (min-width: 800px) {
            .blahblah {
            max-width: 30vw;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            }
        }

        .screenshot {
            height: 600px;
            height: 50vh;
            margin: 2rem 0;
            filter: drop-shadow(0 1em 1em rgba(0, 0, 0, 0.8));
        }

        @media (min-width: 800px) {
            .screenshot {
            margin: 0;
            }
        }

        .button {
            text-decoration: none;
            display: flex;
            flex-direction: row;
            align-items: center;
            color: #fff;
            background-color: #000;
            border-radius: 10px;
            padding: 12px;
            border: 2px solid #ccc;
        }
        .button-text {
            display: flex;
            flex-direction: column;
            padding-left: 20px;
        }
        .button-text span {
            padding-left: 2px;
            padding-bottom: 4px;
        }

        .AskBeta {
            padding-top: 6px;
            color: #fff;
            font-size: 14px;
            text-align: center;
        }

        .footer {
            font-size: 12px;
            opacity: 0.8;
            color: rgba(255, 255, 255, 0.6);
        }`,
          }}
        />
      </Head>
      <div class="background"></div>
      <div class="background-mask"></div>
      <div class="View wrapper">
        <div class="View content">
          <div class="View header flex-row">
            <img class="icon-preview" src="/apps/lifetime/icon.png" alt="" />
            <div class="spacer"></div>
            <h1 style={{ fontSize: "24px" }}>LifeTime</h1>
          </div>
          <div class="View flex-row">
            <img
              class="screenshot"
              src="/apps/lifetime/screenshot.png"
              alt=""
            />
            <div class="spacer"></div>
            <img
              class="another screenshot"
              src="/apps/lifetime/screenshot-2.png"
              alt=""
            />
          </div>
          <div class="blahblah">
            <p>You live in your calendar?</p>
            <div class="spacer"></div>
            <p>You like stats?</p>
            <div class="spacer"></div>
            <p>
              Let LifeTime become your personal coach, helping you to reach your
              goals and spend your valuable time on things you love. LifeTime
              can help you to understand how you use your time and rely on
              calendar events to learn how you use it. By saving events into
              your calendars, you will be able to visualize reports so you can
              take more informed decisions about how to use your valuable time.
            </p>
            <div class="spacer"></div>
            <p>
              <strong>About Privacy</strong>
            </p>
            <div class="spacer"></div>
            <p>
              LifeTime is designed to protect your information. LifeTime only
              run computation on your device and does not share your information
              anywhere. All the informations retrieved from your calendars are
              only used on your devices, to generate reports and offers you
              suggestions. It's that simple for now.
            </p>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="View flex-row">
          <div class="View">
            <a class="button" href="https://testflight.apple.com/join/HZJj4kel">
              <svg width="40px" height="40px" viewBox="0 0 24 24">
                <path
                  fill="#fff"
                  d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"
                ></path>
              </svg>
              <div class="button-text">
                <span>Soon on the</span>
                <svg width="144px" height="32px" viewBox="0 0 81 18">
                  <g fill="#FFFFFF">
                    <path
                      d="M11.645,13.504 L9.374,13.504 L8.13,9.595 L3.806,9.595 L2.621,13.504 L0.41,13.504 L4.694,0.196 L7.34,0.196 L11.645,13.504 Z M7.755,7.955 L6.63,4.48 C6.511,4.125 6.288,3.289 5.959,1.973 L5.919,1.973 C5.788,2.539 5.577,3.375 5.287,4.48 L4.182,7.955 L7.755,7.955 L7.755,7.955 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M22.662,8.588 C22.662,10.22 22.221,11.51 21.339,12.457 C20.549,13.3 19.568,13.721 18.397,13.721 C17.133,13.721 16.225,13.267 15.672,12.359 L15.632,12.359 L15.632,17.414 L13.5,17.414 L13.5,7.067 C13.5,6.041 13.473,4.988 13.421,3.908 L15.296,3.908 L15.415,5.429 L15.455,5.429 C16.166,4.283 17.245,3.711 18.693,3.711 C19.825,3.711 20.77,4.158 21.526,5.053 C22.284,5.949 22.662,7.127 22.662,8.588 Z M20.49,8.666 C20.49,7.732 20.28,6.962 19.858,6.356 C19.397,5.724 18.778,5.408 18.002,5.408 C17.476,5.408 16.998,5.584 16.571,5.931 C16.143,6.281 15.863,6.738 15.732,7.304 C15.666,7.568 15.633,7.784 15.633,7.954 L15.633,9.554 C15.633,10.252 15.847,10.841 16.275,11.322 C16.703,11.803 17.259,12.043 17.943,12.043 C18.746,12.043 19.371,11.733 19.818,11.115 C20.266,10.496 20.49,9.68 20.49,8.666 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M33.699,8.588 C33.699,10.22 33.258,11.51 32.375,12.457 C31.586,13.3 30.605,13.721 29.434,13.721 C28.17,13.721 27.262,13.267 26.71,12.359 L26.67,12.359 L26.67,17.414 L24.538,17.414 L24.538,7.067 C24.538,6.041 24.511,4.988 24.459,3.908 L26.334,3.908 L26.453,5.429 L26.493,5.429 C27.203,4.283 28.282,3.711 29.731,3.711 C30.862,3.711 31.807,4.158 32.565,5.053 C33.32,5.949 33.699,7.127 33.699,8.588 Z M31.527,8.666 C31.527,7.732 31.316,6.962 30.894,6.356 C30.433,5.724 29.816,5.408 29.039,5.408 C28.512,5.408 28.035,5.584 27.607,5.931 C27.179,6.281 26.9,6.738 26.769,7.304 C26.704,7.568 26.67,7.784 26.67,7.954 L26.67,9.554 C26.67,10.252 26.884,10.841 27.31,11.322 C27.738,11.802 28.294,12.043 28.98,12.043 C29.783,12.043 30.408,11.733 30.855,11.115 C31.303,10.496 31.527,9.68 31.527,8.666 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M46.039,9.772 C46.039,10.904 45.646,11.825 44.857,12.536 C43.99,13.313 42.783,13.701 41.232,13.701 C39.8,13.701 38.652,13.425 37.783,12.872 L38.277,11.095 C39.213,11.661 40.24,11.945 41.359,11.945 C42.162,11.945 42.787,11.763 43.236,11.401 C43.683,11.039 43.906,10.553 43.906,9.947 C43.906,9.407 43.722,8.952 43.353,8.583 C42.986,8.214 42.373,7.871 41.517,7.554 C39.187,6.685 38.023,5.412 38.023,3.738 C38.023,2.644 38.431,1.747 39.248,1.049 C40.062,0.35 41.148,0.001 42.506,0.001 C43.717,0.001 44.723,0.212 45.526,0.633 L44.993,2.371 C44.243,1.963 43.395,1.759 42.446,1.759 C41.696,1.759 41.11,1.944 40.69,2.312 C40.335,2.641 40.157,3.042 40.157,3.517 C40.157,4.043 40.36,4.478 40.768,4.82 C41.123,5.136 41.768,5.478 42.704,5.847 C43.849,6.308 44.69,6.847 45.231,7.465 C45.77,8.081 46.039,8.852 46.039,9.772 Z"
                      id="Path"
                    ></path>
                    <path
                      d="M53.088,5.508 L50.738,5.508 L50.738,10.167 C50.738,11.352 51.152,11.944 51.982,11.944 C52.363,11.944 52.679,11.911 52.929,11.845 L52.988,13.464 C52.568,13.621 52.015,13.7 51.33,13.7 C50.488,13.7 49.83,13.443 49.355,12.93 C48.882,12.416 48.644,11.554 48.644,10.343 L48.644,5.506 L47.244,5.506 L47.244,3.906 L48.644,3.906 L48.644,2.149 L50.738,1.517 L50.738,3.906 L53.088,3.906 L53.088,5.508 Z"
                      id="Path"
                    ></path>
                    <path
                      d="M63.691,8.627 C63.691,10.102 63.269,11.313 62.427,12.26 C61.544,13.235 60.372,13.721 58.911,13.721 C57.503,13.721 56.382,13.254 55.546,12.32 C54.71,11.386 54.292,10.207 54.292,8.786 C54.292,7.299 54.722,6.081 55.585,5.134 C56.446,4.186 57.608,3.712 59.069,3.712 C60.477,3.712 61.61,4.179 62.465,5.114 C63.283,6.021 63.691,7.192 63.691,8.627 Z M61.479,8.696 C61.479,7.811 61.29,7.052 60.907,6.419 C60.46,5.653 59.821,5.271 58.993,5.271 C58.136,5.271 57.485,5.654 57.038,6.419 C56.655,7.053 56.466,7.824 56.466,8.736 C56.466,9.621 56.655,10.38 57.038,11.012 C57.499,11.778 58.143,12.16 58.974,12.16 C59.788,12.16 60.427,11.77 60.888,10.992 C61.281,10.347 61.479,9.58 61.479,8.696 Z"
                      id="Shape"
                    ></path>
                    <path
                      d="M70.621,5.783 C70.41,5.744 70.185,5.724 69.949,5.724 C69.199,5.724 68.619,6.007 68.211,6.574 C67.856,7.074 67.678,7.706 67.678,8.469 L67.678,13.504 L65.547,13.504 L65.567,6.93 C65.567,5.824 65.54,4.817 65.487,3.909 L67.344,3.909 L67.422,5.745 L67.481,5.745 C67.706,5.114 68.061,4.606 68.547,4.225 C69.022,3.882 69.535,3.711 70.088,3.711 C70.285,3.711 70.463,3.725 70.621,3.75 L70.621,5.783 Z"
                      id="Path"
                    ></path>
                    <path
                      d="M80.156,8.252 C80.156,8.634 80.131,8.956 80.078,9.219 L73.682,9.219 C73.707,10.167 74.016,10.892 74.61,11.392 C75.149,11.839 75.846,12.063 76.702,12.063 C77.649,12.063 78.513,11.912 79.29,11.609 L79.624,13.089 C78.716,13.485 77.644,13.682 76.407,13.682 C74.919,13.682 73.751,13.244 72.901,12.369 C72.053,11.494 71.628,10.319 71.628,8.845 C71.628,7.398 72.023,6.193 72.814,5.232 C73.642,4.206 74.761,3.693 76.169,3.693 C77.552,3.693 78.599,4.206 79.31,5.232 C79.873,6.047 80.156,7.055 80.156,8.252 Z M78.123,7.699 C78.137,7.067 77.998,6.521 77.709,6.06 C77.34,5.467 76.773,5.171 76.01,5.171 C75.313,5.171 74.746,5.46 74.313,6.04 C73.958,6.501 73.747,7.054 73.682,7.698 L78.123,7.698 L78.123,7.699 Z"
                      id="Shape"
                    ></path>
                  </g>
                </svg>
              </div>
            </a>
            <a
              class="AskBeta"
              href="https://testflight.apple.com/join/HZJj4kel"
            >
              <span>Beta access for</span> <strong>iOS</strong> via TestFlight
            </a>
          </div>
          <div class="spacer"></div>
          <div class="View">
            <a
              class="button"
              href="https://play.google.com/store/apps/details?id=io.moox.lifetime"
            >
              <svg width="36px" height="40px" viewBox="0 0 926 1032">
                <defs>
                  <linearGradient
                    x1="61.0301652%"
                    y1="4.94958549%"
                    x2="26.4625815%"
                    y2="71.9258683%"
                    id="linearGradient-1"
                  >
                    <stop stop-color="#00A0FF" offset="0%"></stop>
                    <stop stop-color="#00A1FF" offset="0.6569999%"></stop>
                    <stop stop-color="#00BEFF" offset="26.01%"></stop>
                    <stop stop-color="#00D2FF" offset="51.22%"></stop>
                    <stop stop-color="#00DFFF" offset="76.04%"></stop>
                    <stop stop-color="#00E3FF" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient
                    x1="107.630451%"
                    y1="50.0004315%"
                    x2="-130.551706%"
                    y2="50.0004315%"
                    id="linearGradient-2"
                  >
                    <stop stop-color="#FFE000" offset="0%"></stop>
                    <stop stop-color="#FFBD00" offset="40.87%"></stop>
                    <stop stop-color="#FFA500" offset="77.54%"></stop>
                    <stop stop-color="#FF9C00" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient
                    x1="86.243474%"
                    y1="30.90425%"
                    x2="-50.1292379%"
                    y2="136.019454%"
                    id="linearGradient-3"
                  >
                    <stop stop-color="#FF3A44" offset="0%"></stop>
                    <stop stop-color="#C31162" offset="100%"></stop>
                  </linearGradient>
                  <linearGradient
                    x1="-18.8105628%"
                    y1="-11.8250802%"
                    x2="42.0848536%"
                    y2="35.086648%"
                    id="linearGradient-4"
                  >
                    <stop stop-color="#32A071" offset="0%"></stop>
                    <stop stop-color="#2DA771" offset="6.85%"></stop>
                    <stop stop-color="#15CF74" offset="47.62%"></stop>
                    <stop stop-color="#06E775" offset="80.09%"></stop>
                    <stop stop-color="#00F076" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g>
                  <path
                    d="M18.4,16.1 C6.8,28.6 0.1,47.7 0.1,72.7 L0.1,959.4 C0.1,984.4 6.8,1003.5 18.8,1015.5 L21.9,1018.2 L518.7,521.4 L518.7,510.3 L21.5,13.4 C21.5,13.4 18.4,16.1 18.4,16.1 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                  ></path>
                  <path
                    d="M684,687.5 L518.3,521.8 L518.3,510.2 L684,344.5 L687.6,346.7 L883.6,458.1 C939.7,489.7 939.7,541.9 883.6,573.9 L687.6,685.3 C687.6,685.3 684,687.5 684,687.5 Z"
                    id="Path"
                    fill="url(#linearGradient-2)"
                  ></path>
                  <path
                    d="M687.6,685.3 L518.3,516 L18.4,1015.9 C36.7,1035.5 67.4,1037.7 101.7,1018.6 L687.6,685.3"
                    id="Path"
                    fill="url(#linearGradient-3)"
                  ></path>
                  <path
                    d="M687.6,346.7 L101.7,13.9 C67.4,-5.7 36.6,-3 18.4,16.6 L518.3,516 L687.6,346.7 Z"
                    id="Path"
                    fill="url(#linearGradient-4)"
                  ></path>
                  <path
                    d="M684,681.7 L102.1,1012.3 C69.6,1031 40.6,1029.7 21.9,1012.7 L18.8,1015.8 L21.9,1018.5 C40.6,1035.4 69.6,1036.8 102.1,1018.1 L688,685.3 C688,685.3 684,681.7 684,681.7 Z"
                    id="Path"
                    fill="#000000"
                    fill-rule="nonzero"
                    opacity="0.2"
                  ></path>
                  <path
                    d="M883.6,568.1 L683.5,681.7 L687.1,685.3 L883.1,573.9 C911.2,557.9 925,536.9 925,516 C923.3,535.2 909,553.4 883.6,568.1 Z"
                    id="Path"
                    fill="#000000"
                    fill-rule="nonzero"
                    opacity="0.12"
                  ></path>
                  <path
                    d="M101.7,19.7 L883.6,463.9 C909,478.2 923.3,496.9 925.5,516 C925.5,495.1 911.7,474.1 883.6,458.1 L101.7,13.9 C45.6,-18.2 0.1,8.6 0.1,72.7 L0.1,78.5 C0.1,14.3 45.6,-12 101.7,19.7 Z"
                    id="Path"
                    fill="#FFFFFF"
                    opacity="0.25"
                  ></path>
                </g>
              </svg>
              <div class="button-text">
                <span style={{ textTransform: "uppercase", fontSize: "14px" }}>
                  Early Access on
                </span>
                <svg width="159" height="32px" viewBox="0 0 3399 684">
                  <g
                    transform="translate(-1646.000000, -683.000000)"
                    fill="#FFF"
                  >
                    <path
                      d="M2732.1,872.4 C2637.6,872.4 2561,944.1 2561,1043 C2561,1141 2638.1,1213.6 2732.1,1213.6 C2826.6,1213.6 2903.2,1141.4 2903.2,1043 C2903.2,944.1 2826.6,872.4 2732.1,872.4 Z M2732.1,1146 C2680.4,1146 2635.9,1103.2 2635.9,1042.6 C2635.9,981.1 2680.5,939.2 2732.1,939.2 C2783.8,939.2 2828.30017,981.1 2828.30017,1042.6 C2828.4,1103.6 2783.8,1146 2732.1,1146 Z M2358.8,872.4 C2264.3,872.4 2187.7,944.1 2187.7,1043 C2187.7,1141 2264.8,1213.6 2358.8,1213.6 C2453.3,1213.6 2529.9,1141.4 2529.9,1043 C2529.9,944.1 2453.2,872.4 2358.8,872.4 Z M2358.8,1146 C2307.1,1146 2262.6,1103.2 2262.6,1042.6 C2262.6,981.1 2307.2,939.2 2358.8,939.2 C2410.5,939.2 2455,981.1 2455,1042.6 C2455,1103.6 2410.5,1146 2358.8,1146 Z M1914.6,924.5 L1914.6,996.7 L2087.9,996.7 C2082.6,1037.2 2069.2,1067.1 2048.7,1087.6 C2023.3,1113 1984.1,1140.6 1915,1140.6 C1808.5,1140.6 1725.2,1054.6 1725.2,948.1 C1725.2,841.6 1808.5,755.6 1915,755.6 C1972.5,755.6 2014.4,778.3 2045.5,807.3 L2096.7,756.1 C2053.5,714.7 1996,683 1915.4,683 C1769.3,683 1646.7,802 1646.7,947.7 C1646.7,1093.8 1769.2,1212.4 1915.4,1212.4 C1994.3,1212.4 2053.5,1186.6 2100.3,1138 C2148,1090.3 2163.1,1023 2163.1,968.7 C2163.1,951.8 2161.8,936.6 2159.1,923.7 L1914.5,923.7 C1914.6,923.6 1914.6,924.5 1914.6,924.5 Z M3731.5,980.7 C3717.2,942.4 3674,872 3585.4,872 C3497.6,872 3424.6,941.1 3424.6,1042.6 C3424.6,1138.4 3496.8,1213.2 3593.9,1213.2 C3671.9,1213.2 3717.3,1165.5 3736,1137.5 L3678.1,1098.7 C3658.9,1127.2 3632.2,1145.9 3594.3,1145.9 C3556,1145.9 3529.2,1128.5 3511.4,1094.2 L3739.5,999.7 C3739.5,999.8 3731.5,980.7 3731.5,980.7 Z M3498.9,1037.7 C3497.1,971.8 3550.1,938.3 3588,938.3 C3617.9,938.3 3642.8,953 3651.3,974.4 L3498.9,1037.7 Z M3313.6,1203 L3388.5,1203 L3388.5,701.8 L3313.6,701.8 L3313.6,1203 Z M3190.6,910.3 L3187.9,910.3 C3171,890.2 3138.9,872 3097.9,872 C3012.8,872 2934.4,946.9 2934.4,1043.1 C2934.4,1138.9 3012.4,1212.9 3097.9,1212.9 C3138.4,1212.9 3171,1194.6 3187.9,1174.1 L3190.6,1174.1 L3190.6,1198.6 C3190.6,1263.7 3155.8,1298.8 3099.7,1298.8 C3053.8,1298.8 3025.3,1265.8 3013.7,1238.2 L2948.6,1265.4 C2967.3,1310.4 3017.2,1366.1 3099.6,1366.1 C3187.4,1366.1 3261.8,1314.4 3261.8,1188.3 L3261.8,882.2 L3191,882.2 L3191,910.3 C3191.1,910.3 3190.6,910.3 3190.6,910.3 Z M3104.6,1146 C3052.9,1146 3009.7,1102.8 3009.7,1043.1 C3009.7,982.9 3052.9,939.3 3104.6,939.3 C3155.8,939.3 3195.5,983.4 3195.5,1043.1 C3196,1102.8 3155.9,1146 3104.6,1146 Z M4082.2,701.8 L3903.1,701.8 L3903.1,1203 L3978,1203 L3978,1013.2 L4082.3,1013.2 C4165.2,1013.2 4246.7,953.1 4246.7,857.7 C4246.7,762.3 4165.5,701.8 4082.2,701.8 Z M4084.4,943.2 L3977.9,943.2 L3977.9,771.2 L4084.4,771.2 C4140.5,771.2 4172.2,817.5 4172.2,857.2 C4172.2,896.5 4140.1,943.2 4084.4,943.2 Z M4546.9,871.5 C4492.5,871.5 4436.4,895.6 4413.2,948.1 L4479.6,975.7 C4493.9,948.1 4520.1,938.7 4547.8,938.7 C4586.6,938.7 4625.8,961.9 4626.7,1003.3 L4626.7,1008.6 C4613.3,1001 4583.9,989.4 4548.7,989.4 C4477,989.4 4404.3,1028.6 4404.3,1102.1 C4404.3,1169.4 4463.1,1212.6 4528.6,1212.6 C4578.9,1212.6 4606.6,1189.9 4623.9,1163.6 L4626.6,1163.6 L4626.6,1202.4 L4698.8,1202.4 L4698.8,1010.4 C4698.8,921 4632.4,871.5 4546.9,871.5 Z M4537.5,1146 C4513,1146 4478.7,1134 4478.7,1103.2 C4478.7,1064.4 4521.5,1049.7 4558,1049.7 C4591,1049.7 4606.6,1056.8 4626.2,1066.6 C4620.8,1111.6 4582.8,1145.6 4537.5,1146 Z M4962.2,882.2 L4876.2,1099.6 L4873.5,1099.6 L4784.4,882.2 L4703.8,882.2 L4837.5,1186.1 L4761.3,1355 L4839.3,1355 L5045,882.2 C5045,882.2 4962.2,882.2 4962.2,882.2 Z M4288,1203 L4362.9,1203 L4362.9,701.8 L4288,701.8 L4288,1203 Z"
                      id="Shape"
                    ></path>
                  </g>
                </svg>
              </div>
            </a>
          </div>
        </div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="spacer"></div>
        <div class="View footer flex-row">
          © 2020 Maxime Thirouin. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default LifeTimeApp;
