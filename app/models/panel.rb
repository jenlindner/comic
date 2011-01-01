class Panel < ActiveRecord::Base
  belongs_to :comic
  
  has_attached_file :original_image, 
                    :path => "#{RAILS_ROOT}/public/images/comics/originals/:id/:style/:filename", 
                    :styles => { :medium => "400x266>", :thumb => "100x67>" },
                    :url => "/images/comics/originals/:id/:style/:filename"
                    
                    
  def current_image_url 
    if modified_image_file_name
      "/images/comics/#{modified_image_file_name}"
    else
      original_image.url(:medium)
    end
  end
  
  
end
