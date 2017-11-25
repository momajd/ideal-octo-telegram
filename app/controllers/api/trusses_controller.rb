class Api::TrussesController < ApplicationController
  def index
    render json: Truss.all
  end

  def create
    @truss = Truss.new(truss_params)
    if @truss.save
      render json: @truss
    else
      render json: @truss.errors.full_messages, status: 422
    end
  end


  private
  def truss_params
    params.require(:truss).permit(:name)
  end
end
