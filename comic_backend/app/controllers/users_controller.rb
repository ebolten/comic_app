class UsersController < ApplicationController
  def index
      users = User.all
      render json: users
  end

  def show
    user = User.find(params['id'])

    render json: user.to_json(:include => {
        :comics => {:only => [:id,:title,:image_url,:creators,:desc]}
    })
  end

  def new
      user = User.new
  end

  def create
      user = User.find_or_create_by(user_params)
      render json: user
  end

  private

  def user_params
      params.require(:user).permit(:username, :image_url)
  end

end
