require 'pusher'
require 'RMagick'


class ImageObject
  attr_accessor :image
  
  def initialize(path)
    @image = Magick::ImageList.new(path)
  end
  
  def get_width_and_height_from_factor(factor)
    width = @image.columns / factor
    height = @image.rows / factor
    width_and_height = {"width" => width, "height" => height}
  end
end


class PusherCredentials
  attr_accessor :app_id, :key, :secret
  
  def initialize
    @app_id = Pusher.app_id = '1436'
    @key = Pusher.key = '279b70cc663845e74c75'
    @secret = Pusher.secret = '4491a3468b2f7d0ece6e'
  end
end

class PhotoArtist
 
  def initialize(path)
    pusher = PusherCredentials.new
    @original = ImageObject.new(path)
  end
  
  def zoom(factor)
    puts "hello jen zooming photo artist"
    width_and_height = @original.get_width_and_height_from_factor(factor) 
    cropped_image = @original.image.crop(Magick::CenterGravity, width_and_height.fetch("width"), width_and_height.fetch("height"))
    zoomed_image = cropped_image.resize(300,200) 
    paint_zoom(zoomed_image)
  end
    
  def paint_zoom(image)
    (image.rows / 5).times do |y|
      colors_of_row = []
      (image.columns / 5).times do |x|
        pixels = image.get_pixels((x * 5), (y * 5), 5, 5)
        colors_of_row << darkest_pixels(pixels)
      end
      Pusher["image_data"].trigger("begin_painting", :y => (y * 5), :colors => colors_of_row )
    end
  end  
  
  def paint
    (@original.image.rows / 5).times do |y|
      colors_of_row = []
      (@original.image.columns / 5).times do |x|
        pixels = @original.image.get_pixels((x * 5), (y * 5), 5, 5)
        colors_of_row << darkest_pixels(pixels)
      end
       Pusher["image_data"].trigger("begin_painting", :y => (y * 5), :colors => colors_of_row)
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