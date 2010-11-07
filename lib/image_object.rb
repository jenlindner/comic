class ImageObject
  attr_accessor :image
  
  def initialize(path)
    @image = MiniMagick::Image.open(path)
  end
 
end
