ActionController::Routing::Routes.draw do |map|
  map.resources :comics, :member => {:reorder => :post} do |comic| 
    comic.resources :panels, :member => {:colorize => :post, 
                    :posterize => :post, :charcoal => :post, 
                    :image => :get, :text => :put}
  end
  
  map.root :controller => :comics, :action => :index
end


# give tenminute demo on sockets and pusher. 
# maybe look at showoff in order to do demo. remember cool thing about this being able
# to have people watch you make art.
 # push to github. write list of everyting you've done. finish design make nav layout. 
# grid

# made pusher credentials an initializer - sweet! gets loaded automatically.
