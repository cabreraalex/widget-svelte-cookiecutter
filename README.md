# widget-svelte-cookiecutter

A [cookiecutter](https://github.com/audreyr/cookiecutter) template for a custom
Jupyter widget project using [Svelte](https://svelte.dev/).
With **widget-svelte-cookiecutter** you can create a custom Jupyter interactive
widget project that uses Svelte for the frontend.
This was adapted from the fantastic [widget-ts-cookiecutter](https://github.com/jupyter-widgets/widget-ts-cookiecutter).

## Usage

Install [cookiecutter](https://github.com/audreyr/cookiecutter):

    $ pip install cookiecutter

After installing cookiecutter, use widget-svelte-cookiecutter:

    $ cookiecutter https://github.com/cabreraalex/widget-svelte-cookiecutter

As widget-svelte-cookiecutter runs, you will be asked for basic information about
your custom Jupyter widget project. You will be prompted for the following
information:

- `author_name`: your name or the name of your organization,
- `author_email`: your project's contact email,
- `github_project_name`: name of your custom Jupyter widget's GitHub repository,
- `github_organization_name`: name of your custom Jupyter widget's GitHub user or organization,
- `python_package_name`: name of the Python "back-end" package used in your custom widget.
- `npm_package_name`: name for the npm "front-end" package holding the JavaScript
  implementation used in your custom widget.
- `npm_package_version`: initial version of the npm package.
- `project_short_description` : a short description for your project that will
  be used for both the "back-end" and "front-end" packages.

After this, you will have a directory containing files used for creating a
custom Jupyter widget.

## Code Overview

The cookiecutter creates the following files:

- TypeScript and Svelte frontend code

```
src
├── App.svelte
├── extension.ts
├── index.ts
├── plugin.ts
├── stores.ts
├── version.ts
└── widget.ts
```

The primary files in this directory are `widget.ts` and `App.svelte`. `widget.ts` defines the frontend widget and instantiates the svelte `App.svelte`.

- Python backend kernel

```
{{package-name}}
├── __init__.py
├── _frontend.py
├── _version.py
├── example.py
```

`example.py` is the main file for the backend. It defines the Traitlets, and can dynamically update and react to state changes.

### Example - Adding a Traitlet

To add a new Traitlet, essentially a synced variable:

1. Add a definition to `example.py`
2. Define a store by the same name using `createValue()` in `App.svelte`

Any updates to the store will update the kernel Traitlet and vice-versa.

### Example - Development server

Since compiling Jupyter Notebook/Lab can be slow, you can run a mock development server for the frontend widget using `npm run dev`

You can mock the backend functionality by editing the MockModel class in mock.ts. 

## Installation

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension install @jupyter-widgets/
jlpm --no-build
jupyter labextension install .
```

For classic notebook, you can run:

```
jupyter nbextension install --sys-prefix --symlink --overwrite --py <your python package name>
jupyter nbextension enable --sys-prefix --py <your python package name>
```

Note that the `--symlink` flag doesn't work on Windows, so you will here have to run
the `install` command every time that you rebuild your extension. For certain installations
you might also need another flag instead of `--sys-prefix`, but we won't cover the meaning
of those flags here.

## Releasing your initial packages:

- Make a release commit, where you remove the `, 'dev'` entry in `_version.py`.
- Update the version in `package.json`
- Release the npm packages:
  ```bash
  npm login
  npm publish
  ```
- Bundle the python package: `python setup.py sdist bdist_wheel`
- Publish the package to PyPI:
  ```bash
  pip install twine
  twine upload dist/<python package name>*
  ```
- Tag the release commit (`git tag <python package version identifier>`)
- Update the version in `_version.py`, and put it back to dev (e.g. 0.1.0 -> 0.2.0.dev).
  Update the versions of the npm packages (without publishing).
- Commit the changes.
- `git push` and `git push --tags`.
