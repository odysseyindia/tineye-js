#!/bin/bash

cd /home/alfred/webapps/tineye/static/photos/

# find -name "* *" -type d | rename 's/ /-/g'

# find -name "thumbs.db" -type f -delete 

# find -name "* *" -type f | rename 's/ /-/g'

# find . -depth -exec rename 's/(.*)\/([^\/]*)/$1\/\L$2/' {} \; | echo $2

# find -name "*&*" -type d | rename 's/&/and/g'
# find -name "*&*" -type f | rename 's/&/and/g'
# find -name "*'*" -type f | rename "s/'//g"
# find -name "*.jpeg" -type f | rename "s/.jpeg/.jpg/g"
# find -name "*,*" -type f | rename "s/,/-/g"
# find -name "*--" -type f | rename "s/--/-/g"
