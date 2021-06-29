# widget-svelte-cookiecutter

A [cookiecutter](https://github.com/audreyr/cookiecutter) template for a custom
Jupyter widget project using [Svelte](https://svelte.dev/).
With **widget-svelte-cookiecutter** you can create a custom Jupyter interactive
widget project that uses Svelte for the frontend.
This was adapted from the fantastic [widget-ts-cookiecutter](https://github.com/jupyter-widgets/widget-ts-cookiecutter).

For an overview of how to use IPyWidgets + Svelte, check out this [blog post](https://cabreraalex.medium.com/creating-reactive-jupyter-widgets-with-svelte-ef2fb580c05).

## Usage

Install [cookiecutter](https://github.com/audreyr/cookiecutter):

    $ pip install cookiecutter

After installing cookiecutter, use widget-svelte-cookiecutter:

    $ cookiecutter https://github.com/cabreraalex/widget-svelte-cookiecutter

As widget-ts-cookiecutter runs, you will be asked for basic information about
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
custom Jupyter widget. To check that eveything is set up as it should be,
you should run the tests:

Create a dev environment:
```bash
conda create -n widget-dev -c conda-forge nodejs yarn python jupyterlab jupyter-packaging
conda activate widget-dev
```

Install the python. This will also build the TS package.

```bash
pip install -e .
```

When developing your extensions, you need to manually enable your extensions with the
notebook / lab frontend. For lab, this is done by the command:

```
jupyter labextension develop --overwrite .
yarn run build
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


### How to see your changes
### Jupyter Notebook:
For Jupyter Notebook you can just watch for JS changes:

```bash
yarn watch
```

#### Jupyter Lab:
If you use JupyterLab to develop then you can watch the source directory and run JupyterLab at the same time in different
terminals to watch for changes in the extension's source and automatically rebuild the widget.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
yarn watch
# Watch to rebuild JupyterLab
jupyter labextension watch
# Run JupyterLab in another terminal
jupyter lab
```

After a change wait for the build to finish and then refresh your browser and the changes should take effect.

#### Python:
If you make a change to the python code then you will need to restart the notebook kernel to have it take effect.

## Releasing your initial packages:

- Add tests
- Ensure tests pass locally and on CI. Check that the coverage is reasonable.
- Make a release commit, where you remove the `, 'dev'` entry in `_version.py`.
- Update the version in `package.json`
- Relase the npm packages:
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
