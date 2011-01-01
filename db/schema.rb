# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20101106003150) do

  create_table "comics", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
  end

  create_table "panels", :force => true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "comic_id"
    t.integer  "sort_order"
    t.string   "modified_image_file_name"
    t.string   "original_image_file_name"
    t.string   "original_image_content_type"
    t.integer  "original_image_file_size"
    t.datetime "original_image_updated_at"
    t.string   "text"
    t.integer  "text_x"
    t.integer  "text_y"
    t.string   "temp_filename"
  end

end
