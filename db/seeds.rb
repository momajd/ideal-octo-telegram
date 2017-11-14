# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


truss = Truss.create()

n1 = Node.create(x_coord: 0, y_coord: 0, truss: truss)
n2 = Node.create(x_coord: 10, y_coord: 0, truss: truss)
n3 = Node.create(x_coord: 10, y_coord: 10, truss: truss)
n4 = Node.create(x_coord: 0, y_coord: 10, truss: truss)

n3.add_restraint!("x")
n3.add_restraint!("y")
n2.add_restraint!("y")

material = Material.create(truss: truss, elastic_modulus: 29000, area: 10)

Member.create([
  {truss: truss, near_node: n1, far_node: n2, material: material},
  {truss: truss, near_node: n1, far_node: n3, material: material},
  {truss: truss, near_node: n1, far_node: n4, material: material},
  {truss: truss, near_node: n4, far_node: n3, material: material},
  {truss: truss, near_node: n4, far_node: n2, material: material},
  {truss: truss, near_node: n2, far_node: n3, material: material}
  ])

Load.create([
  {node: n4, direction: "y", magnitude: 4},
  {node: n4, direction: "x", magnitude: 2}
  ])
