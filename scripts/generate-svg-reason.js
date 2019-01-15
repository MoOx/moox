const fs = require("fs");
const path = require("path");

const template = ({ name }) =>
  `
[@bs.scope "Platform"] [@bs.module "react-native"] external _os : string = "OS";

[@bs.module "./${name}"] external js${name} : ReasonReact.reactClass = "default";

let defaultSize = 16.;

let make = (~width=defaultSize, ~height=defaultSize, ~fill="#000", ~style=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=js${name},
    ~props={
      "width": string_of_float(width) ++ (_os === "web" ? "0px" : "0"),
      "height": string_of_float(height) ++ (_os === "web" ? "0px" : "0"),
      "fill": fill,
      "style": style
    },
    children
  );
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
