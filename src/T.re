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
  PhenomicPresetReactApp.edge(
    PhenomicPresetReactApp.jsNodeList(partialContentItem),
  );

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
  "body": MyBodyRenderer.jsBody,
  /* "body": PhenomicPresetReactApp.BodyRenderer.jsBody */
};

type contentItemNode = PhenomicPresetReactApp.edge(contentItem);

type resumeItemLink = {
  .
  "title": string,
  "url": string,
};

type partialResumeItem = {
  .
  "id": string,
  "company": Js.Undefined.t(string),
  "url": Js.Undefined.t(string),
  "title": string,
  "dateStart": string,
  "dateEnd": string,
  "hashtags": array(string),
  "description": string,
  "links": Js.Undefined.t(array(resumeItemLink)),
};

type resumeList =
  PhenomicPresetReactApp.edge(
    PhenomicPresetReactApp.jsNodeList(partialResumeItem),
  );

/* type resumeItem = {
     .
     "id": string,
     "title": string,
     "body": MyBodyRenderer.jsBody,
   };

   type resumeItemNode = PhenomicPresetReactApp.edge(resumeItem); */
