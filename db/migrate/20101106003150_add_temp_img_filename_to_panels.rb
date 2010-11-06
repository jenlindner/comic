class AddTempImgFilenameToPanels < ActiveRecord::Migration
  def self.up
    add_column :panels, :temp_filename, :string
  end

  def self.down
    remove_column :panels, :temp_filename
  end
end
