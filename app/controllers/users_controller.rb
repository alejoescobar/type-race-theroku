class UsersController < ApplicationController
  before_filter :authenticate_user!, :only => [:show]

  def show
    @counter = 0
    @user = User.find(params[:id])
  end

  def follow
    @user = User.find(params[:id])
    puts @user
    current_user.follow(@user)

    redirect_to @user
  end

  def search
    @users = User.order("created_at DESC")
    if params[:name].present?
      @users = @users.where("name ILIKE ?", "%#{params[:name]}%")
    end
  end

  def unfollow
    @user = User.find(params[:id])
    current_user.stop_following(@user)

    redirect_to @user
  end
end
