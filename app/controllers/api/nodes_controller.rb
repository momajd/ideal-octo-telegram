class Api::NodesController < ApplicationController
  def create
    debugger
    @node = Node.new(node_params)
    if @node.save
      render json: @node
    else
      render @node.errors.full_messages, status: 422
    end
  end

  private
  def node_params
    params.require(:node).permit(:x_coord, :y_coord)
  end
end
