class ImageObject
  attr_accessor :image
  
  def initialize(path)
    @image = QuickMagick::Image.read(path).first
  end
 
end