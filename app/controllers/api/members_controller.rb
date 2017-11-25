class Api::MembersController < ApplicationController
  def create
    @member = Member.new(member_params)
    if @member.save
      render json: @member
    else
      render json: @member.errors.full_messages, status: 422
    end
  end

  def update
    @member = Member.find(params[:id])
    if @member.update(member_params)
      render json: @member
    else
      render json: @member.errors.full_messages, status: 422
    end
  end

  def delete
    @member = Member.find(params[:id])
    @member.destroy
    render json: @member
  end

  private
  def member_params
    params.require(:member).permit(:near_node_id, :far_node_id, :truss_id,
      :section_id, :material_id)
  end
end
