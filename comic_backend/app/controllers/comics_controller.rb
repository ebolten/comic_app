class ComicsController < ApplicationController

    def index
        @comics = Comic.all
        render json: @comics
    end

    def show
        @comic = Comic.find(params['id'])
        render json: @comic
    end

    def new
        @comic = Comic.new
    end

    def create
        @comic = Comic.find_or_create_by(comic_params)
        render json: @comic
    end

    private

    def comic_params
        params.require(:comic).permit(:title,:desc,:image_url)
    end

end
