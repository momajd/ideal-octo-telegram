class Api::MaterialsController < ApplicationController
  def create
    @material = Material.new(material_params)
    if @material.save
      render json: @material
    else
      render json: @material.errors.full_messages, status: 422
    end
  end

  def update
    @material = Material.find(params[:id])
    if @material.update(material_params)
      render json: @material
    else
      render json: @material.errors.full_messages, status: 422
    end
  end

  def destroy
    @material = Material.find(params[:id])
    @material.destroy
    render json: @material
  end

  private
  def material_params
    params.require(:material).permit(:name, :elastic_modulus, :truss_id)
  end
end
