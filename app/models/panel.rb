class Panel < ActiveRecord::Base
  belongs_to :comic
  
  has_attached_file :original_image, 
                    :path => "#{RAILS_ROOT}/public/images/comics/originals/:id/:style/:filename", 
                    :styles => { :medium => "300x200>", :thumb => "100x90>" },
                    :url => "/images/comics/originals/:id/:style/:filename"
end
