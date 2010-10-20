ActionController::Routing::Routes.draw do |map|
  # map.reorder 'comics/:id/reorder', :controller => 'comics', :action => 'reorder'
  map.namespace(:admin) do |admin|
    admin.resources :comics, :member => {:reorder => :post} do |comic| 
      comic.resources :panels, :member => {:zoom => :post, :pixelate => :post}
    end
  end
  
  map.resources :comics, :member => {:reorder => :post} do |comic| 
    comic.resources :panels, :member => {:zoom => :post, :pixelate => :post}
  end
  
end
