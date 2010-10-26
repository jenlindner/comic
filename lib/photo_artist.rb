require 'pusher'
require 'RMagick'
require 'image_object'

class PhotoArtist
 
  def initialize(path)
    pusher = PusherCredentials.new
    @original = ImageObject.new(path)
  end
  
  
  def colorize
    segmented_image = @original.image.segment(Magick::YUVColorspace, 0.4, 0.4)
    paint(1,segmented_image)
  end
  
  def paint(square_size, *image)
    image = image.empty? ? @original.image : image[0]
    (image.rows / square_size).times do |y|
      colors_of_row = []
      (image.columns / square_size).times do |x|
        pixels = image.get_pixels((x * square_size), (y * square_size), square_size, square_size)
        colors_of_row << rgb_pixels(pixels) 
      end
       Pusher["image_data"].trigger("begin_painting", :y => (y * square_size), :colors => colors_of_row, :square_size => square_size)
    end
  end
  
  def posterize
    posterized_image = @original.image.posterize(levels=4,dither=false)
    paint(1, posterized_image)
  end
  
  def charcoal
   edged_image = @original.image.threshold(140)
   paint(1, edged_image)
  end
  
  def rgb_pixels(pixels)
    pixel = nil
    pixels.each do |p|
      pixel = p
    end
    "rgb(#{pixel.red},#{pixel.green},#{pixel.blue})"
  end
 
  def darkest_pixels(pixels)
    intense_pixel = nil
    intense_rgb = 765
    pixels.each do |p|
      current_rgb = p.red + p.green + p.blue
      if current_rgb < intense_rgb
        intense_rgb = current_rgb
        intense_pixel = p
      end
    end
    "rgb(#{intense_pixel.red},#{intense_pixel.green},#{intense_pixel.blue})"
  end
end