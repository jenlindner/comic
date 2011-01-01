class AddColumnsToPanel < ActiveRecord::Migration
  def self.up
    add_column :panels, :comic_id, :integer 
    add_column :panels, :sort_order, :integer 
    add_column :panels, :modified_image_file_name, :string
    add_column :panels, :original_image_file_name,    :string
    add_column :panels, :original_image_content_type, :string
    add_column :panels, :original_image_file_size,    :integer
    add_column :panels, :original_image_updated_at,   :datetime
                        
  end

  def self.down
    remove_column :panels, :comic_id
    remove_column :panels, :sort_order
    remove_column :panels, :modified_image_file_name
    remove_column :panels, :original_image_file_name  
    remove_column :panels, :original_image_content_type 
    remove_column :panels, :original_image_file_size    
    remove_column :panels, :original_image_updated_at   
  end
end
