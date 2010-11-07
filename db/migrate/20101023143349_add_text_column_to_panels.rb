class AddTextColumnToPanels < ActiveRecord::Migration
  def self.up       
    add_column :panels, :text, :string
  end           
                
  def self.down 
    remove_column :panels, :text
  end                
end
