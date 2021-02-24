
# pietro-boilerplate

  

All notable changes to this project will be documented in this file. See [CHANGELOG.md](https://github.com/pietrobs/pietro-boilerplate/blob/main/CHANGELOG.md) for commit guidelines.

  

## DevDependencies

- commitlint
- craco
- eslint
- husky
- lint-staged
- prettier
- standard-version
- craco-alias
- cz-conventional-changelog
- commitzen

## How to make a commit?

> $ git add [FILES]
> $ yarn commit

1.  ? Select the type of change that you're committing: (Use arrow keys)
❯ feat:     A new feature 
  fix:      A bug fix 
  docs:     Documentation only changes 
  style:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) 
  refactor: A code change that neither fixes a bug nor adds a feature 
  perf:     A code change that improves performance 
  test:     Adding missing tests or correcting existing tests 

2. ? What is the scope of this change (e.g. component or file name): (press enter to skip) 
3. ? Write a short, imperative tense description of the change (max 94 chars):
4. ? Provide a longer description of the change: (press enter to skip)
5. ? Are there any breaking changes? (y/N) 
6. ? Does this change affect any open issues? (y/N) 

## How to generate a release

> $ yarn release

## Folders

   - 📄 [CHANGELOG.md](CHANGELOG.md)
   - 📄 [README.md](README.md)
   - 📄 [commitlint.config.js](commitlint.config.js)
   - 📄 [craco.config.js](craco.config.js)
   - 📂 __env__
   - 📄 [node\_modules](node_modules)
   - 📄 [package.json](package.json)
   - 📂 __public__
     - 📄 [favicon.ico](public/favicon.ico)
     - 📄 [index.html](public/index.html)
     - 📄 [manifest.json](public/manifest.json)
     - 📄 [robots.txt](public/robots.txt)
   - 📂 __src__
     - 📄 [App.tsx](src/App.tsx)
     - 📄 [GlobalStyle.ts](src/GlobalStyle.ts)
     - 📄 [Routes.tsx](src/Routes.tsx)
     - 📂 __components__
       - 📄 [InitialLoading.tsx](src/components/InitialLoading.tsx)
       - 📄 [index.ts](src/components/index.ts)
     - 📂 __configs__
       - 📄 [index.ts](src/configs/index.ts)
     - 📄 [index.tsx](src/index.tsx)
     - 📂 __pages__
       - 📄 [index.ts](src/pages/index.ts)
     - 📄 [react\-app\-env.d.ts](src/react-app-env.d.ts)
     - 📂 __services__
       - 📄 [index.ts](src/services/index.ts)
     - 📂 __templates__
       - 📄 [Layout.tsx](src/templates/Layout.tsx)
     - 📂 __theme__
       - 📄 [index.ts](src/theme/index.ts)
     - 📂 __utils__
       - 📄 [index.ts](src/utils/index.ts)
   - 📄 [tsconfig.json](tsconfig.json)
   - 📄 [tsconfig.paths.json](tsconfig.paths.json)
   - 📄 [yarn.lock](yarn.lock)
