class Api::LoadsController < ApplicationController
  def create
    @load = Load.new(load_params)
    if @load.save
      render json: @load
    else
      render json: @load.errors.full_messages, status: 422
    end
  end

  def update
    @load = Load.find(params[:id])
    if @load.update(load_params)
      render json: @load
    else
      render json: @load.errors.full_messages, status: 422
    end
  end

  def destroy
    @load = Load.find(params[:id])
    @load.destroy
    render json: @load
  end

  private
  def load_params
    params.require(:load).permit(:node_id, :direction, :magnitude)
  end
end
