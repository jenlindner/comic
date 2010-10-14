ActionController::Routing::Routes.draw do |map|
  map.resources :comics
  map.resources :panels
  map.draw 'panels/draw', :controller => 'panels', :action => 'draw'
  map.zoom 'panels/zoom', :controller => 'panels', :action => 'zoom'

end
