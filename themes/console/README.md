+++
date = "2016-11-05T21:05:33+05:30"
title = "About"
+++

<h1>About this TinEye app</h1>

<p>
TinEye is a reverse image search and compliance program <a href="https://tineye.com/">(more)</a> based on Hugo web page generator. 
</p>

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

Create an images.txt file in the root with a list of all the images sorted alphabetically:

```
find . -name "*.jpg" | sort -k1 > images.txt
```

Start the main Hugo server

```
hugo server --renderToDisk
```
The timeout option (i.e. setting a higher timeout on config.toml) will not work with images inside /static. We have an open issue about this particular thing, but your current workaround is to do. This is @BEP on 19/1/21


Start the app server using a new terminal window

```
node app.js
```
Use the search page (the home page) to create a tineye report for each image file.

Use the verify page to delete those images which have been claimed as a stock image. The image is actually not deleted but moved to the folder called "deleted" in the static folder.


Courtesy [Marcin Mierzejewski](https://mrmierzejewski.com/) for the Hugo console theme.