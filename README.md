This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Table of Contents

- [Updating to New Releases](#updating-to-new-releases)
- [Sending Feedback](#sending-feedback)
- [Folder Structure](#folder-structure)
- [Available Scripts](#available-scripts)
  - [npm start](#npm-start)
  - [npm test](#npm-test)
  - [npm run build](#npm-run-build)
  - [npm run eject](#npm-run-eject)
- [Supported Language Features and Polyfills](#supported-language-features-and-polyfills)
- [Syntax Highlighting in the Editor](#syntax-highlighting-in-the-editor)
- [Displaying Lint Output in the Editor](#displaying-lint-output-in-the-editor)
- [Debugging in the Editor](#debugging-in-the-editor)
- [Changing the Page `<title>`](#changing-the-page-title)
- [Installing a Dependency](#installing-a-dependency)
- [Importing a Component](#importing-a-component)
- [Adding a Stylesheet](#adding-a-stylesheet)
- [Post-Processing CSS](#post-processing-css)
- [Adding a CSS Preprocessor (Sass, Less etc.)](#adding-a-css-preprocessor-sass-less-etc)
- [Adding Images and Fonts](#adding-images-and-fonts)
- [Using the `public` Folder](#using-the-public-folder)
  - [Changing the HTML](#changing-the-html)
  - [Adding Assets Outside of the Module System](#adding-assets-outside-of-the-module-system)
  - [When to Use the `public` Folder](#when-to-use-the-public-folder)
- [Using Global Variables](#using-global-variables)
- [Adding Bootstrap](#adding-bootstrap)
  - [Using a Custom Theme](#using-a-custom-theme)
- [Adding Flow](#adding-flow)
- [Adding Custom Environment Variables](#adding-custom-environment-variables)
  - [Referencing Environment Variables in the HTML](#referencing-environment-variables-in-the-html)
  - [Adding Temporary Environment Variables In Your Shell](#adding-temporary-environment-variables-in-your-shell)
  - [Adding Development Environment Variables In `.env`](#adding-development-environment-variables-in-env)
- [Can I Use Decorators?](#can-i-use-decorators)
- [Integrating with an API Backend](#integrating-with-an-api-backend)
  - [Node](#node)
  - [Ruby on Rails](#ruby-on-rails)
- [Proxying API Requests in Development](#proxying-api-requests-in-development)
- [Using HTTPS in Development](#using-https-in-development)
- [Generating Dynamic `<meta>` Tags on the Server](#generating-dynamic-meta-tags-on-the-server)
- [Pre-Rendering into Static HTML Files](#pre-rendering-into-static-html-files)
- [Injecting Data from the Server into the Page](#injecting-data-from-the-server-into-the-page)
- [Running Tests](#running-tests)
  - [Filename Conventions](#filename-conventions)
  - [Command Line Interface](#command-line-interface)
  - [Version Control Integration](#version-control-integration)
  - [Writing Tests](#writing-tests)
  - [Testing Components](#testing-components)
  - [Using Third Party Assertion Libraries](#using-third-party-assertion-libraries)
  - [Initializing Test Environment](#initializing-test-environment)
  - [Focusing and Excluding Tests](#focusing-and-excluding-tests)
  - [Coverage Reporting](#coverage-reporting)
  - [Continuous Integration](#continuous-integration)
  - [Disabling jsdom](#disabling-jsdom)
  - [Snapshot Testing](#snapshot-testing)
  - [Editor Integration](#editor-integration)
- [Developing Components in Isolation](#developing-components-in-isolation)
- [Making a Progressive Web App](#making-a-progressive-web-app)
- [Deployment](#deployment)
  - [Serving Apps with Client-Side Routing](#serving-apps-with-client-side-routing)
  - [Building for Relative Paths](#building-for-relative-paths)
  - [Azure](#azure)
  - [Firebase](#firebase)
  - [GitHub Pages](#github-pages)
  - [Heroku](#heroku)
  - [Modulus](#modulus)
  - [Netlify](#netlify)
  - [Now](#now)
  - [S3 and CloudFront](#s3-and-cloudfront)
  - [Surge](#surge)
- [Advanced Configuration](#advanced-configuration)
- [Troubleshooting](#troubleshooting)
  - [`npm start` doesn’t detect changes](#npm-start-doesnt-detect-changes)
  - [`npm test` hangs on macOS Sierra](#npm-test-hangs-on-macos-sierra)
  - [`npm run build` silently fails](#npm-run-build-silently-fails)
  - [`npm run build` fails on Heroku](#npm-run-build-fails-on-heroku)
- [Something Missing?](#something-missing)

## Updating to New Releases

Create React App is divided into two packages:

* `create-react-app` is a global command-line utility that you use to create new projects.
* `react-scripts` is a development dependency in the generated projects (including this one).

You almost never need to update `create-react-app` itself: it delegates all the setup to `react-scripts`.

When you run `create-react-app`, it always creates the project with the latest version of `react-scripts` so you’ll get all the new features and improvements in newly created apps automatically.

To update an existing project to a new version of `react-scripts`, [open the changelog](https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md), find the version you’re currently on (check `package.json` in this folder if you’re not sure), and apply the migration instructions for the newer versions.

In most cases bumping the `react-scripts` version in `package.json` and running `npm install` in this folder should be enough, but it’s good to consult the [changelog](https://github.com/facebookincubator/create-react-app/blob/master/CHANGELOG.md) for potential breaking changes.

We commit to keeping the breaking changes minimal so you can upgrade `react-scripts` painlessly.

## Sending Feedback

We are always open to [your feedback](https://github.com/facebookincubator/create-react-app/issues).

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, or Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.


