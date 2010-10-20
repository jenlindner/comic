ActionController::Routing::Routes.draw do |map|
 
  map.resources :comics, :member => {:reorder => :post} do |comic| 
    comic.resources :panels, :member => {:zoom => :post, :pixelate => :post}
  end
  
end
