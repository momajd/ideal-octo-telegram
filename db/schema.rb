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

ActiveRecord::Schema.define(version: 20180128201300) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "loads", force: :cascade do |t|
    t.integer "node_id", null: false
    t.string "direction", null: false
    t.float "magnitude", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_loads_on_node_id"
  end

  create_table "materials", force: :cascade do |t|
    t.float "elastic_modulus", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "truss_id"
    t.string "name", null: false
    t.index ["truss_id"], name: "index_materials_on_truss_id"
  end

  create_table "members", force: :cascade do |t|
    t.integer "near_node_id", null: false
    t.integer "far_node_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "material_id"
    t.integer "truss_id"
    t.integer "section_id"
    t.string "name"
    t.index ["far_node_id"], name: "index_members_on_far_node_id"
    t.index ["material_id"], name: "index_members_on_material_id"
    t.index ["near_node_id"], name: "index_members_on_near_node_id"
    t.index ["section_id"], name: "index_members_on_section_id"
    t.index ["truss_id"], name: "index_members_on_truss_id"
  end

  create_table "nodes", force: :cascade do |t|
    t.float "x_coord", null: false
    t.float "y_coord", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "truss_id"
    t.float "z_coord"
    t.string "name"
    t.index ["truss_id"], name: "index_nodes_on_truss_id"
  end

  create_table "sections", force: :cascade do |t|
    t.string "name", null: false
    t.float "area", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "truss_id"
    t.index ["truss_id"], name: "index_sections_on_truss_id"
  end

  create_table "trusses", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
  end

  create_table "x_degree_of_freedoms", force: :cascade do |t|
    t.boolean "fixed", default: false
    t.float "displacement", default: 0.0
    t.float "reaction"
    t.integer "node_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "matrix_row"
    t.index ["matrix_row"], name: "index_x_degree_of_freedoms_on_matrix_row"
    t.index ["node_id"], name: "index_x_degree_of_freedoms_on_node_id"
  end

  create_table "y_degree_of_freedoms", force: :cascade do |t|
    t.boolean "fixed", default: false
    t.float "displacement", default: 0.0
    t.float "reaction"
    t.integer "node_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "matrix_row"
    t.index ["matrix_row"], name: "index_y_degree_of_freedoms_on_matrix_row"
    t.index ["node_id"], name: "index_y_degree_of_freedoms_on_node_id"
  end

end
