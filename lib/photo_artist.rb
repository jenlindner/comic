require 'image_object'

class PhotoArtist
 
  def initialize(path)
    @original = ImageObject.new(path)
  end
   
  def comicify(panel_id)
    @original.image.level(25,225)
    @original.image.write("#{RAILS_ROOT}/public/images/comics/panel_id_#{panel_id}.png")
  end

 
  def paint(square_size, *image)
    image = image.empty? ? @original.image : ImageObject.new(path)
    p image.rows
    (image.rows / square_size).times do |y|
      colors_of_row = []
      (image.columns / square_size).times do |x|
        pixels = image.get_pixels((x * square_size), (y * square_size), square_size, square_size)
        colors_of_row << rgb_pixels(pixels) 
      end
       Pusher["image_data"].trigger("begin_painting", :y => (y * square_size), :colors => colors_of_row, :square_size => square_size)
    end
  end
  
  def darkest_pixels(color, pixels)
    intense_pixel = nil
    intense_rgb = 765
    pixels.each do |p|
      current_rgb = p.color
      if current_rgb < intense_rgb
        intense_rgb = current_rgb
        intense_pixel = p
      end
    end
    "rgb(#{intense_pixel.color})"
  end
   
  def rgb_pixels(pixels)
    pixel = nil
    pixels.each do |p|
      pixel = p
    end
    "rgb(#{pixel.red},#{pixel.green},#{pixel.blue})"
  end
end
