[@bs.val] external encodeURIComponent : string => string = "";

let encodeURI = uri => encodeURIComponent(uri);
