class ComicsController < ApplicationController

    def index
        @comics = Comic.all
        render json: @comics
    end

    def show
        @comic = Comic.find(params['id'])
        render json: @comic
    end

end
