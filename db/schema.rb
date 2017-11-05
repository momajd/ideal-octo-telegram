# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171105123953) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "degree_of_freedoms", force: :cascade do |t|
    t.string "direction", null: false
    t.boolean "fixed", default: false
    t.float "displacement"
    t.float "reaction"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "loads", force: :cascade do |t|
    t.integer "node_id", null: false
    t.string "direction", null: false
    t.float "magnitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_loads_on_node_id"
  end

  create_table "nodes", force: :cascade do |t|
    t.float "x_coord", null: false
    t.float "y_coord", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "dof_x_id"
    t.integer "dof_y_id"
    t.index ["dof_x_id"], name: "index_nodes_on_dof_x_id"
    t.index ["dof_y_id"], name: "index_nodes_on_dof_y_id"
  end

end
