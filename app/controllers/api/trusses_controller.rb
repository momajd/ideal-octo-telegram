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

  def update
    @truss = Truss.find(params[:id])
    if @truss.save
      render json: @truss
    else
      render @truss.errors.full_messages, status: 422
    end
  end

  def destroy
    @truss = Truss.find(params[:id])
    @truss.destroy
    render json: @truss
  end

  private
  def truss_params
    params.require(:truss).permit(:name)
  end
end
