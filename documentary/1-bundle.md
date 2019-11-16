## Bundle Mode

_Depack_ comes packed with a [JSX transpiler](https://github.com/a-la/jsx) that is based on Regular Expressions transforms. There are some limitations like currently non working comments, or inability to place `{}` and `<>` strings and functions (although the arrow functions are supported), but it works. What is also important is that the parser will quote the properties intended for html elements, but leave the properties unquoted for the components.

This means that the properties' names will get mangled by the compiler, and can be used in code correctly. If they were quoted, then the code wouldn't be able to reference them because the compiler would change the variable names in code. If the properties to html elements were not quoted then the compiler would mangle them which would result in not-working behaviour. For example:

%EXAMPLE: example/jsx%
%FORK-jsx node_modules/.bin/jsx example/jsx.jsx -p%

Moreover, _GCC_ does not recognise the JSX files as source files, and the module resolution like `import ExampleComponent from './example-component'` does not work. Therefore, _Depack_ will generate a temp directory with the source code where the extension is added to the files. In future, it would be easier if the compiler just allowed to pass supported recognised extensions, or added JSX to their list.

Bundle mode is perfect for creating bundles for the web, be it JSX Preact components (we only focus on _Preact_ because our opinion is that Facebook is evil). _Depack_ was created exactly to avoid all the corporate tool-chains etc that the internet is full of, and _GCC_ is supported by `create-react-app` anyhow.

%~%