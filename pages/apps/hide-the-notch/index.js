import Head from "next/head";

const HideTheNotchApp = () => {
  return (
    <>
      <Head>
        <html lang="en" />
        <meta charset="utf-8" />
        <meta http-equiv="x-ua-compatible" content="ie=edge" />
        <title>Hide The Notch</title>
        <meta name="description" content="" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="apple-touch-icon" href="/apps/hide-the-notch/icon.png" />
        <link
          rel="icon"
          type="image/png"
          href="/apps/hide-the-notch/icon.png"
        />
        <style>
          {`
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
        display: flex;
        flex-direction: column;
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
        background: url(/apps/hide-the-notch/background.jpg) 50% 50% / cover;
        filter: grayscale(100%) blur(8px);
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
          max-width: 25vw;
        }
      }
      @media (min-width: 800px) {
        .blahblah {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }

      .screenshot {
        height: 600px;
        height: 50vh;
        margin: 2rem;
        filter: drop-shadow(0 1em 1em rgba(0, 0, 0, 0.8));
      }

      @media (min-width: 800px) {
        .screenshot {
          margin: 0;
        }
      }

      .AppStoreButton {
        position: relative;
        display: inline-flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        font-size: 1.2em;
        padding: 0.6em;

        color: #fff;
        background: #000;
        border-radius: 5px;
        text-decoration: none;

        transition: all 0.1s ease-in;
        /* important for the gloss effect */
        overflow: hidden;
      }

      .AppStoreButton:hover {
        transform: rotate(1deg) scale(1.05);
        /*filter: drop-shadow(0 1px 6px rgba(0,0,0,0.6));*/
      }

      .AppStoreButton-effect {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transition: all 0.1s ease-in;
        transform: rotate(-10deg) scale(1.5) translateX(50%);
        background: linear-gradient(
          rgba(255, 255, 255, 0.3),
          rgba(255, 255, 255, 0) 80%
        );
      }

      .AppStoreButton:hover .AppStoreButton-effect {
        transform: rotate(-11deg) scale(1.5) translateX(50%);
      }

      .AppStoreButton-logo {
        /* compensate apple top */
        margin-bottom: 0.25em;
        width: 2.5em;
        height: 2.5em;
      }

      .AppStoreButton-text {
        display: inline-flex;
        flex-direction: column;
        margin-left: 0.8em;
      }

      .AppStoreButton-text-line1 {
        font-size: 0.85em;
      }

      .AppStoreButton-text-line2 {
        font-size: 1.5em;
        font-weight: 500;
      }

      .footer {
        font-size: 12px;
        opacity: 0.8;
        color: rgba(255, 255, 255, 0.6);
      }`}
        </style>
      </Head>
      <div className="background"></div>
      <div className="background-mask"></div>
      <div className="View wrapper">
        <div className="View content">
          <div className="View header flex-row">
            <img
              className="icon-preview"
              src="/apps/hide-the-notch/icon-preview.png"
              alt=""
            />
            <div className="spacer"></div>
            <h1 style={{ fontSize: "24px" }}>Hide The Notch</h1>
          </div>
          <img
            className="screenshot"
            src="/apps/hide-the-notch/screenshot.png"
            alt=""
          />
          <div className="blahblah">
            <p>Want to have a nice wallpaper?</p>
            <div className="spacer"></div>
            <p>Want to hide that notch?</p>
            <div className="spacer"></div>
            <p>
              Use some of our beautiful pictures or your own photos to create a
              stunning wallpaper with our effects. Try one of our notch masks.
            </p>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="View flex-row">
          <a
            href="https://apps.apple.com/us/app/hide-the-notch/id1312839983?ls=1"
            className="AppStoreButton"
          >
            <span className="AppStoreButton-effect"></span>
            <svg
              className="AppStoreButton-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M22 17.607c-.786 2.28-3.139 6.317-5.563 6.361-1.608.031-2.125-.953-3.963-.953-1.837 0-2.412.923-3.932.983-2.572.099-6.542-5.827-6.542-10.995 0-4.747 3.308-7.1 6.198-7.143 1.55-.028 3.014 1.045 3.959 1.045.949 0 2.727-1.29 4.596-1.101.782.033 2.979.315 4.389 2.377-3.741 2.442-3.158 7.549.858 9.426zm-5.222-17.607c-2.826.114-5.132 3.079-4.81 5.531 2.612.203 5.118-2.725 4.81-5.531z"
              />
            </svg>
            <span className="AppStoreButton-text">
              <span className="AppStoreButton-text-line1">
                Available on the
              </span>
              <span className="AppStoreButton-text-line2">App Store</span>
            </span>
          </a>
        </div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="spacer"></div>
        <div className="View footer flex-row">
          © 2017 Maxime Thirouin. All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default HideTheNotchApp;
