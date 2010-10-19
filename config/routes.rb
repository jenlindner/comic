ActionController::Routing::Routes.draw do |map|
  map.resources :comics do |comic| 
    comic.resources :panels, :member => {:zoom => :post, :pixelate => :post}
  end
 
  map.reorder 'comics/:id/reorder', :controller => 'comics', :action => 'reorder'
end
