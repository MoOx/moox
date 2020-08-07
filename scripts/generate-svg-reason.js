const fs = require("fs");
const path = require("path");

const template = ({ name }) =>
  `
  [@bs.scope "Platform"] [@bs.module "react-native"] external _os: string = "OS";

  let defaultSize = 16.;

  module JsImplem = {
    [@bs.module "./${name}"] [@react.component]
    external make:
      (
        ~width: string,
        ~height: string,
        ~fill: string,
        ~style: option(ReactNative.Style.t),
        unit
      ) =>
      React.element =
      "default";
  };

  [@react.component]
  let make =
      (~width=defaultSize, ~height=defaultSize, ~fill="#000", ~style=?, ()) =>
    <JsImplem
      width={(width->Js.Float.toString) ++ (_os === "web" ? "px" : "")}
      height={(height->Js.Float.toString) ++ (_os === "web" ? "px" : "")}
      fill
      style
    />;

`;

const folderName = process.argv[2];
const eFailDir = new Error(`Argument must be a folder, ${folderName} is not`);
let folder;
try {
  folder = fs.statSync(folderName);
} catch (e) {
  throw eFailDir;
}
if (!folder.isDirectory()) {
  throw eFailDir;
}

const dir = fs.readdirSync(folderName);

dir
  // get all files once (so .web.js)
  .filter(file => file.match(/\.web\.js$/))
  .forEach(file => {
    const newFileName = "SVG" + file.replace(/web\.js$/, "re");
    const name = file.replace(/\.web\.js$/, "");
    const data = template({ name });
    console.log(`${file} -> ${newFileName}`);
    fs.writeFileSync(path.join(folderName, newFileName), data);
  });
