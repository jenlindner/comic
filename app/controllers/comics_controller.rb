class ComicsController < ApplicationController
  
  def index
    @comics = Comic.all
  end
  
  def create
    @comic = Comic.new
  end
  
  def show
    @comic = Comic.find(params[:id])
  end
  
  def edit
    @comic = Comic.find(params[:id])
  end
  
end