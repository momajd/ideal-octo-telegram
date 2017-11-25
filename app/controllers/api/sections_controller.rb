class Api::SectionsController < ApplicationController
  def create
    @section = Section.new(section_params)
    if @section.save
      render json: @section
    else
      render json: @section.errors.full_messages, status: 422
    end
  end

  def update
    @section = Section.find(params[:id])
    if @section.update(section_params)
      render json: @section
    else
      render json: @section.errors.full_messages, status: 422
    end
  end

  def destroy
    @section = Section.find(params[:id])
    @section.destroy
    render json: @section
  end

  private
  def section_params
    params.require(:section).permit(:name, :area, :truss_id)
  end
end
