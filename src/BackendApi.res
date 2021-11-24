open Belt

type contentType = [
  | #blog
  | #resume
  | #talks
]
let contentTypeString = contentType => {
  switch contentType {
  | #blog => "blog"
  | #resume => "resume"
  | #talks => "talks"
  }
}

type content = {
  slug: string,
  json: Js.Json.t,
}

let getOne = (filename: string, contentType: contentType): option<content> => {
  let fullPath =
    Node.Process.cwd()
    ->Node.Path.join2("content")
    ->Node.Path.join2(contentType->contentTypeString)
    ->Node.Path.join2(filename)

  if Node.Fs.existsSync(fullPath) {
    let fileContents = fullPath->Node.Fs.readFileSync(#utf8)
    Some({
      slug: filename->Js.String2.replaceByRe(%re("/\\.json$/"), ""),
      json: Js.Json.parseExn(fileContents),
    })
  } else {
    None
  }
}

let getAll = (contentType: contentType): array<content> => {
  let filenames =
    Node.Process.cwd()
    ->Node.Path.join2("content")
    ->Node.Path.join2(contentType->contentTypeString)
    ->Node.Fs.readdirSync
  filenames
  ->Array.keep(file => file->Js.String2.endsWith(".json"))
  ->Array.reduce([], (acc, filename) => {
    switch filename->getOne(contentType) {
    | Some(content) => acc->Js.Array2.push(content)->ignore
    | None => ()
    }
    acc
  })
}
