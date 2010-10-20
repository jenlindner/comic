require 'pusher'
require 'RMagick'
require 'image_object'

class PhotoArtist
  SQUARE_SIZE = 5
 
  def initialize(path)
    pusher = PusherCredentials.new
    @original = ImageObject.new(path)
  end
  
  def zoom(factor)
    width_and_height = @original.get_width_and_height_from_factor(factor) 
    cropped_image = @original.image.crop(Magick::CenterGravity, width_and_height.fetch("width"), width_and_height.fetch("height"))
    zoomed_image = cropped_image.resize(300,200) 
    paint(zoomed_image)
  end
  
  def paint(*image)
    image = image.empty? ? @original.image : image
    (image.rows / SQUARE_SIZE).times do |y|
      colors_of_row = []
      (image.columns / SQUARE_SIZE).times do |x|
        pixels = @original.image.get_pixels((x * SQUARE_SIZE), (y * SQUARE_SIZE), SQUARE_SIZE, SQUARE_SIZE)
        colors_of_row << darkest_pixels(pixels)
      end
       Pusher["image_data"].trigger("begin_painting", :y => (y * SQUARE_SIZE), :colors => colors_of_row, :square_size => SQUARE_SIZE)
    end
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