# Project[static-html]
Use nodejs generate static html.

Use public header,footer,partial.

### Usage

1.Clone code
```sh
mkdir [project_path] && cd [project_path]
clone [git_url]
```

2.Install dependencies
```sh
cd [project_path]
npm install
```

3.Config pages
open file : /routes/index.js
```js
// the cols value is page_name ,and matched with files in /views/[page_name.ejs]
var views = [
    'index',
    'login',
    'register'
];

```

4.Generate Html
```
[domain]/clean
[domain]/generate
```
the static files will generated in /generate folder.

5.Minify html\css\js\img
```sh
gulp
```
the dist files will rewrite and generated in /dist folder.
