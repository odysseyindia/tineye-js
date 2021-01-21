+++
date = "2016-11-05T21:05:33+05:30"
title = "About"
+++

<h1>About this TinEye app</h1>

<p>
TinEye is a reverse image search and compliance program <a href="https://tineye.com/">(more)</a>

</p>

<br/>The theme is a minimal, responsive and light theme for Hugo inspired by Linux console. 


## Installation

```
$ git clone ourmaninindia.github.com/tineye
```
You may need some additional Node modules. See the package.json file for a listing of all of them.

## Configuration

Most of the essential configurations are in the app.js file which you can find in the root.


## Usage

Copy all images to the static/photos/ folder

Image file names should be all lower case and without spaces or any special characters. Double check that all file names are named properly. Use the example commands in filenames.sh (in the root) as required.

Create an images.txt file in the root with a list of all the images ordered aphabetically:

```
find . -name "*.jpg" | sort -k1 > images.txt
```

Open images.txt with an editor and do a search and replace to remove all the dots in front of the file paths.

Start the app server using a new terminal window

```
node app.js
```
Use the search page (the home page) to create a tineye report for each image file.

Use the verify page to delete those images which have been claimed as a stock image. The image is actually not deleted but moved to the folder called "deleted" in the static folder.


## License

Copyright © 2020 [Alfred Tuinman](https://ourmaninindia.com/) released under the Creative Commons License. Check the [original theme license](https://github.com/panr/hugo-theme-terminal/blob/master/LICENSE.md) for additional licensing information. Also [Marcin Mierzejewski](https://mrmierzejewski.com/) for the Hugo console theme.
