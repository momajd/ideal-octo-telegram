class Api::NodesController < ApplicationController
  def create
    @node = Node.new(node_params)
    if @node.save
      render json: @node
    else
      render json: @node.errors.full_messages, status: 422
    end
  end

  def update
    @node = Node.find(params[:id])
    if @node.update(node_params)
      render json: @node
    else
      render json: @node.errors.full_messages, status: 422
    end
  end

  def destroy
    @node = Node.find(params[:id])
    @node.destroy
    render json: @node
  end

  private
  def node_params
    params.require(:node).permit(:name, :x_coord, :y_coord, :z_coord, :truss_id)
  end
end
