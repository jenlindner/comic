class ComicsController < ApplicationController
  
  before_filter :faux_login_required, :only => :show
  
  def index
    @comics = Comic.all
  end
  
  def create
    @comic = Comic.new
    @comic.title = params[:comic][:title]
    if @comic.save
      redirect_to @comic
    else
      redirect_to :action => :index
    end
  end
  
  def show
    @comic = Comic.find(params[:id])
    if @comic.panels
      @panels = @comic.panels.all(:order => :sort_order)  
    end
  end
  
  def edit
    @comic = Comic.find(params[:id])
  end
  
  def reorder
    params[:panels].each_with_index do |item, index|
      Panel.find(item).update_attributes(:sort_order => index)
    end
    render :text => ""    
  end  
  
  protected
  
  def faux_login_required
    # want to disable sortability and not show add panel blink, or edit and delete buttons in panels
    @disable = true
    #put this into javascript as well, a "disable" class to attach instead of sortable based on
    # faux variable
  end
  
end