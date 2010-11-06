$LOAD_PATH << "lib"
require 'photo_artist'
require 'spec_helper'

describe PhotoArtist do
  it "should create a new image with comic effect applied" do 
  photo_artist = PhotoArtist.new("specs/data/test.jpg")
  photo_artist.should_receive(:comicify).and_return(:path_to_new_image)
  # ajax should use path to make new img element and refresh canvas

  end
  
end
# 
# 
# it "pushes row color data to pusher" do
#   mock_channel = mock("channel")
#   mock_channel.should_receive(:trigger).with("begin_painting", :y => 0, :colors => ["rgb(0,0,0)", "rgb(0,0,0)", "rgb(0,1,0)"])
#   mock_channel.should_receive(:trigger).with("begin_painting", :y => 10, :colors => ["rgb(0,0,0)", "rgb(0,0,0)", "rgb(0,0,0)"])
#   Pusher.should_receive("[]").twice.with("image_data").and_return(mock_channel)
#   PhotoArtist.paint("specs/data/test.jpg")
# end
# 
# it "paints with darkest pixels if asked for dark pixels" do
#   mock_pixel1 = mock("pixel1")
#   mock_pixel1.should_receive("red").twice.and_return(2)
#   mock_pixel1.should_receive("green").twice.and_return(33)
#   mock_pixel1.should_receive("blue").twice.and_return(12)
# 
#   mock_pixel2 = mock("pixel2")
#   mock_pixel2.should_receive("red").and_return(223)
#   mock_pixel2.should_receive("green").and_return(124)
#   mock_pixel2.should_receive("blue").and_return(206)    
#   
#   pixels = []
#   pixels << mock_pixel1
#   pixels << mock_pixel2
#   pixel = PhotoArtist.darkest_pixels(pixels)
#   pixel.should == "rgb(2,33,12)"
#   
# end
#   
# 
# it "should learn an image's height and width and return zoom factor in x and y values" do 
#   #zoom is going to have to be a pull-down at some point, for user to select factor.
# end
# it "should pixelate by selecting middle pixel out of ten by ten square, not darkest one"
# it "should pixelate by selecting middle pixel out of five by five square, not darkest one"
# 
#  
# it "should zoom by a determined factor" do 
# end
# it "should paint at determined levels of pixelarity"
# it "should create zoom effect by selecting a small rectangle and drawing it bigger" do    
#   path = "specs/data/test.jpg"
#   #this is hard-coded, and there are ten thousand expectations here. not good. but a good start.
#   
#   Magick::ImageList.should_receive(:new).with(path).and_return(mock())
#   image = Magick::ImageList.new(path)
#   
#   image.should_receive(:rows).and_return(20)
#   image.rows
# 
#   image.should_receive(:columns).and_return(30)
#   image.columns
#   
#   #should get image's height and width and divide by something in order to create a factor
#   
#   image.should_receive(:crop).with(Magick::CenterGravity, 22, 16).and_return(mock())
#   cropped_image = image.crop(Magick::CenterGravity, 22, 16)
#   cropped_image.should_receive(:resize).with(88,32).and_return(mock())
#   zoomed_image = cropped_image.resize(88,32)
#   
#   mock_rgb_values = mock("rgb")
# 
#   PhotoArtist.should_receive(:zoom)
#   PhotoArtist.zoom()
#   PhotoArtist.should_receive(:zoom_paint)
#   PhotoArtist.zoom_paint()
# end
# 
# it "should slowly draw one row at a time"