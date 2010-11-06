require 'pusher'
require 'image_object'

class PhotoArtist
 
  def initialize(path)
    pusher = PusherCredentials.new
    @original = ImageObject.new(path)
  end
   
 
  
  def comicify(panel_id)
    comicized_image = @original.image.resize("100x100!")
    comicized_image.save("public/images/comics/panel_id_#{panel_id}.png")
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
   
  def rgb_pixels(pixels)
    pixel = nil
    pixels.each do |p|
      pixel = p
    end
    "rgb(#{pixel.red},#{pixel.green},#{pixel.blue})"
  end
end