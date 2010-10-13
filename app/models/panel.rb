class Panel < ActiveRecord::Base
  belongs_to :comic
  
  has_attached_file :original_image, 
                    :path => "#{RAILS_ROOT}/public/images/comics/originals/:id/:style/:filename", 
                    :styles => { :medium => "300x300>", :thumb => "100x100>" },
                    :url => "/images/comics/originals/:id/:style/:filename"
end
