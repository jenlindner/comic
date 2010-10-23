ActionController::Routing::Routes.draw do |map|
  map.resources :comics, :member => {:reorder => :post} do |comic| 
    comic.resources :panels, :member => {:zoom => :post, :pixelate => :post, :delineate => :post, :image => :get}
  end
end


# give tenminute demo on sockets and pusher. 
# maybe look at showoff in order to do demo. remember cool thing about this being able
# to have people watch you make art.
# need the two more features at least need to be able to add text. fix aspect ratio of 
# panels. push to github. write list of everyting you've done. finish design make nav layout. 
# grid

# made pusher credentials an initializer - sweet! gets loaded automatically.
