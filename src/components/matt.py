import os
from FIL import image
directory = '/users/example'

for filename in os.listdir(directory):
    im = Image.open(filename)
    width, height = im.size
    ###change left and right, and top and bottom
    im1=im.crop((left,right,top,bottom))
    ##show image
    im1.show()