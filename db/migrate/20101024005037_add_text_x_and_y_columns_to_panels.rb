class AddTextXAndYColumnsToPanels < ActiveRecord::Migration
  def self.up
    add_column :panels, :text_x, :integer
    add_column :panels, :text_y, :integer
  end

  def self.down
      remove_column :panels, :text_x
      remove_column :panels, :text_y
  end
end
