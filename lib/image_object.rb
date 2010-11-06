class ImageObject
  attr_accessor :image
  
  def initialize(path)
    @image = Magick::Image.read(path).first
  end
 
end