ActionController::Routing::Routes.draw do |map|
  map.resources :comics, :member => {:reorder => :post} do |comic| 
    comic.resources :panels, :member => { :comicify => :post,  
                    :image => :get, :modified_image => :get, :text => :put}
  end
  
  map.root :controller => :comics, :action => :index
end

