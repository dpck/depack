## Known Bugs

There are a few insignificant known issues with _Google Closure Compiler_.

1. Cannot do `import '.'`: change to `import './'`.
    %EXAMPLE: example/bugs/dot%
    %EXAMPLE: example/bugs/index%
    <details>
    <summary>Show Dot Error</summary>

    %FORK src/depack example/bugs/dot%
    </details>
<!-- 1. Cannot destructure error in `catch` block.
    %EXAMPLE: example/bugs/catch%
    <details>
    <summary>Show Catch Error</summary>

    %FORK src/depack example/bugs/catch -c%
    </details> -->
1. `node_modules` are not looked up higher than the `cwd`.
1. Cannot import _json_ files. Use `require`.
    %EXAMPLE: example/bugs/json%
    <details>
    <summary>Show JSON Error</summary>

    %FORK src/depack example/bugs/json -c%
    </details>

%~%