class AddTextColumnToPanels < ActiveRecord::Migration
  def self.up       
    add_column :panels, :text, :string
  end           
                
  def self.down 
    add_column :panels, :text
  end                
end
