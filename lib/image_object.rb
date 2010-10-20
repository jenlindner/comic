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