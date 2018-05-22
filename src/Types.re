type partialContentItem = {
  .
  "id": string,
  "title": string,
  "lang": Js.Undefined.t(string),
  "date": string,
  "conference": Js.Undefined.t(string),
  "slides": Js.Undefined.t(string),
  "slidesEmbed": Js.Undefined.t(string),
  "video": Js.Undefined.t(string),
  "videoEmbed": Js.Undefined.t(string),
};

type contentList =
  PhenomicPresetReactApp.edge(PhenomicPresetReactApp.jsNodeList(partialContentItem));

type contentItem = {
  .
  "id": string,
  "title": string,
  "lang": Js.Undefined.t(string),
  "date": string,
  "conference": Js.Undefined.t(string),
  "slides": Js.Undefined.t(string),
  "slidesEmbed": Js.Undefined.t(string),
  "video": Js.Undefined.t(string),
  "videoEmbed": Js.Undefined.t(string),
  "body": MyBodyRenderer.jsBody
  /* "body": PhenomicPresetReactApp.BodyRenderer.jsBody */
};

type contentItemNode = PhenomicPresetReactApp.edge(contentItem);
